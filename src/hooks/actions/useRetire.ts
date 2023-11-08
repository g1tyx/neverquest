import { useRecoilCallback } from "recoil";

import { RETIREMENT_MINIMUM_LEVEL } from "@neverquest/data/general";
import { INHERITABLE_ITEMS } from "@neverquest/data/inventory";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { useInitialize } from "@neverquest/hooks/actions/useInitialize";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import {
  blacksmithInventory,
  fletcherInventory,
  merchantInventory,
} from "@neverquest/state/caravan";
import { attackDuration, name } from "@neverquest/state/character";
import {
  isStageStarted,
  location,
  progress,
  progressReduction,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isMasteryUnlocked, masteryProgress, masteryRank } from "@neverquest/state/masteries";
import { canUseJournal, questProgress } from "@neverquest/state/quests";
import { essence } from "@neverquest/state/resources";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired, selectedTrait } from "@neverquest/state/traits";
import { isGear } from "@neverquest/types/type-guards";
import { MASTERY_TYPES, SKILL_TYPES, TRAIT_TYPES } from "@neverquest/types/unions";
import { getProgressReduction, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useRetire() {
  const generateMonster = useGenerateMonster();
  const initialize = useInitialize();
  const progressQuest = useProgressQuest();
  const resetAttributes = useResetAttributes();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(stageMaximum) < RETIREMENT_MINIMUM_LEVEL) {
          return;
        }

        const selectedTraitValue = get(selectedTrait);

        if (selectedTraitValue !== null) {
          set(isTraitAcquired(selectedTraitValue), true);
          reset(selectedTrait);

          progressQuest({ quest: "traits" });

          if (
            TRAIT_TYPES.filter((current) => current !== selectedTraitValue).every((current) =>
              get(isTraitAcquired(current)),
            )
          ) {
            progressQuest({ quest: "traitsAll" });
          }
        }

        set(isShowing("traits"), true);
        set(progressReduction, getProgressReduction(get(stage)));

        reset(essence);
        reset(isStageStarted);
        reset(progress);
        reset(location);
        reset(name);
        reset(stage);
        reset(questProgress("powerLevel"));
        reset(questProgress("stages"));

        resetAttributes();

        reset(attackDuration);

        reset(blacksmithInventory);
        reset(fletcherInventory);
        reset(merchantInventory);

        MASTERY_TYPES.forEach((current) => {
          reset(isMasteryUnlocked(current));
          reset(masteryProgress(current));
          reset(masteryRank(current));
        });

        SKILL_TYPES.forEach((current) => reset(isSkillAcquired(current)));

        set(inventory, (currentInventory) =>
          currentInventory.filter((currentItem) => {
            if (isGear(currentItem)) {
              return false;
            }

            const { name } = currentItem;

            if (INHERITABLE_ITEMS.some((currentInheritable) => currentInheritable === name)) {
              if (name === "journal") {
                set(canUseJournal, true);
              }

              return true;
            }

            return false;
          }),
        );

        initialize(true);

        progressQuest({ quest: "retiring" });
      },
    [generateMonster, progressQuest, resetAttributes],
  );
}
