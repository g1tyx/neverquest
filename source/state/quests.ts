import { atom, atomFamily, selector, selectorFamily } from "recoil";

import {
  QUESTS,
  QUEST_COMPLETION_BONUS,
  QUEST_TYPES,
  QUEST_TYPES_BY_CLASS,
} from "@neverquest/data/quests";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { ownedItem } from "@neverquest/state/inventory";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { QuestNotification } from "@neverquest/types";
import {
  QUEST_BONUS_TYPES,
  type Quest,
  type QuestBonus,
  type QuestClass,
  type QuestStatus,
} from "@neverquest/types/unions";
import { getQuestsData } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const activeQuests = withStateKey("activeQuests", (key) =>
  selectorFamily({
    get:
      (quest: Quest) =>
      ({ get }) => {
        const questProgressValue = get(questProgress(quest));

        const quests = [];

        for (const questData of getQuestsData(quest)) {
          quests.push(questData);

          if (questData.progressionMaximum > questProgressValue) {
            break;
          }
        }

        return quests;
      },
    key,
  }),
);

export const canCompleteQuests = withStateKey("canCompleteQuests", (key) =>
  selectorFamily({
    get:
      (questClass: QuestClass) =>
      ({ get }) => {
        if (!get(canTrackQuests)) {
          return false;
        }

        let currentCanCompleteQuests = false;

        for (const quest of QUEST_TYPES_BY_CLASS[questClass]) {
          currentCanCompleteQuests ||= Object.values(get(questStatuses(quest))).includes(
            "achieved",
          );
        }

        return currentCanCompleteQuests;
      },
    key,
  }),
);

export const canTrackQuests = withStateKey("canTrackQuests", (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired("memetics")) &&
      get(ownedItem("journal")) !== undefined &&
      get(questStatuses("decipheringJournal"))[0] !== "incomplete",
    key,
  }),
);

export const completedQuestsCount = withStateKey("completedQuestsCount", (key) =>
  selectorFamily({
    get:
      (questClass: QuestClass) =>
      ({ get }) => {
        const questBonusTypes = new Set<string>(QUEST_BONUS_TYPES);

        return QUEST_TYPES_BY_CLASS[questClass].reduce(
          (sum, quest) =>
            sum +
            Object.values(get(questStatuses(quest))).filter((status) => questBonusTypes.has(status))
              .length,
          0,
        );
      },
    key,
  }),
);

export const questsBonus = withStateKey("questsBonus", (key) =>
  selectorFamily({
    get:
      (questBonus: QuestBonus) =>
      ({ get }) =>
        get(canTrackQuests)
          ? QUEST_TYPES.reduce(
              (sum, quest) =>
                sum +
                Object.values(get(questStatuses(quest))).filter((status) => questBonus === status)
                  .length,
              0,
            ) * QUEST_COMPLETION_BONUS
          : 0,
    key,
  }),
);

// ATOMS

export const questNotifications = withStateKey("questNotifications", (key) =>
  atom<QuestNotification[]>({
    default: [],
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const questProgress = withStateKey("questProgress", (key) =>
  atomFamily<number, Quest>({
    default: 0,
    effects: (quest) => [handleLocalStorage({ key, parameter: quest })],
    key,
  }),
);

export const questStatuses = withStateKey("questStatuses", (key) =>
  atomFamily<QuestStatus[], Quest>({
    default: (quest) => Object.keys(QUESTS[quest].progression).map(() => "incomplete"),
    effects: (quest) => [handleLocalStorage({ key, parameter: quest })],
    key,
  }),
);
