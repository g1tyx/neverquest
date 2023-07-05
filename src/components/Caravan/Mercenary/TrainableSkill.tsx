import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SkillDisplay } from "@neverquest/components/Caravan/Mercenary/SkillDisplay";
import { TrainSkillButton } from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { SKILLS } from "@neverquest/data/skills";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { level } from "@neverquest/state/attributes";
import { skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_UNKNOWN } from "@neverquest/utilities/constants";

export function TrainableSkill({ type }: { type: Skill }) {
  const levelValue = useRecoilValue(level);
  const skillValue = useRecoilValue(skills(type));

  const { coinPrice, requiredLevel } = SKILLS[type];

  if (skillValue) {
    return null;
  }

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      {requiredLevel <= levelValue ? (
        <>
          <SkillDisplay type={type} />

          <Stack direction="horizontal" gap={3}>
            <ResourceDisplay tooltip="Price (coins)" type="coins" value={coinPrice} />

            <TrainSkillButton type={type} />
          </Stack>
        </>
      ) : (
        <IconDisplay
          contents={LABEL_UNKNOWN}
          description={`Unlocks at power level ${requiredLevel}.`}
          Icon={IconUnknown}
          tooltip="Skill"
        />
      )}
    </div>
  );
}
