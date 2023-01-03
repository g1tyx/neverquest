// TODO - diversify icons.
import { ReactComponent as Icon } from "@neverquest/icons/abstract-049.svg";
import { AttributeOrMastery } from "@neverquest/types";
import { AttributeType, SkillType } from "@neverquest/types/enums";

export const ATTRIBUTES: Record<AttributeType, AttributeOrMastery> = {
  [AttributeType.AttackRate]: {
    base: 0,
    description: "Reduces attack rate.",
    Icon,
    increment: 0.05,
    maximum: 0.9,
    name: "Speed",
  },
  [AttributeType.CriticalChance]: {
    base: 0,
    description: "Increases critical strike chance.",
    Icon,
    increment: 0.03,
    maximum: 0.6,
    name: "Dexterity",
    requiredSkill: SkillType.Criticals,
  },
  [AttributeType.CriticalDamage]: {
    base: 1.5,
    description: "Increases critical strike damage.",
    Icon,
    increment: 0.15,
    name: "Perception",
    requiredSkill: SkillType.Criticals,
  },
  [AttributeType.Damage]: {
    base: 0,
    description: "Increases base attack damage.",
    Icon,
    increment: 1,
    name: "Strength",
  },
  [AttributeType.DodgeChance]: {
    base: 0,
    description: "Increases chance to dodge an attack.",
    Icon,
    increment: 0.04,
    maximum: 0.8,
    name: "Agility",
    requiredSkill: SkillType.Dodge,
  },
  [AttributeType.Health]: {
    base: 12,
    description: "Increases maximum health.",
    Icon,
    increment: 4,
    name: "Vitality",
  },
  [AttributeType.HealthRegenerationRate]: {
    base: 6500,
    description: "Increases health regeneration rate.",
    Icon,
    increment: -200,
    maximum: 1000,
    name: "Vigor",
    requiredSkill: SkillType.Regeneration,
  },
  [AttributeType.Loot]: {
    base: 0,
    description: "Increases amount of loot dropped by monsters.",
    Icon,
    increment: 0.03,
    name: "Luck",
  },
  [AttributeType.RecoveryRate]: {
    base: 1500,
    description: "Reduces recovery rate.",
    Icon,
    increment: -150,
    maximum: 100,
    name: "Resilience",
  },
  [AttributeType.Stamina]: {
    base: 4,
    description: "Increases maximum stamina.",
    Icon,
    increment: 2,
    name: "Endurance",
  },
  [AttributeType.StaminaRegenerationRate]: {
    base: 5500,
    description: "Increases stamina regeneration rate.",
    Icon,
    increment: -150,
    maximum: 500,
    name: "Fortitude",
    requiredSkill: SkillType.Regeneration,
  },
};

export const ATTRIBUTES_ORDER = [
  AttributeType.Health,
  AttributeType.Stamina,
  AttributeType.Damage,
  AttributeType.AttackRate,
  AttributeType.RecoveryRate,
  AttributeType.HealthRegenerationRate,
  AttributeType.StaminaRegenerationRate,
  AttributeType.CriticalChance,
  AttributeType.CriticalDamage,
  AttributeType.DodgeChance,
  AttributeType.Loot,
];

export const ATTRIBUTES_INITIAL = [
  AttributeType.AttackRate,
  AttributeType.Damage,
  AttributeType.Health,
  AttributeType.RecoveryRate,
];