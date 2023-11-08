import { atom, atomFamily, selector } from "recoil";

import { CREW_ORDER } from "@neverquest/data/caravan";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { BlacksmithInventory, MerchantInventoryItem, Weapon } from "@neverquest/types";
import type { Crew, CrewStatus } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const isCaravanHired = withStateKey("isCaravanHired", (key) =>
  selector({
    get: ({ get }) => CREW_ORDER.every((current) => get(hireStatus(current)).status === "hired"),
    key,
  }),
);

// ATOMS

export const activeCrew = withStateKey("activeCrew", (key) =>
  atom<Crew | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const blacksmithInventory = withStateKey("blacksmithInventory", (key) =>
  atom<BlacksmithInventory>({
    default: {
      armor: null,
      shield: null,
      weapon: null,
    },
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

// TODO - Must use { status } object instead of just CrewStatus, otherwise onSet() does not trigger in useInitializer().
export const hireStatus = withStateKey("hireStatus", (key) =>
  atomFamily<{ status: CrewStatus }, Crew>({
    default: { status: null },
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const fletcherInventory = withStateKey("fletcherInventory", (key) =>
  atom<Weapon | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const merchantInventory = withStateKey("merchantInventory", (key) =>
  atom<MerchantInventoryItem[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
