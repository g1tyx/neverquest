import { Armor, Jewelry, Shield, Weapon, WeaponType } from "neverquest/env.d";

export const NO_ARMOR: Armor = {
  name: "Skin",
  value: 0,
};

export const NO_JEWELRY: Jewelry = {
  name: "None",
};

export const NO_SHIELD: Shield = {
  block: 0,
  name: "None",
  stagger: 0,
  value: 0,
};

export const NO_WEAPON: Weapon = {
  damage: { minimum: 1, maximum: 2 },
  name: "Hands",
  rate: 3000,
  staminaCost: 1,
  type: WeaponType.Light,
};

export const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export const WEAPON_SPECIFICATIONS = {
  [WeaponType.Light]: {
    damageModifier: 1.25,
    rateRange: { minimum: 2900, maximum: 3500 },
    staminaCost: 1,
    type: "Light",
  },
  [WeaponType.Balanced]: {
    damageModifier: 2,
    rateRange: { minimum: 3200, maximum: 4000 },
    staminaCost: 2,
    type: "Balanced",
  },
  [WeaponType.Heavy]: {
    damageModifier: 3,
    rateRange: { minimum: 3900, maximum: 5000 },
    staminaCost: 3,
    type: "Heavy",
  },
  [WeaponType.TwoHanded]: {
    damageModifier: 4,
    rateRange: { minimum: 4000, maximum: 6000 },
    staminaCost: 4,
    type: "Two-handed",
  },
};