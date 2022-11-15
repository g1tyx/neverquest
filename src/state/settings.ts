import { atom } from "recoil";

import localStorage from "@neverquest/state/effects/localStorage";
import { StorageKey } from "@neverquest/types/enums";

// ATOMS

export const autoEquip = atom({
  default: true,
  effects: [localStorage<boolean>(StorageKey.AutoEquip, true)],
  key: StorageKey.AutoEquip,
});

// TODO - move.
export const isGameOver = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsGameOver)],
  key: StorageKey.IsGameOver,
});

export const isNSFW = atom({
  default: true,
  effects: [localStorage<boolean>(StorageKey.IsNSFW, true)],
  key: StorageKey.IsNSFW,
});

export const isShowingDamagePerSecond = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsShowingDamagePerSecond, true)],
  key: StorageKey.IsShowingDamagePerSecond,
});

export const lowHealthWarning = atom({
  default: true,
  effects: [localStorage<boolean>(StorageKey.LowHealthWarning, true)],
  key: StorageKey.LowHealthWarning,
});
