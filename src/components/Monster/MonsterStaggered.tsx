import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MonsterAilmentMeter } from "@neverquest/components/Monster/MonsterAilmentMeter";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import IconStaggered from "@neverquest/icons/staggered.svg?react";
import { canReceiveAilment } from "@neverquest/state/ailments";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isMonsterAiling, isMonsterDead, monsterAilmentDuration } from "@neverquest/state/monster";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MonsterStaggered() {
  const canReceiveAilmentStaggered = useRecoilValue(canReceiveAilment("staggered"));
  const isMonsterStaggered = useRecoilValue(isMonsterAiling("staggered"));
  const isMonsterDeadValue = useRecoilValue(isMonsterDead);
  const stabilityValue = useRecoilValue(masteryStatistic("stability"));
  const setMonsterStaggerDuration = useSetRecoilState(monsterAilmentDuration("staggered"));

  useAnimate({
    delta: setMonsterStaggerDuration,
    stop: !isMonsterStaggered || isMonsterDeadValue,
  });

  if (canReceiveAilmentStaggered) {
    return (
      <IconDisplay
        className={getAnimationClass({ name: "flipInX" })}
        Icon={IconStaggered}
        tooltip="Staggered"
      >
        <MonsterAilmentMeter ailment="staggered" totalDuration={stabilityValue} />
      </IconDisplay>
    );
  }
}
