import { WeaponType } from "locra/env.d";
import { Armor, Accessory, Shield, Weapon, WeaponWeight } from "neverquest/env.d";

export const NO_ARMOR: Armor = {
  name: "Unarmored",
  price: 0,
  value: 0,
};

export const NO_ACCESSORY: Accessory = {
  name: "None",
  price: 0,
};

export const NO_SHIELD: Shield = {
  block: 0,
  name: "None",
  price: 0,
  stagger: 0,
  value: 0,
};

export const NO_WEAPON: Weapon = {
  damage: 1,
  name: "Unarmed",
  price: 0,
  rate: 3000,
  staminaCost: 1,
  type: WeaponType.Melee,
  weight: WeaponWeight.Light,
};

export const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const UNKNOWN = "???";

export const WEAPON_SPECIFICATIONS = {
  [WeaponWeight.Light]: {
    damageModifier: 1.25,
    rateRange: { minimum: 2900, maximum: 3500 },
    staminaCost: 2,
    weight: "Light",
  },
  [WeaponWeight.Balanced]: {
    damageModifier: 2,
    rateRange: { minimum: 3200, maximum: 4000 },
    staminaCost: 3,
    weight: "Balanced",
  },
  [WeaponWeight.Heavy]: {
    damageModifier: 3,
    rateRange: { minimum: 3900, maximum: 5000 },
    staminaCost: 4,
    weight: "Heavy",
  },
  [WeaponWeight.TwoHanded]: {
    damageModifier: 4,
    rateRange: { minimum: 4000, maximum: 6000 },
    staminaCost: 4,
    weight: "Two-handed",
  },
};
