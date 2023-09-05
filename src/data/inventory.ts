import { nanoid } from "nanoid";

import { ReactComponent as IconAntidote } from "@neverquest/icons/antidote.svg";
import { ReactComponent as IconAntiqueCoin } from "@neverquest/icons/antique-coin.svg";
import { ReactComponent as IconPlate } from "@neverquest/icons/armor-plate.svg";
import { ReactComponent as IconReinforced } from "@neverquest/icons/armor-reinforced.svg";
import { ReactComponent as IconBandages } from "@neverquest/icons/bandages.svg";
import { ReactComponent as IconCompass } from "@neverquest/icons/compass.svg";
import { ReactComponent as IconElixir } from "@neverquest/icons/elixir.svg";
import { ReactComponent as IconFire } from "@neverquest/icons/fire.svg";
import { ReactComponent as IconStone } from "@neverquest/icons/hearthstone.svg";
import { ReactComponent as IconHide } from "@neverquest/icons/hide.svg";
import { ReactComponent as IconIce } from "@neverquest/icons/ice.svg";
import { ReactComponent as IconKnapsack } from "@neverquest/icons/knapsack.svg";
import { ReactComponent as IconLightning } from "@neverquest/icons/lightning.svg";
import { ReactComponent as IconMonkeyPaw } from "@neverquest/icons/monkey-paw.svg";
import { ReactComponent as IconParry } from "@neverquest/icons/parry.svg";
import { ReactComponent as IconPhylactery } from "@neverquest/icons/phylactery.svg";
import { ReactComponent as IconSalve } from "@neverquest/icons/salve.svg";
import { ReactComponent as IconShieldMedium } from "@neverquest/icons/shield-medium.svg";
import { ReactComponent as IconShieldSmall } from "@neverquest/icons/shield-small.svg";
import { ReactComponent as IconShieldTower } from "@neverquest/icons/shield-tower.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { ReactComponent as IconWeaponBleed } from "@neverquest/icons/weapon-bleed.svg";
import { ReactComponent as IconBlunt } from "@neverquest/icons/weapon-blunt.svg";
import { ReactComponent as IconPiercing } from "@neverquest/icons/weapon-piercing.svg";
import { ReactComponent as IconSlashing } from "@neverquest/icons/weapon-slashing.svg";
import { ReactComponent as IconWeaponStagger } from "@neverquest/icons/weapon-stagger.svg";
import type { ArmorClass, ShieldClass, WeaponClass } from "@neverquest/LOCRAN/types";
import type {
  Armor,
  ConsumableItem,
  GearBase,
  GeneratorRange,
  Shield,
  TrinketItem,
  Weapon,
} from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/props";
import type {
  Consumable,
  Elemental,
  Gem,
  MonsterAilment,
  Showing,
  Trinket,
} from "@neverquest/types/unions";

export const ARMOR_NONE: Omit<Armor, "coinPrice" | "isEquipped" | "scrapPrice"> = {
  deflection: 0,
  gems: [],
  id: nanoid(),
  level: 0,
  name: "Unarmored",
  protection: 0,
  staminaCost: 0,
  weight: 0,
};

export const ARMOR_SPECIFICATIONS: Record<
  ArmorClass,
  Omit<GearBase, "staminaCost"> & {
    deflection: [GeneratorRange, GeneratorRange] | null;
    Icon: SVGIcon;
    protection: [GeneratorRange, GeneratorRange];
    staminaCost: 0 | [GeneratorRange, GeneratorRange] | null;
  }
