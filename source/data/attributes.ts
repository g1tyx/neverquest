import { RESERVES } from "@neverquest/data/reserves";
import IconAgility from "@neverquest/icons/agility.svg?react";
import IconDexterity from "@neverquest/icons/dexterity.svg?react";
import IconEndurance from "@neverquest/icons/endurance.svg?react";
import IconFortitude from "@neverquest/icons/fortitude.svg?react";
import IconPerception from "@neverquest/icons/perception.svg?react";
import IconSpeed from "@neverquest/icons/speed.svg?react";
import IconStrength from "@neverquest/icons/strength.svg?react";
import IconVigor from "@neverquest/icons/vigor.svg?react";
import IconVitality from "@neverquest/icons/vitality.svg?react";
import type { AttributeOrMasteryBaseData } from "@neverquest/types";
import type { Attribute, Showing, Skill } from "@neverquest/types/unions";

export const ATTRIBUTE_COST_BASE = 2;

export const ATTRIBUTES: Record<
  Attribute,
  AttributeOrMasteryBaseData & {
    maximum?: number;
    powerBonus: number;
    requiredSkill?: Skill;
    shows?: Showing;
  }
> = {
  agility: {
    base: 0.03,
    description: "Increases chance to dodge an attack.",
    Icon: IconAgility,
    increment: 0.02,
    maximum: 0.8,
    powerBonus: 0.005,
    requiredSkill: "evasion",
  },
  dexterity: {
    base: 0.03,
    description: "Increases critical strike chance.",
    Icon: IconDexterity,
    increment: 0.0066,
    maximum: 0.5,
    powerBonus: 0.0025,
    requiredSkill: "assassination",
  },
  endurance: {
    base: RESERVES.stamina.baseAmount,
    description: "Increases maximum stamina.",
    Icon: IconEndurance,
    increment: 15,
    powerBonus: 0.02,
    shows: "stamina",
  },
  fortitude: {
    base: 0,
    description: "Increases health & stamina regeneration amount.",
    Icon: IconFortitude,
    increment: 2,
    maximum: 120,
    powerBonus: 0.01,
    requiredSkill: "calisthenics",
  },
  perception: {
    base: 1.2,
    description: "Increases critical strike damage.",
    Icon: IconPerception,
    increment: 0.03,
    maximum: 2.5,
    powerBonus: 0.0005,
    requiredSkill: "assassination",
  },
  speed: {
    base: 0,
    description: "Reduces attack rate.",
    Icon: IconSpeed,
    increment: 0.01,
    maximum: 0.75,
    powerBonus: 0.001,
    shows: "attackRate",
  },
  strength: {
    base: 0,
    description: "Increases damage.",
    Icon: IconStrength,
    increment: 3,
    powerBonus: 0.01,
    shows: "damage",
  },
  vigor: {
    base: 0,
    description: "Reduces health & stamina regeneration rate.",
    Icon: IconVigor,
    increment: 0.01,
    maximum: 0.85,
    powerBonus: 0.002,
    requiredSkill: "calisthenics",
  },
  vitality: {
    base: RESERVES.health.baseAmount,
    description: "Increases maximum health.",
    Icon: IconVitality,
    increment: 20,
    powerBonus: 0.01,
    shows: "health",
  },
};
