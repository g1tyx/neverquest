import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";
import { skills } from "@neverquest/state/skills";
import { totalCriticalDamage } from "@neverquest/state/statistics";
import { SkillStatus, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/helpers";

export default function () {
  const criticalDamageValue = useRecoilValue(totalCriticalDamage);
  const criticalsSkill = useRecoilValue(skills(SkillType.Criticals));

  if (criticalsSkill !== SkillStatus.Trained) {
    return null;
  }

  return (
    <IconDisplay
      Icon={Icon}
      contents={formatPercentage(criticalDamageValue)}
      isAnimated
      tooltip="Critical damage bonus"
    />
  );
}