> = {
  hide: {
    coinPrice: 250,
    deflection: null,
    Icon: IconHide,
    protection: [
      { maximum: 2, minimum: 1 },
      { maximum: 400, minimum: 350 },
    ],
    scrapPrice: 2500,
    staminaCost: 0,
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 60, minimum: 55 },
    ],
  },
  plate: {
    coinPrice: 550,
    deflection: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.65, minimum: 0.6 },
    ],
    Icon: IconPlate,
    protection: [
      { maximum: 15, minimum: 10 },
      { maximum: 800, minimum: 750 },
    ],
    scrapPrice: 4000,
    staminaCost: null,
    weight: [
      { maximum: 7, minimum: 5 },
      { maximum: 120, minimum: 110 },
    ],
  },
  reinforced: {
    coinPrice: 400,
    deflection: [
      { maximum: 0.15, minimum: 0.1 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    Icon: IconReinforced,
    protection: [
      { maximum: 10, minimum: 5 },
      { maximum: 500, minimum: 450 },
    ],
    scrapPrice: 3000,
    staminaCost: [
      { maximum: 5, minimum: 3 },
      { maximum: 50, minimum: 45 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 90, minimum: 80 },
    ],
  },
};

export const CONSUMABLES: Record<Consumable, { Icon: SVGIcon; item: Omit<ConsumableItem, "id"> }> =
  {
    antidote: {
      Icon: IconAntidote,
      item: {
        coinPrice: 15,
        description: "Cures poison.",
        type: "antidote",
        weight: 5,
      },
    },
    bandages: {
      Icon: IconBandages,
      item: {
        coinPrice: 10,
        description: "Restores all health.",
        type: "bandages",
        weight: 1,
      },
    },
    elixir: {
      Icon: IconElixir,
      item: {
        coinPrice: 8,
        description: "Restores all stamina.",
        type: "elixir",
        weight: 2,
      },
    },
    phylactery: {
      Icon: IconPhylactery,
      item: {
        coinPrice: 100,
        description: "Resurrects the carrier upon death.",
        type: "phylactery",
        weight: 10,
      },
    },
    salve: {
      Icon: IconSalve,
      item: {
        coinPrice: 25,
        description: "Cures blight.",
        type: "salve",
        weight: 3,
      },
    },
  };

export const ELEMENTALS: Record<
  Elemental,
  { ailment: MonsterAilment; color: string; Icon: SVGIcon }
> = {
  fire: { ailment: "burning", color: "text-orange", Icon: IconFire },
  ice: { ailment: "frozen", color: "text-blue", Icon: IconIce },
  lightning: { ailment: "shocked", color: "text-yellow", Icon: IconLightning },
};

export const ENCUMBRANCE = 6;
export const KNAPSACK_SIZE = 4;

export const GEM_BASE = {
  coinPrice: 10,
  weight: 1,
};
export const GEM_DAMAGE = [0.1, 0.2, 0.4, 0.7, 1];
export const GEM_DURATION = [500, 800, 1300, 2000, 3000];
export const GEM_ELEMENTALS: Record<Gem, Elemental> = {
  ruby: "fire",
  sapphire: "ice",
  topaz: "lightning",
};
export const GEM_ENHANCEMENT = [0.1, 0.25, 0.45, 0.7, 1];
export const GEMS_MAXIMUM = 5;

export const SHIELD_NONE: Omit<Shield, "coinPrice" | "isEquipped" | "ranges" | "scrapPrice"> = {
  block: 0,
  gems: [],
  id: nanoid(),
  level: 0,
  name: "Unshielded",
  stagger: 0,
  staminaCost: 0,
  weight: 0,
};

export const SHIELD_SPECIFICATIONS: Record<
  ShieldClass,
  GearBase & {
    block: [GeneratorRange, GeneratorRange];
    Icon: SVGIcon;
    stagger: [GeneratorRange, GeneratorRange] | null;
  }
> = {
  medium: {
    block: [
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.4, minimum: 0.35 },
    ],
    coinPrice: 400,
    Icon: IconShieldMedium,
    scrapPrice: 3000,
    stagger: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    staminaCost: [
      { maximum: 4, minimum: 2 },
      { maximum: 30, minimum: 25 },
    ],
    weight: [
      { maximum: 5, minimum: 3 },
      { maximum: 45, minimum: 40 },
    ],
  },
  small: {
    block: [
      { maximum: 0.25, minimum: 0.2 },
      { maximum: 0.35, minimum: 0.3 },
    ],
    coinPrice: 300,
    Icon: IconShieldSmall,
    scrapPrice: 2000,
    stagger: null,
    staminaCost: [
      { maximum: 2, minimum: 1 },
      { maximum: 25, minimum: 20 },
    ],
    weight: [
      { maximum: 2, minimum: 1 },
      { maximum: 30, minimum: 25 },
    ],
  },
  tower: {
    block: [
      { maximum: 0.55, minimum: 0.5 },
      { maximum: 0.65, minimum: 0.6 },
    ],
    coinPrice: 600,
    Icon: IconShieldTower,
    scrapPrice: 3000,
    stagger: [
      { maximum: 0.35, minimum: 0.3 },
      { maximum: 0.55, minimum: 0.5 },
    ],
    staminaCost: [
      { maximum: 10, minimum: 7 },
      { maximum: 45, minimum: 40 },
    ],
    weight: [
      { maximum: 8, minimum: 5 },
      { maximum: 60, minimum: 55 },
    ],
  },
};

