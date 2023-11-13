import type {
  Armor,
  ConsumableItem,
  GearItem,
  GemItem,
  GeneratorRange,
  InfusableItem,
  Melee,
  Ranged,
  Shield,
  StackableItem,
  TrinketItem,
  UsableItem,
  Weapon,
} from "@neverquest/types";
import {
  CONQUEST_TYPES,
  CONSUMABLE_TYPES,
  type Conquest,
  type Consumable,
  GEM_TYPES,
  GRIP_TYPES,
  type Gem,
  type Grip,
  INFUSABLE_TYPES,
  type Infusable,
  ROUTINE_TYPES,
  type Routine,
  TRINKET_TYPES,
  TRIUMPH_TYPES,
  type Trinket,
  type Triumph,
} from "@neverquest/types/unions";

export function isArmor(thing: unknown): thing is Armor {
  return isObject(thing) && typeof thing.protection === "number";
}

export function isConquest(thing: unknown): thing is Conquest {
  return typeof thing === "string" && CONQUEST_TYPES.includes(thing as Conquest);
}

export function isConsumableItem(thing: unknown): thing is ConsumableItem {
  return isObject(thing) && CONSUMABLE_TYPES.includes(thing.name as Consumable);
}

export function isGear(thing: unknown): thing is GearItem {
  return isObject(thing) && (isArmor(thing) || isShield(thing) || isWeapon(thing));
}

export function isGem(thing: unknown): thing is GemItem {
  return isObject(thing) && GEM_TYPES.includes(thing.name as Gem);
}

export function isGeneratorRange(thing: unknown): thing is GeneratorRange {
  return isObject(thing) && typeof thing.minimum === "number" && typeof thing.maximum === "number";
}

export function isGeneratorRanges(thing: unknown): thing is [GeneratorRange, GeneratorRange] {
  return Array.isArray(thing) && isGeneratorRange(thing[0]) && isGeneratorRange(thing[1]);
}

export function isInfusable(thing: unknown): thing is Infusable {
  return typeof thing === "string" && INFUSABLE_TYPES.includes(thing as Infusable);
}

export function isInfusableItem(thing: unknown): thing is InfusableItem {
  return isObject(thing) && isInfusable(thing.name);
}

function isObject(thing: unknown): thing is Record<string, unknown> {
  return typeof thing === "object" && thing !== null && Object.keys(thing).length > 0;
}

export function isMelee(thing: unknown): thing is Melee {
  return isObject(thing) && GRIP_TYPES.includes(thing.grip as Grip);
}

export function isRanged(thing: unknown): thing is Ranged {
  return isObject(thing) && typeof thing.range === "number";
}

export function isRoutine(thing: unknown): thing is Routine {
  return typeof thing === "string" && ROUTINE_TYPES.includes(thing as Routine);
}

export function isShield(thing: unknown): thing is Shield {
  return isObject(thing) && typeof thing.block === "number";
}

export function isStackable(thing: unknown): thing is StackableItem {
  return isConsumableItem(thing) || isGem(thing);
}

export function isTrinket(thing: unknown): thing is Trinket {
  return typeof thing === "string" && TRINKET_TYPES.includes(thing as Trinket);
}

export function isTrinketItem(thing: unknown): thing is TrinketItem {
  return isObject(thing) && isTrinket(thing.name);
}

export function isTriumph(thing: unknown): thing is Triumph {
  return typeof thing === "string" && TRIUMPH_TYPES.includes(thing as Triumph);
}

export function isUsable(thing: unknown): thing is UsableItem {
  return isInfusableItem(thing) || isTrinketItem(thing);
}

export function isWeapon(thing: unknown): thing is Weapon {
  return isMelee(thing) || isRanged(thing);
}
