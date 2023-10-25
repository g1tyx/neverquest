import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Attributes } from "@neverquest/components/Attributes";
import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { IconTabs } from "@neverquest/components/IconTabs";
import { Skills } from "@neverquest/components/Skills";
import { Traits } from "@neverquest/components/Traits";
import IconAttributes from "@neverquest/icons/attributes.svg?react";
import IconCapabilities from "@neverquest/icons/capabilities.svg?react";
import IconSkills from "@neverquest/icons/skills.svg?react";
import IconTraits from "@neverquest/icons/traits.svg?react";
import IconUpgrade from "@neverquest/icons/upgrade.svg?react";
import { areAttributesAffordable } from "@neverquest/state/attributes";
import { isAttacking, isGameOver } from "@neverquest/state/character";
import { isStageStarted } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import type { TabsData } from "@neverquest/types/props";
import { formatEnumeration } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

const TABS: TabsData = [
  {
    Component: Attributes,
    Icon: IconAttributes,
    label: "attributes",
  },
];
const TOOLTIP = ["Attributes"];

export function CapabilitiesButton() {
  const areAttributesIncreasableValue = useRecoilValue(areAttributesAffordable);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isGameOverValue = useRecoilValue(isGameOver);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const isShowingCapabilities = useRecoilValue(isShowing("capabilities"));
  const isShowingSkills = useRecoilValue(isShowing("skills"));
  const isShowingTraits = useRecoilValue(isShowing("traits"));

  const [isScreenShowing, setScreenShowing] = useState(false);

  const isShowingSkillsOrTraits = isShowingSkills || isShowingTraits;

  if (isShowingSkills) {
    TABS.push({
      Component: Skills,
      Icon: IconSkills,
      label: "skills",
    });
    TOOLTIP.push("skills");
  }

  if (isShowingTraits) {
    TABS.push({
      Component: Traits,
      Icon: IconTraits,
      label: "traits",
    });
    TOOLTIP.push("traits");
  }

  if (!isShowingCapabilities) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>{formatEnumeration(TOOLTIP)}</Tooltip>}>
        <span className={getAnimationClass({ name: "bounceIn" })}>
          <Button
            className={`position-relative${
              areAttributesIncreasableValue && !isStageStartedValue
                ? ` ${getAnimationClass({
                    isInfinite: true,
                    name: "pulse",
                  })}`
                : ""
            }`}
            disabled={isAttackingValue || isGameOverValue}
            onClick={() => setScreenShowing(true)}
            variant="outline-dark"
          >
            <IconImage Icon={IconCapabilities} />

            <ButtonBadge isShowing={areAttributesIncreasableValue}>
              <IconImage Icon={IconUpgrade} size="small" />
            </ButtonBadge>
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        isShowing={isScreenShowing}
        onClose={() => setScreenShowing(false)}
        title={`${isShowingSkillsOrTraits ? "Capabilities" : "Attributes"}`}
      >
        {isShowingSkillsOrTraits ? <IconTabs tabs={TABS} /> : <Attributes />}
      </DismissableScreen>
    </>
  );
}
