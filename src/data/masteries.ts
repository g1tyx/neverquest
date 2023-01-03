// TODO - diversify icons.
import { ReactComponent as Icon } from "@neverquest/icons/abstract-049.svg";
import { AttributeOrMastery } from "@neverquest/types";
import { MasteryType, SkillType } from "@neverquest/types/enums";

export const MASTERIES: Record<MasteryType, AttributeOrMastery> = {
  [MasteryType.BleedDamage]: {
    base: 0.1,
    description: "Affects bleed damage. Trains when inflicting bleed.",
    Icon,
    increment: 0.04,
    name: "Cruelty",
    requiredSkill: SkillType.Bleed,
  },
  [MasteryType.ParryDamage]: {
    base: 0,
    description: "Affects damage absorbed and reflected when parrying. Trains when parrying.",
    Icon,
    increment: 0.02,
    name: "Finesse",
    requiredSkill: SkillType.Parry,
  },
  [MasteryType.StaggerDuration]: {
    base: 1200,
    description: "Affects stagger duration. Trains when inflicting stagger.",
    Icon,
    increment: 100,
    name: "Might",
    requiredSkill: SkillType.Stagger,
  },
};

export const MASTERIES_ORDER = [
  MasteryType.StaggerDuration,
  MasteryType.ParryDamage,
  MasteryType.BleedDamage,
];