export const TRINKETS: Record<Trinket, { Icon: SVGIcon; item: TrinketItem }> = {
  "antique coin": {
    Icon: IconAntiqueCoin,
    item: {
      coinPrice: 200,
      description: "Unlocks the Luck attribute.",
      id: nanoid(),
      type: "antique coin",
      weight: 2,
    },
  },
  compass: {
    Icon: IconCompass,
    item: {
      coinPrice: 20,
      description: "Navigate the wilderness to hunt in previous locations.",
      id: nanoid(),
      type: "compass",
      weight: 2,
    },
  },
  hearthstone: {
    Icon: IconStone,
    item: {
      coinPrice: 40,
      description: "Travel back to the caravan even if there are still lurking monsters.",
      id: nanoid(),
      type: "hearthstone",
      weight: 2,
    },
  },
  knapsack: {
    Icon: IconKnapsack,
    item: {
      coinPrice: 10,
      description: "Carry more items and manage gear.",
      id: nanoid(),
      type: "knapsack",
      weight: 0,
    },
  },
  "monkey paw": {
    Icon: IconMonkeyPaw,
    item: {
      coinPrice: 300,
      description: "Looting a corpse is instantaneous.",
      id: nanoid(),
      type: "monkey paw",
      weight: 3,
    },
  },
  "tome of power": {
    Icon: IconPower,
    item: {
      coinPrice: 500,
      description: "Grants a bonus to all attributes based on power level.",
      id: nanoid(),
      type: "tome of power",
      weight: 10,
    },
  },
};

export const WEAPON_BASE: GearBase & {
  damage: [GeneratorRange, GeneratorRange];
  range: [GeneratorRange, GeneratorRange];
  rate: [GeneratorRange, GeneratorRange];
} = {
  coinPrice: 500,
  damage: [
    { maximum: 13, minimum: 11 },
    { maximum: 850, minimum: 800 },
  ],
  range: [
    { maximum: 4000, minimum: 3500 },
    { maximum: 8000, minimum: 7500 },
  ],
  rate: [
    { maximum: 3500, minimum: 3300 },
    { maximum: 2200, minimum: 2000 },
  ],
  scrapPrice: 2500,
  staminaCost: [
    { maximum: 2, minimum: 1 },
    { maximum: 60, minimum: 50 },
  ],
  weight: [
    { maximum: 2, minimum: 1 },
    { maximum: 80, minimum: 70 },
  ],
};

export const WEAPON_MODIFIER = {
  "one-handed": { damage: 1, rate: 1 },
  ranged: { damage: 1.2, rate: 1 },
  "two-handed": { damage: 1.5, rate: 1.5 },
};

export const WEAPON_NONE: Omit<Weapon, "coinPrice" | "isEquipped" | "scrapPrice"> = {
  abilityChance: 0,
  damage: 10,
  gearClass: "blunt",
  gems: [],
  grip: "one-handed",
  id: nanoid(),
  level: 0,
  modality: "melee",
  name: "Unarmed",
  range: 0,
  rate: 2500,
  staminaCost: 0,
  weight: 0,
};

export const WEAPON_SPECIFICATIONS: Record<
  WeaponClass,
  {
    abilityChance: [GeneratorRange, GeneratorRange];
    abilityName: string;
    IconAbility: SVGIcon;
    IconGearClass: SVGIcon;
    showingType: Showing;
  }
> = {
  blunt: {
    abilityChance: [
      { maximum: 0.2, minimum: 0.15 },
      { maximum: 0.4, minimum: 0.35 },
    ],
    abilityName: "Stagger",
    IconAbility: IconWeaponStagger,
    IconGearClass: IconBlunt,
    showingType: "stagger",
  },
  piercing: {
    abilityChance: [
      { maximum: 0.3, minimum: 0.25 },
      { maximum: 0.5, minimum: 0.45 },
    ],
    abilityName: "Bleed",
    IconAbility: IconWeaponBleed,
    IconGearClass: IconPiercing,
    showingType: "bleed",
  },
  slashing: {
    abilityChance: [
      { maximum: 0.35, minimum: 0.3 },
      { maximum: 0.5, minimum: 0.45 },
    ],
    abilityName: "Parry",
    IconAbility: IconParry,
    IconGearClass: IconSlashing,
    showingType: "parry",
  },
};
