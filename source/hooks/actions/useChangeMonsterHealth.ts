import { useRecoilCallback } from "recoil";

import { AILMENT_PENALTY, LOOTING_RATE } from "@neverquest/data/statistics";
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { powerLevel } from "@neverquest/state/attributes";
import { attackDuration, lootingDuration } from "@neverquest/state/character";
import { encounter, stage } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import {
  isMonsterAiling,
  monsterAttackDuration,
  monsterHealth,
  monsterHealthMaximum,
  monsterRegenerationDuration,
} from "@neverquest/state/monster";
import type { DeltaDisplay, DeltaReserveBase } from "@neverquest/types/ui";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useChangeMonsterHealth() {
  const addDelta = useAddDelta();
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({
        damageType,
        delta,
        value,
      }: DeltaReserveBase & {
        damageType?: "bleeding" | "critical" | "execution" | "parry" | "thorns";
      }) => {
        const get = getSnapshotGetter(snapshot);

        const isPositive = value > 0;
        const totalValue =
          !isPositive && get(isMonsterAiling("staggered"))
            ? value * (1 + AILMENT_PENALTY.staggered)
            : value;
        const formattedValue = formatNumber({ value: totalValue });
        const monsterHealthValue = get(monsterHealth);
        const monsterHealthMaximumValue = get(monsterHealthMaximum);

        let newHealth = Math.min(monsterHealthValue + totalValue, monsterHealthMaximumValue);

        addDelta({
          contents:
            delta === undefined || (Array.isArray(delta) && delta.length === 0)
              ? ({
                  color: isPositive ? "text-success" : "text-danger",
                  value: isPositive ? `+${formattedValue}` : formattedValue,
                } as DeltaDisplay)
              : delta,
          delta: "monsterHealth",
        });

        if (newHealth <= 0) {
          newHealth = 0;

          reset(attackDuration);
          reset(monsterAttackDuration);
          reset(monsterRegenerationDuration);

          set(
            lootingDuration,
            LOOTING_RATE[get(ownedItem("ender hook")) === undefined ? "base" : "ender hook"],
          );

          switch (get(encounter)) {
            case "boss": {
              progressQuest({ quest: "killingBoss" });
              break;
            }

            case "monster": {
              progressQuest({ quest: "killing" });
              progressQuest({ quest: "killingStage" });
              break;
            }

            case "res cogitans": {
              progressQuest({ quest: "killingResCogitans" });
              break;
            }

            case "res dominus": {
              progressQuest({ quest: "killingResDominus" });
              break;
            }

            case "void": {
              break;
            }
          }

          switch (damageType) {
            case "bleeding": {
              progressQuest({ quest: "bleedingKill" });
              break;
            }

            case "critical": {
              progressQuest({ quest: "criticalKilling" });
              break;
            }

            case "execution": {
              progressQuest({ quest: "executing" });
              break;
            }

            case "parry": {
              progressQuest({ quest: "parryingKill" });
              break;
            }

            case "thorns": {
              progressQuest({ quest: "thornsKill" });
              break;
            }

            default: {
              if (
                monsterHealthValue === monsterHealthMaximumValue &&
                get(powerLevel) <= get(stage)
              ) {
                progressQuest({ quest: "killingOneStrike" });
              }
            }
          }
        }

        if (newHealth >= monsterHealthMaximumValue) {
          newHealth = monsterHealthMaximumValue;

          reset(monsterRegenerationDuration);
        }

        set(monsterHealth, newHealth);
      },
    [addDelta, progressQuest],
  );
}
