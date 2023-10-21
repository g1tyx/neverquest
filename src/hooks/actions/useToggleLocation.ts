import { useRecoilCallback } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { hasBoughtFromMerchant } from "@neverquest/state/caravan";
import {
  isStageCompleted,
  isWilderness,
  location,
  stage,
  stageMaximum,
} from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleLocation() {
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const isWildernessValue = get(isWilderness);

        if (isWildernessValue) {
          generateMerchantInventory();

          set(location, "caravan");
          set(isShowing("location"), true);
        } else {
          if (get(isStageCompleted) && get(stage) === get(stageMaximum)) {
            increaseStage();
          }

          resetWilderness();

          set(location, "wilderness");
          set(hasBoughtFromMerchant, false);
        }
      },
    [generateMerchantInventory, increaseStage],
  );
}
