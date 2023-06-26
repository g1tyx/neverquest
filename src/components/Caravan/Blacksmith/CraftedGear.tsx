import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { useAcquireGear } from "@neverquest/hooks/actions/useAcquireGear";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { canFit } from "@neverquest/state/inventory";
import type { GearItem } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

export function CraftedGear({ gear }: { gear: GearItem }) {
  const { weight } = gear;

  const canFitValue = useRecoilValue(canFit(weight));
  const setBlacksmithInventory = useSetRecoilState(blacksmithInventory);

  const acquireGear = useAcquireGear();
  const toggleEquipGear = useToggleEquipGear();

  const handleAcquire = () => {
    const shouldAutoEquip = acquireGear(gear);

    if (shouldAutoEquip !== null) {
      if (isArmor(gear)) {
        setBlacksmithInventory((current) => ({ ...current, armor: null }));
      }

      if (isShield(gear)) {
        setBlacksmithInventory((current) => ({ ...current, shield: null }));
      }

      if (isWeapon(gear)) {
        setBlacksmithInventory((current) => ({ ...current, weapon: null }));
      }

      if (shouldAutoEquip) {
        toggleEquipGear(gear);
      }
    }
  };

  return (
    <Stack gap={3}>
      <ItemDisplay item={gear} />

      <OverlayTrigger
        overlay={<Tooltip>Over-encumbered!</Tooltip>}
        trigger={canFitValue ? [] : ["hover", "focus"]}
      >
        <span>
          <Button
            className="w-100"
            disabled={!canFitValue}
            onClick={handleAcquire}
            variant="outline-dark"
          >
            Acquire
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
