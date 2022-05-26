import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { accessory, armor, inventory, shield, weapon } from "neverquest/state/inventory";
import { InventoryProps } from "neverquest/types/props";
import { isAccessory, isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function useUnequipItem() {
  const resetAccessory = useResetAtom(accessory);
  const resetArmor = useResetAtom(armor);
  const resetShield = useResetAtom(shield);
  const resetWeapon = useResetAtom(weapon);
  const setInventory = useSetAtom(inventory);

  return ({ id, item }: InventoryProps) => {
    if (isAccessory(item)) {
      resetAccessory();
    }

    if (isArmor(item)) {
      resetArmor();
    }

    if (isShield(item)) {
      resetShield();
    }

    if (isWeapon(item)) {
      resetWeapon();
    }

    setInventory((current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: false },
    }));
  };
}
