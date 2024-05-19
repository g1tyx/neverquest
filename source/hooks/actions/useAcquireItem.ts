import { useRecoilCallback } from "recoil"

import { useCanFit } from "@neverquest/hooks/actions/useCanFit"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { armor, shield, weapon } from "@neverquest/state/gear"
import { acquiredItems, inventory, notifyOverEncumbrance } from "@neverquest/state/inventory"
import { hasLootedInheritable } from "@neverquest/state/items"
import { isSkillAcquired } from "@neverquest/state/skills"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import {
	isArmor,
	isGearItem,
	isGemItem,
	isInheritableItem,
	isMelee,
	isRanged,
	isShield,
	isUnarmed,
	isUnarmored,
	isUnshielded,
} from "@neverquest/types/type-guards"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { InventoryItem } from "@neverquest/types"

export function useAcquireItem() {
	const canFit = useCanFit()
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ set, snapshot }) =>
			(item: InventoryItem): "equip" | "failure" | "success" => {
				const get = getSnapshotGetter(snapshot)

				if (!canFit(item.weight)) {
					set(notifyOverEncumbrance, true)

					return "failure"
				}

				if (item.name !== "knapsack") {
					set(acquiredItems, currentAcquiredItems => [...currentAcquiredItems, item])
				}

				if (isGemItem(item)) {
					progressQuest({ quest: "acquiringGems" })
				}

				if (isInheritableItem(item)) {
					switch (item.name) {
						case "[S751NQ]": {
							set(hasLootedInheritable("[S751NQ]"), true)

							progressQuest({ quest: "acquiringLogEntry" })
							break
						}

						case "dream catcher": {
							set(hasLootedInheritable("dream catcher"), true)

							progressQuest({ quest: "acquiringDreamCatcher" })
							break
						}

						case "familiar": {
							set(hasLootedInheritable("familiar"), true)

							progressQuest({ quest: "acquiringFamiliar" })
							break
						}

						case "knapsack": {
							set(isShowing("weight"), true)
							break
						}

						case "memento": {
							set(hasLootedInheritable("memento"), true)

							progressQuest({ quest: "acquiringMemento" })
							break
						}

						case "mysterious egg": {
							set(hasLootedInheritable("mysterious egg"), true)
							break
						}

						case "torn manuscript": {
							set(hasLootedInheritable("torn manuscript"), true)

							progressQuest({ quest: "acquiringTornManuscript" })
							break
						}

						default: {
							break
						}
					}
				}

				set(inventory, currentInventory => [...currentInventory, item])

				const isItemMelee = isMelee(item)
				const isItemRanged = isRanged(item)
				const isShieldUnequipped = isUnshielded(get(shield))
				const weaponValue = get(weapon)

				if (isGearItem(item)) {
					if (isItemMelee && item.grip === "two-handed") {
						progressQuest({ quest: "acquiringTwoHanded" })
					}

					if (isItemRanged) {
						progressQuest({ quest: "acquiringRanged" })
					}

					// Auo-equip if ...
					if (
						// .. acquiring armor while none is equipped, or
						(isUnarmored(get(armor)) && isArmor(item))
						// .... acquiring a shield while no shield is equipped and not wielding a ranged weapon nor two-handed weapon, unless colossus trait is acquired, or
						|| (
							isShieldUnequipped
							&& isShield(item)
							&& !isRanged(weaponValue)
							&& (isMelee(weaponValue) || isUnarmed(weaponValue))
							&& (weaponValue.grip === "one-handed" || get(isTraitAcquired("colossus")))
						)
						// ... acquiring a weapon while no weapon is equipped, and if it's ranged or two-handed, having no shield equipped, unless colossus trait is acquired.
						|| (
							isUnarmed(weaponValue)
							&& (
								(isItemMelee && item.grip === "one-handed")
								|| get(isTraitAcquired("colossus"))
								|| (
									isShieldUnequipped
									&& (
										(isItemMelee && item.grip === "two-handed")
										|| (isItemRanged && get(isSkillAcquired("archery")))
									)
								)
							)
						)
					) {
						return "equip"
					}
				}

				return "success"
			},
		[canFit, progressQuest],
	)
}
