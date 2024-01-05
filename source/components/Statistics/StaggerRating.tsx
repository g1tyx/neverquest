import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconStability from "@neverquest/icons/stability.svg?react";
import IconStaggerRating from "@neverquest/icons/stagger-rating.svg?react";
import IconStagger from "@neverquest/icons/stagger.svg?react";
import { shield } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { staggerRating } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function StaggerRating() {
  const stabilityValue = useRecoilValue(masteryStatistic("stability"));
  const { stagger } = useRecoilValue(shield);
  const staggerRatingValue = useRecoilValue(staggerRating);

  useDeltaText({
    delta: "staggerRating",
    state: staggerRating,
    stop: () => staggerRatingValue === 0,
  });

  if (staggerRatingValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconStaggerRating}
        tooltip="Stagger rating"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <span>Chance:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconStagger} iconProps={{ className: "small" }}>
                          <span>{formatNumber({ format: "percentage", value: stagger })}</span>
                        </IconDisplay>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <IconDisplay Icon={IconStability} iconProps={{ className: "small" }}>
                          <span>Stability:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <span>
                          {formatNumber({
                            format: "time",
                            value: stabilityValue,
                          })}
                          &nbsp;duration
                        </span>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{formatNumber({ value: staggerRatingValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="staggerRating" />
        </Stack>
      </IconDisplay>
    );
  }
}
