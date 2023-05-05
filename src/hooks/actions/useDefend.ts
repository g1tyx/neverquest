import { useRecoilCallback } from "recoil";

import { POISON } from "@neverquest/data/constants";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeMonsterHealth } from "@neverquest/hooks/actions/useChangeMonsterHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useIncreaseMastery } from "@neverquest/hooks/actions/useIncreaseMastery";
import { poisonDuration, recoveryDuration, statusElement } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import {
  monsterDamage,
  monsterElement,
  monsterPoisonChance,
  monsterStaggeredDuration,
} from "@neverquest/state/monster";
import { canAttackOrParry, canBlock, canDodge, staminaDebuff } from "@neverquest/state/reserves";
import { skills } from "@neverquest/state/skills";
import {
  blockChance,
  deflectionChance,
  dodgeChanceTotal,
  freeBlockChance,
  parryAbsorption,
  parryChance,
  parryDamage,
  protection,
  recoveryRate,
  skipRecoveryChance,
  staggerDuration,
} from "@neverquest/state/statistics";
import { DeltaType, MasteryType, ShowingType, SkillType } from "@neverquest/types/enums";
import type { DeltaDisplay } from "@neverquest/types/ui";
import { animateElement } from "@neverquest/utilities/animateElement";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

/**
 * If dodged, no other actions taken (all damage negated)
 * If health damage (protection minus monster damage) is 0 or less, no other actions taken
 * Check for and apply monster poisoning.
 * If parrying occurs, check stamina cost, and continue
 * If not parried and blocking occurs, check stamina cost, and continue
 * If blocking occurs, check if monster is staggered
 * If not parried and not blocked, set recovery, and continue
 * Process health & stamina deltas
 */
export function useDefend() {
  const changeHealth = useChangeHealth();
  const changeMonsterHealth = useChangeMonsterHealth();
  const changeStamina = useChangeStamina();
  const increaseMastery = useIncreaseMastery();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        if (!get(isShowing(ShowingType.MonsterDamage))) {
          set(isShowing(ShowingType.MonsterDamage), true);
        }

        animateElement({
          element: get(statusElement),
          speed: "fast",
          type: "headShake",
        });

        const hasDodged = get(skills(SkillType.Dodge)) && Math.random() <= get(dodgeChanceTotal);

        if (hasDodged) {
          if (get(canDodge)) {
            set(deltas(DeltaType.Health), {
              color: "text-muted",
              value: "DODGED",
            });

            return;
          } else {
            set(deltas(DeltaType.Health), {
              color: "text-muted",
              value: `CANNOT DODGE (${get(armor).staminaCost})`,
            });
          }
        }

        const monsterDamageValue = get(monsterDamage);
        let healthDamage = (() => {
          const damage = get(protection) - monsterDamageValue;

          return damage < 0 ? damage : 0;
        })();

        if (healthDamage === 0) {
          set(deltas(DeltaType.Health), {
            color: "text-muted",
            value: healthDamage,
          });

          return;
        }

        let deltaHealth: DeltaDisplay = [];
        let deltaStamina: DeltaDisplay = [];

        const hasParried = get(skills(SkillType.Parry)) && Math.random() <= get(parryChance);

        if (hasParried) {
          const { staminaCost } = get(weapon);

          if (get(canAttackOrParry)) {
            healthDamage = Math.floor(healthDamage * get(parryAbsorption));

            const parryReflected = -Math.floor(monsterDamageValue * get(parryDamage));

            changeMonsterHealth({
              delta: [
                {
                  color: "text-muted",
                  value: "PARRIED",
                },
                {
                  color: "text-danger",
                  value: ` (${parryReflected})`,
                },
              ],
              value: parryReflected,
            });

            deltaHealth = [
              {
                color: "text-muted",
                value: "PARRIED",
              },
              {
                color: "text-danger",
                value: ` (${healthDamage})`,
              },
            ];

            changeStamina({ value: -staminaCost });
            increaseMastery(MasteryType.ParryFactor);

            animateElement({
              element: get(monsterElement),
              speed: "fast",
              type: "headShake",
            });
          } else {
            deltaStamina = [
              {
                color: "text-muted",
                value: "CANNOT PARRY",
              },
              {
                color: "text-danger",
                value: ` (${staminaCost})`,
              },
            ];
          }
        }

        const hasBlocked = Math.random() <= get(blockChance);

        if (hasBlocked && !hasParried) {
          const { staminaCost } = get(shield);

          if (get(canBlock)) {
            healthDamage = 0;

            const hasStaggered =
              get(skills(SkillType.Stagger)) && Math.random() <= get(shield).staggerChance;
            const shieldsSkill = get(skills(SkillType.Shields));
            const isFreeBlock = shieldsSkill && Math.random() <= get(freeBlockChance);

            deltaHealth = [
              {
                color: "text-muted",
                value: "BLOCKED",
              },
            ];

            if (shieldsSkill) {
              increaseMastery(MasteryType.FreeBlockChance);
            }

            if (isFreeBlock) {
              deltaStamina.push({
                color: "text-muted",
                value: "STABILIZED",
              });
            } else {
              changeStamina({ value: -staminaCost });
            }

            if (hasStaggered) {
              set(monsterStaggeredDuration, get(staggerDuration));
            }
          } else {
            deltaStamina = [
              {
                color: "text-muted",
                value: "CANNOT BLOCK",
              },
              {
                color: "text-danger",
                value: ` (${staminaCost})`,
              },
            ];
          }
        }

        if (!hasBlocked && !hasParried) {
          if (get(protection) > 0) {
            deltaHealth = [
              {
                color: "text-danger",
                value: healthDamage,
              },
              {
                color: "text-muted",
                value: ` (${get(protection)})`,
              },
            ];
          }
        }

        const armorsSkill = get(skills(SkillType.Armors));
        const hasSkippedRecovery = armorsSkill && Math.random() <= get(skipRecoveryChance);

        if (armorsSkill) {
          increaseMastery(MasteryType.SkipRecoveryChance);
        }

        if (!hasSkippedRecovery) {
          if (!get(isShowing(ShowingType.Recovery))) {
            set(isShowing(ShowingType.Recovery), true);
          }

          set(recoveryDuration, get(recoveryRate));
        }

        const isPoisoned = Math.random() <= get(monsterPoisonChance);

        if (isPoisoned) {
          const hasDeflected =
            get(skills(SkillType.Armors)) && Math.random() <= get(deflectionChance);

          if (hasDeflected) {
            deltaHealth.push({
              color: "text-success",
              value: "DEFLECTED POISON",
            });
          } else {
            if (get(poisonDuration) > 0) {
              set(staminaDebuff, (current) => current + 1);

              deltaStamina.push({
                color: "text-danger",
                value: "BLIGHTED",
              });
            } else {
              set(poisonDuration, POISON.duration);

              deltaHealth.push({
                color: "text-danger",
                value: "POISONED",
              });
            }
          }
        }

        changeHealth({ delta: deltaHealth, value: healthDamage });

        if (deltaStamina.length > 0) {
          set(deltas(DeltaType.Stamina), deltaStamina);
        }
      },
    [changeHealth, changeMonsterHealth, changeStamina, increaseMastery]
  );
}
