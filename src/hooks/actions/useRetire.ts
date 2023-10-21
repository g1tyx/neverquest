import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { RETIREMENT_MINIMUM } from "@neverquest/data/general";
import { ENCUMBRANCE, KNAPSACK_SIZE } from "@neverquest/data/inventory";
import { useGenerateMonster } from "@neverquest/hooks/actions/useGenerateMonster";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import { generateLocation } from "@neverquest/LOCRAN/generate/generateLocation";
import { isAttributeUnlocked } from "@neverquest/state/attributes";
import {
  blacksmithInventory,
  fletcherInventory,
  hireStatus,
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
  wildernesses,
} from "@neverquest/state/encounter";
import { encumbranceMaximum, hasKnapsack, inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isMasteryUnlocked, masteryProgress, masteryRank } from "@neverquest/state/masteries";
import { essence } from "@neverquest/state/resources";
import { allowNSFW } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired, selectedTrait } from "@neverquest/state/traits";
import { isInfusable } from "@neverquest/types/type-guards";
import { ATTRIBUTE_TYPES, CREW_TYPES, MASTERY_TYPES, SKILL_TYPES } from "@neverquest/types/unions";
import {
  getNameStructure,
  getProgressReduction,
  getSnapshotGetter,
} from "@neverquest/utilities/getters";

export function useRetire() {
  const generateMonster = useGenerateMonster();
  const resetAttributes = useResetAttributes();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (get(stageMaximum) < RETIREMENT_MINIMUM) {
          return;
        }

        const selectedTraitValue = get(selectedTrait);

        if (selectedTraitValue !== null) {
          set(isTraitAcquired(selectedTraitValue), true);
          reset(selectedTrait);
        }

        set(isShowing("traits"), true);
        set(progressReduction, getProgressReduction(get(stage)));

        reset(essence);
        reset(isStageStarted);
        reset(progress);
        reset(location);
        reset(name);
        reset(stage);

        resetAttributes();

        reset(attackDuration);

        reset(blacksmithInventory);
        reset(fletcherInventory);
        reset(merchantInventory);

        ATTRIBUTE_TYPES.forEach((current) =>
          set(isAttributeUnlocked(current), { isUnlocked: ATTRIBUTES[current].isUnlocked }),
        );

        CREW_TYPES.forEach((current) =>
          set(hireStatus(current), ({ status }) => ({
            status: status === "hirable" ? null : status,
          })),
        );

        MASTERY_TYPES.forEach((current) => {
          reset(isMasteryUnlocked(current));
          reset(masteryProgress(current));
          reset(masteryRank(current));
        });

        SKILL_TYPES.forEach((current) => reset(isSkillAcquired(current)));

        let extraEncumbrance = 0;

        set(inventory, (currentInventory) =>
          currentInventory.filter((currentItem) => {
            extraEncumbrance += currentItem.weight;

            return isInfusable(currentItem);
          }),
        );

        set(
          encumbranceMaximum,
          extraEncumbrance + ENCUMBRANCE + (get(hasKnapsack) ? KNAPSACK_SIZE : 0),
        );

        set(wildernesses, [
          generateLocation({
            allowNSFW: get(allowNSFW),
            nameStructure: getNameStructure(),
          }),
        ]);

        generateMonster();
      },
    [generateMonster, resetAttributes],
  );
}
