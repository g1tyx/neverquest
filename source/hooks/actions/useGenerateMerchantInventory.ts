import type { GeneratorParameters } from "@kitnato/locran/build/types";
import { useRecoilCallback } from "recoil";

import { MERCHANT_OFFERS } from "@neverquest/data/caravan";
import { merchantInventory } from "@neverquest/state/caravan";
import { stage, stageMaximum } from "@neverquest/state/encounter";
import { allowProfanity } from "@neverquest/state/settings";
import { isInfusableItem, isTrinketItem } from "@neverquest/types/type-guards";
import {
  generateArmor,
  generateMeleeWeapon,
  generateShield,
} from "@neverquest/utilities/generators";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useGenerateMerchantInventory() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const allowProfanityValue = get(allowProfanity);
        const merchantInventoryCurrent = [...get(merchantInventory)];
        const stageValue = get(stage);

        const offer = MERCHANT_OFFERS[stageValue];

        if (
          offer !== undefined &&
          stageValue === get(stageMaximum) &&
          merchantInventoryCurrent.every(({ offerIndex }) => offerIndex !== stageValue)
        ) {
          const gearSettings: GeneratorParameters & { level: number } = {
            affixStructure: "prefix",
            allowProfanity: allowProfanityValue,
            level: stageValue,
            prefixTags: ["lowQuality"],
          };

          const item = (() => {
            if (isInfusableItem(offer) || isTrinketItem(offer)) {
              return offer;
            }

            switch (offer.type) {
              case "armor": {
                return generateArmor({
                  ...gearSettings,
                  ...offer,
                });
              }

              case "shield": {
                return generateShield({
                  ...gearSettings,
                  ...offer,
                });
              }

              case "weapon": {
                return generateMeleeWeapon({
                  ...gearSettings,
                  ...offer,
                });
              }
            }
          })();

          merchantInventoryCurrent.push({
            ...item,
            isReturned: false,
            offerIndex: stageValue,
          });

          set(merchantInventory, merchantInventoryCurrent);
        }
      },
    [],
  );
}
