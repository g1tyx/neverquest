import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { AttributeOrMastery } from "@neverquest/types";
import { DeltaType, MasteryType, SkillType } from "@neverquest/types/enums";

// TODO - diversify icons.
export const MASTERIES: Readonly<Record<MasteryType, AttributeOrMastery>> = {
  [MasteryType.BleedDamage]: {
    base: 0.1,
    description: "Affects bleed damage. Trains when inflicting bleed.",
    Icon: IconPlaceholder,
    increment: 0.04,
    maximum: 1,
    name: "Cruelty",
    requiredSkill: SkillType.Bleed,
  },
  [MasteryType.ParryFactor]: {
    base: 0,
    description: "Affects damage absorbed and reflected when parrying. Trains when parrying.",
    Icon: IconPlaceholder,
    increment: 0.02,
    maximum: 0.8,
    name: "Finesse",
    requiredSkill: SkillType.Parry,
  },
  [MasteryType.Stability]: {
    base: 0,
    description: "Chance that blocking consumes no stamina. Trains when blocking.",
    Icon: IconPlaceholder,
    increment: 0.03,
    maximum: 0.66,
    name: "Stability",
    requiredSkill: SkillType.Shields,
  },
  [MasteryType.StaggerDuration]: {
    base: 1200,
    description: "Affects stagger duration. Trains when inflicting stagger.",
    Icon: IconPlaceholder,
    increment: 100,
    maximum: 3500,
    name: "Might",
    requiredSkill: SkillType.Stagger,
  },
  [MasteryType.Tenacity]: {
    base: 0,
    description: "Chance to skip recovery when struck. Trains when struck.",
    Icon: IconPlaceholder,
    increment: 0.02,
    maximum: 0.9,
    name: "Tenacity",
    requiredSkill: SkillType.Armors,
  },
} as const;

export const MASTERIES_ORDER = [
  MasteryType.StaggerDuration,
  MasteryType.ParryFactor,
  MasteryType.BleedDamage,
  MasteryType.Tenacity,
  MasteryType.Stability,
] as const;

export const MASTERY_DELTA_TYPE: Readonly<Record<MasteryType, DeltaType>> = {
  [MasteryType.BleedDamage]: DeltaType.MasteryBleed,
  [MasteryType.ParryFactor]: DeltaType.MasteryParry,
  [MasteryType.Stability]: DeltaType.Stability,
  [MasteryType.StaggerDuration]: DeltaType.MasteryStagger,
  [MasteryType.Tenacity]: DeltaType.Tenacity,
} as const;
