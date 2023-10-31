import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconTabs } from "@neverquest/components/IconTabs";
import { QuestBonusDisplay } from "@neverquest/components/Quests/QuestBonusDisplay";
import { Quests } from "@neverquest/components/Quests/Quests";
import IconConquest from "@neverquest/icons/conquest.svg?react";
import IconRoutine from "@neverquest/icons/routine.svg?react";
import IconTriumph from "@neverquest/icons/triumph.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import { canCompleteQuests } from "@neverquest/state/quests";
import { QUEST_BONUS_TYPES } from "@neverquest/types/unions";

export function Journal() {
  const canCompleteConquests = useRecoilValue(canCompleteQuests("conquest"));
  const canCompleteRoutines = useRecoilValue(canCompleteQuests("routine"));
  const canCompleteTriumphs = useRecoilValue(canCompleteQuests("triumph"));
  const isShowingQuestBonus = useRecoilValue(isShowing("questBonus"));

  return (
    <Stack className="journal" gap={5}>
      {isShowingQuestBonus && (
        <Stack gap={3}>
          <h6>Completion bonus</h6>

          <Stack className="mx-auto" direction="horizontal" gap={5}>
            {QUEST_BONUS_TYPES.map((current) => (
              <QuestBonusDisplay bonus={current} key={current} />
            ))}
          </Stack>
        </Stack>
      )}

      <Stack className="overflow-y-hidden" gap={3}>
        {isShowingQuestBonus && <h6>Quests</h6>}

        <IconTabs
          tabs={[
            {
              Component: () => <Quests questClass="conquest" />,
              hasWarningBadge: canCompleteConquests,
              Icon: IconConquest,
              label: "conquests",
            },
            {
              Component: () => <Quests questClass="routine" />,
              hasWarningBadge: canCompleteRoutines,
              Icon: IconRoutine,
              label: "routines",
            },
            {
              Component: () => <Quests questClass="triumph" />,
              hasWarningBadge: canCompleteTriumphs,
              Icon: IconTriumph,
              label: "triumphs",
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
