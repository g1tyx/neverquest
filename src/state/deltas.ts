import { atom, atomFamily } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/data/internal";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Delta } from "@neverquest/types/enums";
import type { DeltaDisplay, FloatingText } from "@neverquest/types/ui";

// ATOMS

export const deltas = withStateKey("deltas", (key) =>
  atomFamily<DeltaDisplay, Delta>({
    default: DEFAULT_DELTA_DISPLAY,
    effects: (parameter) => [handleLocalStorage<DeltaDisplay>({ key, parameter })],
    key,
  })
);

export const floatingTextQueues = withStateKey("floatingTextQueues", (key) =>
  atomFamily<FloatingText[], Delta>({
    default: [],
    effects: (parameter) => [handleLocalStorage<FloatingText[]>({ key, parameter })],
    key,
  })
);

export const monsterBleedingDelta = withStateKey("monsterBleedingDelta", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const poisonedDelta = withStateKey("poisonedDelta", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);
