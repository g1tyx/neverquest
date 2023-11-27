import type { MonsterAilmentElemental } from "@neverquest/types/unions";

export const AILMENT_PENALTY = {
  burning: 1.25,
  shocked: 0.75,
  staggered: 0.4,
  stunned: 0.5,
};

export const BLEED = {
  default: { duration: 5000, ticks: 40 },
  shredder: { duration: 100, ticks: 1 },
};

export const ELEMENTAL_AILMENT_DURATION_MAXIMUM: Record<MonsterAilmentElemental, number> = {
  burning: 4000,
  frozen: 2500,
  shocked: 5000,
};

export const LOOTING_RATE = 2000;

export const PARRY_ABSORPTION = 0.33;
export const PARRY_DAMAGE = 0.25;

export const RECOVERY_RATE = 1500;
