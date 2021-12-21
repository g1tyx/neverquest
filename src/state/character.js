import { atom, selector } from "recoil";

import { totalAttackRate, totalDamage } from "state/stats";

// ATOMS

export const characterLevel = atom({
  key: "characterLevel",
  default: 0,
});

export const damageDealt = atom({
  key: "damageDealt",
  default: 0,
});

export const damageTaken = atom({
  key: "damageTaken",
  default: 0,
});

export const experience = atom({
  key: "experience",
  default: 0,
});

export const isAttacking = atom({
  key: "isAttacking",
  default: false,
});

export const isRecovering = atom({
  key: "isRecovering",
  default: false,
});

export const name = atom({
  key: "name",
  default: "???",
});

// SELECTORS

export const attributesAvailable = selector({
  key: "attributesAvailable",
  get: ({ get }) => {
    const attributeCostValue = get(attributeCost);
    const characterLevelValue = get(characterLevel);
    const experienceValue = get(experience);
    const experienceSpentValue = get(experienceSpent);

    const availableExperience = experienceValue - experienceSpentValue;
    let availableAttributePoints = 0;
    let cumulativeCost = attributeCostValue;
    let potentialLevel = characterLevelValue + 1;

    // Alternatively: https://en.wikipedia.org/wiki/Triangular_number#Triangular_roots_and_tests_for_triangular_numbers
    while (cumulativeCost <= availableExperience) {
      availableAttributePoints += 1;
      cumulativeCost += 1 + potentialLevel;
      potentialLevel += 1;
    }

    return availableAttributePoints;
  },
});

export const attributeCost = selector({
  key: "attributeCost",
  get: ({ get }) => {
    const characterLevelValue = get(characterLevel);

    return 1 + characterLevelValue;
  },
});

export const damagePerSecond = selector({
  key: "damagePerSecond",
  get: ({ get }) => {
    const totalAttackRateValue = get(totalAttackRate);
    const { min, max } = get(totalDamage);

    return ((max + min) / 2 / (totalAttackRateValue / 1000)).toFixed(2);
  },
});

export const experienceSpent = selector({
  key: "experienceSpent",
  get: ({ get }) => {
    const characterLevelValue = get(characterLevel);

    // https://en.wikipedia.org/wiki/Triangular_number
    return (characterLevelValue * (characterLevelValue + 1)) / 2;
  },
});
