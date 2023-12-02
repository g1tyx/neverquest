import { useRecoilCallback } from "recoil";

import { CREW } from "@neverquest/data/caravan";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { generateLocation } from "@neverquest/LOCRAN/generate/generateLocation";
import { hireStatus } from "@neverquest/state/caravan";
import { stage, wildernesses } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
import { allowProfanity } from "@neverquest/state/settings";
import { CREW_TYPES } from "@neverquest/types/unions";
import { getNameStructure, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useIncreaseStage() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const stageValue = get(stage);
        const nextStage = stageValue + 1;

        for (const crew of CREW_TYPES) {
          const hireStatusState = hireStatus(crew);
          const hireStatusCurrent = get(hireStatusState);
          const isShowingCrewHiring = isShowing("crewHiring");

          const { requiredStage } = CREW[crew];

          if (hireStatusCurrent === "hidden" && nextStage >= requiredStage) {
            set(hireStatusState, "hirable");
            set(isShowingCrewHiring, true);
          }
        }

        set(wildernesses, (current) => [
          ...current,
          generateLocation({
            allowProfanity: get(allowProfanity),
            nameStructure: getNameStructure(),
          }),
        ]);

        set(stage, nextStage);

        progressQuest({ quest: "stages" });
        progressQuest({ quest: "stagesEnd" });

        if (stageValue === get(questProgress("survivingNoAttributes")) + 1) {
          progressQuest({ quest: "survivingNoAttributes" });
        }

        if (stageValue === get(questProgress("survivingNoGear")) + 1) {
          progressQuest({ quest: "survivingNoGear" });
        }
      },
    [progressQuest],
  );
}
