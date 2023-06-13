import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Caravan/Mercenary/SkillDisplay";
import { skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";

export function TrainedSkill({ type }: { type: Skill }) {
  const skillValue = useRecoilValue(skills(type));

  if (!skillValue) {
    return null;
  }

  return <SkillDisplay type={type} />;
}
