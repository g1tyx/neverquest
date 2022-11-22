import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import TrainSkillButton from "@neverquest/components/Caravan/Mercenary/TrainSkillButton";
import SkillDisplay from "@neverquest/components/Character/SkillDisplay";
import IconDisplay from "@neverquest/components/IconDisplay";
import Coins from "@neverquest/components/Resource/Coins";
import { CLASS_DIV_FULL_WIDTH, UNKNOWN } from "@neverquest/constants";
import { SKILLS } from "@neverquest/constants/skills";
import { ReactComponent as IconUnknown } from "@neverquest/icons/perspective-dice-six-faces-random.svg";
import { characterLevel } from "@neverquest/state/character";
import { skills } from "@neverquest/state/skills";
import { SkillType } from "@neverquest/types/enums";

export default function ({ type }: { type: SkillType }) {
  const characterLevelValue = useRecoilValue(characterLevel);
  const skillValue = useRecoilValue(skills(type));

  const { price, requiredLevel } = SKILLS[type];

  if (skillValue) {
    return null;
  }

  return (
    <div className={CLASS_DIV_FULL_WIDTH}>
      {requiredLevel <= characterLevelValue ? (
        <>
          <SkillDisplay type={type} />

          <Stack direction="horizontal" gap={3}>
            <Coins tooltip="Price (coins)" value={price} />

            <TrainSkillButton type={type} />
          </Stack>
        </>
      ) : (
        <IconDisplay
          contents={UNKNOWN}
          description={`Unlocks at Power Level ${requiredLevel}`}
          Icon={IconUnknown}
          tooltip={UNKNOWN}
        />
      )}
    </div>
  );
}
