import type {
  ArmorClass,
  ArtifactType,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@kitnato/locran/build/types";
import { INFUSABLES, TRINKETS } from "@neverquest/data/items";
import IconAlchemist from "@neverquest/icons/alchemist.svg?react";
import IconBlacksmith from "@neverquest/icons/blacksmith.svg?react";
import IconFletcher from "@neverquest/icons/fletcher.svg?react";
import IconMedic from "@neverquest/icons/medic.svg?react";
import IconMercenary from "@neverquest/icons/mercenary.svg?react";
import IconMerchant from "@neverquest/icons/merchant.svg?react";
import IconOccultist from "@neverquest/icons/occultist.svg?react";
import IconTailor from "@neverquest/icons/tailor.svg?react";
import IconWitch from "@neverquest/icons/witch.svg?react";
import type { UsableItem } from "@neverquest/types";
import type { SVGIcon } from "@neverquest/types/components";
import type { Crew, Grip } from "@neverquest/types/unions";

export const AMMUNITION_PRICE = 10;

export const GEAR_LEVEL_RANGE_MAXIMUM = 3;

export const CREW: Record<
  Crew,
  {
    description: string;
    Icon: SVGIcon;
    interaction: string;
    monologues: Record<number, string | undefined>;
    price: number;
    requiredStage: number;
  }
> = {
  alchemist: {
    description: "Converts gems between one another.",
    Icon: IconAlchemist,
    interaction: "Transmute",
    monologues: {
      1: "Things are not always what they seem.",
      51: "Come across any long-lost manuscripts lately?",
      100: "Nothing makes any sense.",
    },
    price: 400,
    requiredStage: 32,
  },
  blacksmith: {
    description: "Crafts superior gear.",
    Icon: IconBlacksmith,
    interaction: "Craft",
    monologues: { 1: "In need of better gear?", 100: "Doesn't make a difference." },
    price: 50,
    requiredStage: 12,
  },
  fletcher: {
    description: "Crafts ranged weapons and provides ammunition.",
    Icon: IconFletcher,
    interaction: "Craft",
    monologues: { 1: "Tired of monster breath?", 100: "There's too many of them." },
    price: 300,
    requiredStage: 25,
  },
  medic: {
    description: "Heals wounds and sells bandages.",
    Icon: IconMedic,
    interaction: "Treat",
    monologues: { 1: "Allow me to patch you up.", 100: "Never-ending madness. It hurts." },
    price: 20,
    requiredStage: 6,
  },
  mercenary: {
    description: "Trains new skills and attributes.",
    Icon: IconMercenary,
    interaction: "Train",
    monologues: { 1: "Perhaps I can teach you something.", 100: "Overbearing darkness ..." },
    price: 90,
    requiredStage: 15,
  },
  merchant: {
    description: "Offers various items for purchase and buys unwanted items.",
    Icon: IconMerchant,
    interaction: "Trade",
    monologues: {
      1: "Greetings. I have what you're looking for.",
      2: "Hello again. Some protection, perhaps?",
      3: "Ah, you're back. Care for an aegis?",
      4: "You must be over-burdened. I can help with that.",
      5: "A trinket that allows safe passage. Would that be of interest?",
      6: "Heard there are other travelers looking to sell their services.",
      7: "Wouldn't it be useful to retread old ground? I have just the thing.",
      8: "New gear for sale, if you care to peruse.",
      9: "There is something dark looming on the horizon ...",
      10: "I can't believe you came out of that in one piece.",
      11: "Have you appraised all my offerings?",
      15: "Good to see you.",
      20: "I recently came into possession of a fine curiosity.",
      21: "Can I interest you in anything else?",
      23: "I have something suitable for marksmen.",
      24: "Welcome back. Always a sight for sore eyes.",
      35: "You wouldn't be a scribe, would you?",
      36: "Your headway in the wilderness is helping business.",
      40: "A dark wanderer passed by and sold me a strange book ...",
      41: "A sea of monsters ... but is it endless?",
      50: "Retirement? Pretty sure you're trapped here with us.",
      51: "Still you come back for more?",
      52: "There are tales of a mysterious creature that only the most fortunate find.",
      60: "Have you not seen everything by now?",
      70: "Dark portents signal dark tides are coming.",
      76: "Lady luck is smiling on us today.",
      80: "Still you press on. There must be an answer.",
      90: "It's so cold ...",
      99: "I fear the end is imminent.",
      100: "How are you still here?",
      101: "You shouldn't be here.",
      110: "This is all wrong. I don't understand.",
      120: "Leave while you still can. Please.",
      130: "Inescapable. Unfathomable. Inside everything.",
      140: "Why? Darkness never-ending.",
      150: "Nothing is real ...",
    },
    price: 1,
    requiredStage: 0,
  },
  occultist: {
    description: "Sells phylacteries and offers purging rituals.",
    Icon: IconOccultist,
    interaction: "Ritual",
    monologues: { 1: "Prepared to pierce the veil?", 100: "I can't see any more." },
    price: 777,
    requiredStage: 40,
  },
  tailor: {
    description: "Expands inventory space.",
    Icon: IconTailor,
    interaction: "Tailoring",
    monologues: { 1: "Allow me to deepen your pockets.", 100: "Fate has been mis-weaved." },
    price: 35,
    requiredStage: 9,
  },
  witch: {
    description: "Sells potions that cure ailments.",
    Icon: IconWitch,
    interaction: "Brew",
    monologues: { 1: "Gaze into my cauldron ...", 100: "All is lost now." },
    price: 150,
    requiredStage: 20,
  },
};

export const OCCULTIST_PURGE_PRICE_MULTIPLIER = {
  essence: 0.15,
  quests: 500,
};

export const OVUM_INFUSION_PRICE = 1313;

export const MEDIC_PRICE_SURGERY = { critical: 100, normal: 20 };

export const MERCHANT_OFFERS: Record<
  number,
  | UsableItem
  | (ArtifactType<"armor"> & {
      gearClass: ArmorClass;
    })
  | (ArtifactType<"shield"> & {
      gearClass: ShieldClass;
    })
  | (ArtifactType<"weapon"> & {
      gearClass: WeaponClass;
      grip: Grip;
      modality: WeaponModality;
    })
> = {
  1: {
    gearClass: "piercing",
    grip: "one-handed",
    modality: "melee",
    type: "weapon",
  },
  2: {
    gearClass: "light",
    type: "armor",
  },
  3: {
    gearClass: "small",
    type: "shield",
  },
  4: TRINKETS.knapsack.item,
  5: TRINKETS.hearthstone.item,
  6: {
    gearClass: "slashing",
    grip: "one-handed",
    modality: "melee",
    type: "weapon",
  },
  7: TRINKETS.compass.item,
  8: {
    gearClass: "reinforced",
    type: "armor",
  },
  9: {
    gearClass: "medium",
    type: "shield",
  },
  10: {
    gearClass: "blunt",
    grip: "one-handed",
    modality: "melee",
    type: "weapon",
  },
  20: INFUSABLES["monkey paw"].item,
  [CREW.fletcher.requiredStage]: TRINKETS["ammunition pouch"].item,
  35: TRINKETS.journal.item,
  40: INFUSABLES["tome of power"].item,
  50: TRINKETS["antique coin"].item,
};

export const TAILORING_EXPANSION = {
  ammunitionPouch: 20,
  knapsack: 3,
};
export const TAILORING_PRICE_MAXIMUM = {
  ammunitionPouch: 200,
  knapsack: 340,
};

export const TRANSMUTE_COST = 3;
export const TRANSMUTE_YIELD = 1;

export const WITCH_POTIONS = ["elixir", "antidote", "salve"] as const;
