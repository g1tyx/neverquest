import { useRecoilCallback } from "recoil";

import { isStageStarted, progress } from "@neverquest/state/encounter";
import { isMonsterNew } from "@neverquest/state/monster";
import { essenceLoot, hasLooted, itemsLoot } from "@neverquest/state/resources";

export function useResetWilderness() {
  return useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(isStageStarted);
        reset(hasLooted);
        reset(progress);

        reset(essenceLoot);
        reset(itemsLoot);

        reset(isMonsterNew);
      },
    [],
  );
}
