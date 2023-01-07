import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/wingfoot.svg";
import { skills } from "@neverquest/state/skills";
import { dodgeChance } from "@neverquest/state/statistics";
import { SkillType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
  const dodgeChanceValue = useRecoilValue(dodgeChance);
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  if (!dodgeSkill) {
    return null;
  }

  return (
    <IconDisplay
      animation={AnimationType.FlipInX}
      contents={formatPercentage(dodgeChanceValue)}
      Icon={Icon}
      tooltip="Dodge chance"
    />
  );
}