import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconBossAttacking from "@neverquest/icons/boss-attacking.svg?react";
import IconBossCorpse from "@neverquest/icons/boss-corpse.svg?react";
import IconBossLurking from "@neverquest/icons/boss-lurking.svg?react";
import IconAttacking from "@neverquest/icons/monster-attacking.svg?react";
import IconMonsterCorpse from "@neverquest/icons/monster-corpse.svg?react";
import IconLurking from "@neverquest/icons/monster-lurking.svg?react";
import { isAttacking } from "@neverquest/state/character";
import { isBoss } from "@neverquest/state/encounter";
import { isMonsterDead, monsterName } from "@neverquest/state/monster";

export function MonsterName() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const isBossValue = useRecoilValue(isBoss);
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const monsterNameValue = useRecoilValue(monsterName);

  const { Icon, tooltip } = (() => {
    if (isMonsterDeadValue) {
      return {
        Icon: isBossValue ? IconBossCorpse : IconMonsterCorpse,
        tooltip: `Dead ${isBossValue ? "boss" : "monster"}`,
      };
    }

    if (isAttackingValue) {
      return {
        Icon: isBossValue ? IconBossAttacking : IconAttacking,
        tooltip: isBossValue ? "Boss" : "Monster",
      };
    }

    return {
      Icon: isBossValue ? IconBossLurking : IconLurking,
      tooltip: `Lurking ${isBossValue ? "boss" : "monster"}`,
    };
  })();

  return <IconDisplay contents={monsterNameValue} Icon={Icon} tooltip={tooltip} />;
}
