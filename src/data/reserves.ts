import type { Delta, Reserve } from "@neverquest/types/unions";

export const HEALTH_LOW_THRESHOLD = 0.33;

export const RESERVE_MINIMUM = 1;

export const RESERVES: Record<
  Reserve,
  {
    baseAmount: number;
    baseRegenerationAmount: number;
    baseRegenerationRate: number;
    label: string;
    regenerationDeltaAmount: Delta;
    regenerationDeltaRate: Delta;
  }
> = {
  health: {
    baseAmount: 50,
    baseRegenerationAmount: 3,
    baseRegenerationRate: 3600,
    label: "Health",
    regenerationDeltaAmount: "healthRegenerationAmount",
    regenerationDeltaRate: "healthRegenerationRate",
  },
  stamina: {
    baseAmount: 10,
    baseRegenerationAmount: 1,
    baseRegenerationRate: 3300,
    label: "Stamina",
    regenerationDeltaAmount: "staminaRegenerationAmount",
    regenerationDeltaRate: "staminaRegenerationRate",
  },
};
