import { useRecoilCallback } from "recoil"

import { ATTRIBUTES } from "@neverquest/data/attributes"
import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear"
import { RETIREMENT_STAGE } from "@neverquest/data/general"
import { SKILLS } from "@neverquest/data/skills"
import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill"
import { useInitialize } from "@neverquest/hooks/actions/useInitialize"
import { useNeutralize } from "@neverquest/hooks/actions/useNeutralize"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes"
import { useResetCharacter } from "@neverquest/hooks/actions/useResetCharacter"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import {
	blacksmithInventory,
	expandedBuyback,
	fletcherInventory,
	hasGeneratedOffer,
	merchantInventory,
	monologue,
} from "@neverquest/state/caravan"
import { name } from "@neverquest/state/character"
import {
	corpse,
	generations,
	hasDefeatedFinality,
	stageMaximum,
} from "@neverquest/state/encounter"
import { armor, gems, shield, weapon } from "@neverquest/state/gear"
import { inventory } from "@neverquest/state/inventory"
import { expandedMasteries, masteryProgress, masteryRank } from "@neverquest/state/masteries"
import { questProgress } from "@neverquest/state/quests"
import { isSkillAcquired } from "@neverquest/state/skills"
import { isTraitAcquired, selectedTrait } from "@neverquest/state/traits"
import { isInheritableItem } from "@neverquest/types/type-guards"
import {
	ATTRIBUTE_TYPES,
	CREW_MEMBER_TYPES,
	MASTERY_TYPES,
	SKILL_TYPES,
} from "@neverquest/types/unions"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useRetire() {
	const acquireSkill = useAcquireSkill()
	const initialize = useInitialize()
	const neutralize = useNeutralize()
	const progressQuest = useProgressQuest()
	const resetAttributes = useResetAttributes()
	const resetCharacter = useResetCharacter()
	const resetWilderness = useResetWilderness()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const selectedTraitValue = get(selectedTrait)
				const stageMaximumValue = get(stageMaximum)

				if (stageMaximumValue < RETIREMENT_STAGE) {
					return
				}

				if (selectedTraitValue !== undefined) {
					set(isTraitAcquired(selectedTraitValue), true)
					reset(selectedTrait)

					progressQuest({ quest: "traits" })
					progressQuest({ quest: "traitsAll" })
				}

				resetAttributes()
				resetCharacter()

				reset(armor)
				reset(blacksmithInventory)
				reset(corpse)
				reset(expandedBuyback)
				reset(expandedMasteries)
				reset(hasDefeatedFinality("res dominus"))
				reset(fletcherInventory)
				reset(gems(ARMOR_NONE.ID))
				reset(gems(SHIELD_NONE.ID))
				reset(gems(WEAPON_NONE.ID))
				reset(name)
				reset(shield)
				reset(weapon)

				reset(questProgress("attributesIncreasing"))
				reset(questProgress("attributesUnlocking"))
				reset(questProgress("hiring"))
				reset(questProgress("hiringAll"))
				reset(questProgress("masteriesAll"))
				reset(questProgress("masteriesRankMaximum"))
				reset(questProgress("powerLevel"))
				reset(questProgress("powerLevelUltra"))
				reset(questProgress("stages"))
				reset(questProgress("stagesEnd"))
				reset(questProgress("skillsCraft"))
				reset(questProgress("survivingNoAttributes"))
				reset(questProgress("survivingNoGear"))

				for (const attribute of ATTRIBUTE_TYPES) {
					if (ATTRIBUTES[attribute].requiredSkill === undefined) {
						progressQuest({ quest: "attributesUnlocking" })
					}
				}

				for (const crewMember of CREW_MEMBER_TYPES) {
					reset(monologue(crewMember))
				}

				for (let index = 1; index <= stageMaximumValue; index++) {
					reset(hasGeneratedOffer(index))
				}

				for (const mastery of MASTERY_TYPES) {
					reset(masteryProgress(mastery))
					reset(masteryRank(mastery))
				}

				for (const skill of SKILL_TYPES) {
					if (!SKILLS[skill].isInheritable) {
						reset(isSkillAcquired(skill))

						if (get(isSkillAcquired(skill))) {
							progressQuest({ amount: -1, quest: "skills" })
							progressQuest({ amount: -1, quest: "skillsAll" })
						}
					}
				}

				set(inventory, currentInventory =>
					currentInventory.filter(currentItem => isInheritableItem(currentItem)),
				)

				for (const item of get(merchantInventory)) {
					neutralize({ item })
				}

				reset(merchantInventory)

				set(generations, current => current + 1)

				if (get(isSkillAcquired("memetics"))) {
					progressQuest({ quest: "decipheringJournal" })
				}

				progressQuest({ quest: "retiring" })

				resetWilderness()
				initialize(true)
			},
		[
			acquireSkill,
			initialize,
			neutralize,
			progressQuest,
			resetAttributes,
			resetCharacter,
			resetWilderness,
		],
	)
}
