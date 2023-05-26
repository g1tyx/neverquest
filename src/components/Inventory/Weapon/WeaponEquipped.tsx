import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { ReactComponent as IconUnequipped } from "@neverquest/icons/fist.svg";
import { ReactComponent as IconWeapon } from "@neverquest/icons/weapon.svg";
import { equippedGearID, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { GearType, Showing } from "@neverquest/types/enums";

export function WeaponEquipped() {
  const equippedWeaponID = useRecoilValue(equippedGearID(GearType.Weapon));
  const isShowingWeapon = useRecoilValue(isShowing(Showing.Weapon));
  const weaponValue = useRecoilValue(weapon);

  if (!isShowingWeapon) {
    return null;
  }

  return (
    <IconDisplay
      contents={<WeaponName weapon={weaponValue} />}
      Icon={equippedWeaponID === null ? IconUnequipped : IconWeapon}
      iconProps={{ isMirrored: equippedWeaponID === null }}
      isAnimated
      tooltip="Equipped weapon"
    />
  );
}
