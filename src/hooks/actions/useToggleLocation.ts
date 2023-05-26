import { useRecoilCallback } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseLevel } from "@neverquest/hooks/actions/useIncreaseLevel";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import {
  isLevelCompleted,
  isWilderness,
  level,
  maximumLevel,
  mode,
} from "@neverquest/state/encounter";
import { Location } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleLocation() {
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseLevel = useIncreaseLevel();
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isWildernessValue = get(isWilderness);

        if (isWildernessValue) {
          generateMerchantInventory();

          set(mode, Location.Caravan);
        } else {
          if (get(isLevelCompleted) && get(level) === get(maximumLevel)) {
            increaseLevel();
          }

          resetWilderness();

          set(mode, Location.Wilderness);
          set(hasBoughtFromMerchant, false);
        }
      },
    [generateMerchantInventory, increaseLevel]
  );
}
