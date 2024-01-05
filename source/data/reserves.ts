import type { Delta, Reserve } from "@neverquest/types/unions";

export const AILING_RESERVE_MINIMUM = 1;

export const HEALTH_LOW_THRESHOLD = 0.33;

export const RESERVES: Record<
  Reserve,
  {
    baseAmount: number;
    baseRegenerationAmount: number;
    baseRegenerationRate: number;
    regenerationDeltaAmount: Delta;
    regenerationDeltaRate: Delta;
  }
> = {
  health: {
    baseAmount: 50,
    baseRegenerationAmount: 3,
    baseRegenerationRate: 2600,
    regenerationDeltaAmount: "healthRegenerationAmount",
    regenerationDeltaRate: "healthRegenerationRate",
  },
  stamina: {
    baseAmount: 20,
    baseRegenerationAmount: 1,
    baseRegenerationRate: 2100,
    regenerationDeltaAmount: "staminaRegenerationAmount",
    regenerationDeltaRate: "staminaRegenerationRate",
  },
};
