import { useRecoilCallback } from "recoil"

import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { armor, shield, weapon } from "@neverquest/state/gear"
import { isRelicEquipped } from "@neverquest/state/items"
import { questProgress } from "@neverquest/state/quests"
import { isSkillAcquired } from "@neverquest/state/skills"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import type { GearItem, RelicItem } from "@neverquest/types"
import {
	isArmor,
	isMelee,
	isRanged,
	isRelicItem,
	isShield,
	isUnshielded,
	isWeapon,
} from "@neverquest/types/type-guards"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useToggleEquipItem() {
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			({ forceUnequip, item }: { forceUnequip?: boolean, item: GearItem | RelicItem }) => {
				const get = getSnapshotGetter(snapshot)

				if (isRelicItem(item)) {
					const isRelicEquippedValue = isRelicEquipped(item.name)

					if (forceUnequip) {
						reset(isRelicEquippedValue)
					}
					else {
						set(isRelicEquippedValue, isEquipped => !isEquipped)
					}

					return
				}

				const armorValue = get(armor)
				const shieldValue = get(shield)
				const weaponValue = get(weapon)

				const { burden, gearClass, ID } = item
				const isWeaponRanged = isRanged(item)
				const isWeaponTwoHanded = isMelee(item) && item.grip === "two-handed"

				if (isArmor(item)) {
					if (gearClass === "heavy" && !get(isSkillAcquired("armorcraft"))) {
						return
					}

					if (ID === armorValue.ID || forceUnequip) {
						reset(armor)
					}
					else {
						set(armor, item)

						set(isShowing("armor"), true)
						set(isShowing("protection"), true)

						progressQuest({ quest: "equippingArmor" })
					}
				}

				if (isShield(item)) {
					if (gearClass === "tower" && !get(isSkillAcquired("shieldcraft"))) {
						return
					}

					if (ID === shieldValue.ID || forceUnequip) {
						reset(shield)
					}
					else {
						set(shield, item)

						// Equipping a shield while a ranged or two-handed weapon is equipped un-equips the weapon (unless it's two-handed and the colossus trait is acquired).
						if (
							(isMelee(weaponValue)
							&& weaponValue.grip === "two-handed"
							&& !get(isTraitAcquired("colossus")))
							|| isRanged(weaponValue)
						) {
							reset(weapon)
						}

						set(isShowing("offhand"), true)

						progressQuest({ quest: "equippingShield" })
					}
				}

				if (isWeapon(item)) {
					if (isWeaponTwoHanded && !get(isSkillAcquired("siegecraft"))) {
						return
					}

					if (isRanged(item) && !get(isSkillAcquired("archery"))) {
						return
					}

					if (ID === weaponValue.ID || forceUnequip) {
						reset(weapon)
					}
					else {
						set(weapon, item)

						// Equipping a ranged or two-handed weapon while a shield is equipped un-equips the shield.
						if (
							(isWeaponRanged || (isWeaponTwoHanded && !get(isTraitAcquired("colossus"))))
							&& !isUnshielded(shieldValue)
						) {
							reset(shield)
						}

						if (isWeaponRanged || isWeaponTwoHanded) {
							set(isShowing("offhand"), true)
						}

						set(isShowing("damage"), true)
						set(isShowing("weapon"), true)

						progressQuest({ quest: "equippingWeapon" })
					}
				}

				if (burden > 0) {
					set(isShowing("stamina"), true)
				}

				reset(questProgress("survivingNoGear"))
			},
		[progressQuest],
	)
}
