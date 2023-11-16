import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { LABEL_NO_ESSENCE, LABEL_OVER_ENCUMBERED, LEVEL_MAXIMUM } from "@neverquest/data/general";
import { TRINKETS } from "@neverquest/data/inventory";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useCanFit } from "@neverquest/hooks/actions/useCanFit";
import { useInfuse } from "@neverquest/hooks/actions/useInfuse";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { infusionDelta, infusionLevel, infusionStep } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";

export function Infusion({ infusable }: { infusable: Infusable }) {
  const infusionLevelValue = useRecoilValue(infusionLevel(infusable));
  const infusionStepValue = useRecoilValue(infusionStep(infusable));
  const ownedItemMysteriousEgg = useRecoilValue(ownedItem("mysterious egg"));
  const resetInfusionDelta = useResetRecoilState(infusionDelta);
  const setInfusionDelta = useSetRecoilState(infusionDelta);
  const setInventory = useSetRecoilState(inventory);

  const [isInfusing, setIsInfusing] = useState(false);

  const acquireItem = useAcquireItem();
  const canFit = useCanFit();
  const infuse = useInfuse();

  const isInfusionAtMaximum = infusionLevelValue >= LEVEL_MAXIMUM;
  const isInfusionPossible = infusionStepValue > 0;
  const canHatch =
    isInfusionAtMaximum && ownedItemMysteriousEgg !== undefined && infusable === "mysterious egg";
  const canInfuse = isInfusionPossible && !isInfusionAtMaximum;
  const mysteriousEggItem = TRINKETS["familiar"].item;
  const canFitMysteriousEgg = canFit(mysteriousEggItem.weight);

  const onStop = () => {
    setIsInfusing(false);
    resetInfusionDelta();
  };

  useAnimate({
    delta: setInfusionDelta,
    onDelta: () => {
      infuse(infusable);

      resetInfusionDelta();
    },
    stop: !isInfusing || isInfusionAtMaximum,
  });

  return canHatch ? (
    <OverlayTrigger
      overlay={<Tooltip>{LABEL_OVER_ENCUMBERED}</Tooltip>}
      trigger={canFitMysteriousEgg ? [] : ["focus", "hover"]}
    >
      <span>
        <Button
          disabled={!canFitMysteriousEgg}
          onClick={() => {
            if (canHatch) {
              const acquiredStatus = acquireItem(mysteriousEggItem);

              if (acquiredStatus === "success") {
                setInventory((current) =>
                  current.filter(({ ID }) => ownedItemMysteriousEgg.ID !== ID),
                );
              }
            }
          }}
          variant="outline-dark"
        >
          Hatch
        </Button>
      </span>
    </OverlayTrigger>
  ) : (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {!isInfusionPossible && <div>{LABEL_NO_ESSENCE}</div>}

          {isInfusionAtMaximum && <div>Infusion limit reached.</div>}
        </Tooltip>
      }
      trigger={canInfuse ? [] : ["focus", "hover"]}
    >
      <span>
        <Button
          disabled={!canInfuse}
          onMouseDown={() => setIsInfusing(true)}
          onMouseOut={onStop}
          onMouseUp={onStop}
          variant="outline-dark"
        >
          Infuse
        </Button>
      </span>
    </OverlayTrigger>
  );
}
