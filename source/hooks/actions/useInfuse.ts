import { useRecoilCallback } from "recoil";

import { LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import {
  infusionCurrent,
  infusionLevel,
  infusionMaximum,
  infusionStep,
} from "@neverquest/state/items";

import type { InfusableItem } from "@neverquest/types";
import { isInfusableItem } from "@neverquest/types/type-guards";
import type { Infusable } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInfuse() {
  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (infusable: Infusable) => {
        const get = getSnapshotGetter(snapshot);

        const ownedInfusable = get(ownedItem(infusable));

        if (ownedInfusable === undefined) {
          return;
        }

        if (get(infusionLevel(infusable)) >= LEVELLING_MAXIMUM) {
          return;
        }

        const infusionStepValue = get(infusionStep(infusable));

        if (infusionStepValue === 0) {
          return;
        }

        const infusionCurrentState = infusionCurrent(infusable);
        const newInfusion = get(infusionCurrentState) + infusionStepValue;

        if (newInfusion >= get(infusionMaximum(infusable))) {
          const newLevel = (ownedInfusable as InfusableItem).level + 1;

          set(inventory, (currentInventory) =>
            currentInventory.map((currentItem) => {
              if (currentItem.ID === ownedInfusable.ID && isInfusableItem(currentItem)) {
                return {
                  ...currentItem,
                  level: newLevel,
                };
              }

              return currentItem;
            }),
          );

          progressQuest({ quest: "infusing" });

          if (newLevel >= LEVELLING_MAXIMUM) {
            progressQuest({ quest: "infusingMaximum" });
          }

          reset(infusionCurrentState);
        } else {
          set(infusionCurrentState, newInfusion);
        }

        transactEssence(-infusionStepValue);
      },
    [transactEssence],
  );
}
