import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { OCCULTIST_PURGE_PRICE_MULTIPLIER } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_NO_ESSENCE,
  LABEL_UNKNOWN,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetCompletedQuests } from "@neverquest/hooks/actions/useResetCompletedQuests";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconPurgeMemories from "@neverquest/icons/purge-memories.svg?react";
import IconUnknown from "@neverquest/icons/unknown.svg?react";
import { canTrackQuests, completedQuestsCount } from "@neverquest/state/quests";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PurgeMemories() {
  const allCompletedQuestsCount =
    useRecoilValue(completedQuestsCount("conquest")) +
    useRecoilValue(completedQuestsCount("routine")) +
    useRecoilValue(completedQuestsCount("triumph"));
  const canTrackQuestsValue = useRecoilValue(canTrackQuests);
  const essenceValue = useRecoilValue(essence);

  const progressQuest = useProgressQuest();
  const resetCompletedQuests = useResetCompletedQuests();
  const transactEssence = useTransactEssence();

  const hasCompletedQuests = allCompletedQuestsCount > 0;
  const price = Math.round(allCompletedQuestsCount * OCCULTIST_PURGE_PRICE_MULTIPLIER.quests);
  const isAffordable = price <= essenceValue;
  const isPurchasable = hasCompletedQuests && isAffordable;

  if (canTrackQuestsValue) {
    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          description="Resets the bonus of all completed quests, allowing for new choices."
          Icon={IconPurgeMemories}
          tooltip="Ritual"
        >
          Purge memories
        </IconDisplay>

        <Stack className="ms-2" direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            {formatNumber({ value: price })}
          </IconDisplay>

          <OverlayTrigger
            overlay={
              <Tooltip>
                {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}

                {!hasCompletedQuests && <div>No completed quests to purge.</div>}
              </Tooltip>
            }
            trigger={isPurchasable ? [] : POPOVER_TRIGGER}
          >
            <div>
              <Button
                disabled={!isPurchasable}
                onClick={() => {
                  transactEssence(-price);
                  resetCompletedQuests();
                  progressQuest({ quest: "purgingEssence" });
                }}
                variant="outline-dark"
              >
                Purge
              </Button>
            </div>
          </OverlayTrigger>
        </Stack>
      </div>
    );
  }

  return (
    <IconDisplay
      description="Requires a certain relic and deeper knowledge."
      Icon={IconUnknown}
      tooltip="Ritual"
    >
      <span>{LABEL_UNKNOWN}</span>
    </IconDisplay>
  );
}
