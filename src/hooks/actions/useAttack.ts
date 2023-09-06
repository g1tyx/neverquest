import { useRecoilCallback } from "recoil";

import { BLEED, ELEMENTAL_AILMENT_PENALTY } from "@neverquest/data/combat";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import { useInflictElementalAilment } from "@neverquest/hooks/actions/useInflictElementalAilment";
import { attackDuration, canAttackOrParry, isAttacking } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isMonsterAiling, monsterAilmentDuration, monsterElement } from "@neverquest/state/monster";
import { skills } from "@neverquest/state/skills";
import {
  attackRateTotal,
  bleed,
  criticalChance,
  criticalDamage,
  damageTotal,
} from "@neverquest/state/statistics";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";
import { animateElement } from "@neverquest/utilities/helpers";

export function useAttack() {
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const increaseMastery = useIncreaseMastery();
  const inflictElementalAilment = useInflictElementalAilment();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const { abilityChance, gearClass, staminaCost } = get(weapon);

        // TODO - make into a selector based on constituents like canReceiveAilments
        set(isShowing("statistics"), true);

        if (get(canAttackOrParry)) {
          const hasInflictedCritical =
            get(skills("assassination")) && Math.random() <= get(criticalChance);
          const hasInflictedBleed =
            get(monsterAilmentDuration("bleeding")) === 0 &&
            get(skills("anatomy")) &&
            Math.random() <= get(bleed);
          const hasInflictedStagger =
            get(skills("traumatology")) && gearClass === "blunt" && Math.random() <= abilityChance;

          const baseDamage = -get(damageTotal);
          const totalDamage = Math.round(
            (hasInflictedCritical ? baseDamage + baseDamage * get(criticalDamage) : baseDamage) *
              (get(isMonsterAiling("burning")) ? ELEMENTAL_AILMENT_PENALTY.burning : 1),
          );
          const monsterDeltas: DeltaDisplay = [
            {
              color: "text-danger",
              value: totalDamage,
            },
          ];

          if (staminaCost > 0) {
            changeStamina({ isRegeneration: false, value: -staminaCost });
          }

          if (hasInflictedCritical) {
            monsterDeltas.push({
              color: "text-muted",
              value: "CRITICAL",
            });
          }

          if (hasInflictedBleed) {
            set(isShowing("monsterAilments"), true);
            set(monsterAilmentDuration("bleeding"), BLEED.duration);

            increaseMastery("cruelty");

            monsterDeltas.push({
              color: "text-muted",
              value: "BLEED",
            });
          }

          if (hasInflictedStagger) {
            set(isShowing("monsterAilments"), true);
            set(monsterAilmentDuration("staggered"), get(masteryStatistic("might")));

            increaseMastery("might");

            monsterDeltas.push({
              color: "text-muted",
              value: "STAGGER",
            });
          }

          ELEMENTAL_TYPES.forEach((elemental) =>
            inflictElementalAilment({ elemental, slot: "weapon" }),
          );

          changeMonsterHealth({ delta: monsterDeltas, value: totalDamage });

          animateElement({
            element: get(monsterElement),
            speed: "fast",
            type: "headShake",
          });
        } else {
          set(deltas("stamina"), [
            {
              color: "text-muted",
              value: "CANNOT ATTACK",
            },
            {
              color: "text-danger",
              value: `(${staminaCost})`,
            },
          ]);
        }

        if (get(isAttacking) && get(attackDuration) === 0) {
          set(attackDuration, get(attackRateTotal));
        }
      },
    [changeMonsterHealth, changeStamina, increaseMastery, inflictElementalAilment],
  );
}
