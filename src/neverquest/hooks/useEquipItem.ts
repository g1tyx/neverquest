import { useSetRecoilState, useRecoilState } from "recoil";

import {
  Armor,
  InventoryItemStatus,
  Accessory,
  Shield,
  EquipmentType,
  Weapon,
} from "neverquest/env";
import { stamina, staminaRegenerationRate } from "neverquest/state/attributes";
import { accessory, armor, shield, weapon } from "neverquest/state/inventory";
import {
  showAccessory,
  showArmor,
  showShield,
  showStamina,
  showTotalAttackRateSummary,
  showTotalDamageSummary,
  showTotalProtection,
  showWeapon,
} from "neverquest/state/show";

export default function useEquipItem() {
  const [showAccessoryValue, setShowAccessory] = useRecoilState(showAccessory);
  const [showArmorValue, setShowArmor] = useRecoilState(showArmor);
  const [showShieldValue, setShowShield] = useRecoilState(showShield);
  const [showStaminaValue, setShowStamina] = useRecoilState(showStamina);
  const [showTotalAttackRateBreakdownValue, setShowTotalAttackRateSummary] = useRecoilState(
    showTotalAttackRateSummary
  );
  const [showTotalDamageBreakdownValue, setShowTotalDamageSummary] =
    useRecoilState(showTotalDamageSummary);
  const [showTotalProtectionValue, setShowTotalProtection] = useRecoilState(showTotalProtection);
  const [showWeaponValue, setShowWeapon] = useRecoilState(showWeapon);
  const [staminaValue, setStamina] = useRecoilState(stamina);
  const [staminaRegenerationRateValue, setStaminaRegenerationRate] =
    useRecoilState(staminaRegenerationRate);
  const setArmor = useSetRecoilState(armor);
  const setAccessory = useSetRecoilState(accessory);
  const setShield = useSetRecoilState(shield);
  const setWeapon = useSetRecoilState(weapon);

  return ({ item, type }: { item: Armor | Accessory | Shield | Weapon; type: EquipmentType }) => {
    switch (type) {
      case EquipmentType.Accessory:
        setAccessory(item as Accessory);

        if (!showAccessoryValue) {
          setShowAccessory(true);
        }

        return InventoryItemStatus.Equipped;
      case EquipmentType.Armor:
        setArmor(item as Armor);

        if (!showArmorValue) {
          setShowArmor(true);
        }

        if (!showTotalProtectionValue) {
          setShowTotalProtection(true);
        }

        return InventoryItemStatus.Equipped;
      case EquipmentType.Shield:
        setShield(item as Shield);

        if (!showShieldValue) {
          setShowShield(true);
        }

        if (!showTotalProtectionValue) {
          setShowTotalProtection(true);
        }

        return InventoryItemStatus.Equipped;
      case EquipmentType.Weapon:
        setWeapon(item as Weapon);

        if (!showStaminaValue && (item as Weapon).staminaCost > 0) {
          setShowStamina(true);

          if (!staminaValue.canAssign) {
            setStamina((currentStamina) => ({ ...currentStamina, canAssign: true }));
          }

          if (!staminaRegenerationRateValue.canAssign) {
            setStaminaRegenerationRate((currentStaminaRegenerationRate) => ({
              ...currentStaminaRegenerationRate,
              canAssign: true,
            }));
          }
        }

        if (!showTotalAttackRateBreakdownValue) {
          setShowTotalAttackRateSummary(true);
        }

        if (!showTotalDamageBreakdownValue) {
          setShowTotalDamageSummary(true);
        }

        if (!showWeaponValue) {
          setShowWeapon(true);
        }

        return InventoryItemStatus.Equipped;
    }
  };
}
