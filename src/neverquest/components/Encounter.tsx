import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Caravan from "neverquest/components/Caravan";
import Loot from "neverquest/components/Loot";
import Wilderness from "neverquest/components/Wilderness";
import { ItemType, MerchantInventory, WeaponType } from "neverquest/env.d";
import { merchantInventory } from "neverquest/state/caravan";
import { isWilderness, level } from "neverquest/state/global";
import { generateWeapon } from "neverquest/utilities/generateWeapon";

export default function Encounter() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);
  const setMerchantInventory = useSetRecoilState(merchantInventory);

  useEffect(() => {
    // When encountering the Caravan,
    // generate the merchant's inventory (once per level)
    if (!isWildernessValue) {
      const newInventory: MerchantInventory = {};

      switch (levelValue) {
        case 1:
          newInventory[uuidv4()] = {
            cost: levelValue * 2,
            item: generateWeapon({
              level: levelValue,
              type: WeaponType.Light,
            }),
            type: ItemType.Weapon,
          };
          break;
        case 2: // Armor
        case 3: // Shield
        case 4: // Jewelry
        default:
          break;
      }

      setMerchantInventory((currentMerchantInventory) => ({
        ...currentMerchantInventory,
        ...newInventory,
      }));
    }
  }, [isWildernessValue, levelValue, setMerchantInventory]);

  return (
    <Stack gap={3}>
      {isWildernessValue ? (
        <>
          <Wilderness />

          <Loot />
        </>
      ) : (
        <Caravan />
      )}
    </Stack>
  );
}