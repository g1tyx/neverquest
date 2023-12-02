import { atomFamily, selector } from "recoil";

import { SKILL_PRICE_BASE, SKILL_PRICE_FACTOR } from "@neverquest/data/skills";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { SKILL_TYPES, type Skill } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const acquiredSkills = withStateKey("acquiredSkills", (key) =>
  selector({
    get: ({ get }) => {
      const result = {} as Record<Skill, boolean>;

      for (const skill of SKILL_TYPES) {
        result[skill] = get(isSkillAcquired(skill));
      }

      return result;
    },
    key,
  }),
);

export const skillPrice = withStateKey("skillPrice", (key) =>
  selector({
    get: ({ get }) =>
      SKILL_PRICE_BASE *
      Math.pow(SKILL_PRICE_FACTOR, Object.values(get(acquiredSkills)).filter(Boolean).length),
    key,
  }),
);

// ATOMS

export const isSkillAcquired = withStateKey("isSkillAcquired", (key) =>
  atomFamily<boolean, Skill | "none">({
    default: false,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
