import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_MAXIMUM } from "@neverquest/data/general";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconPoison from "@neverquest/icons/poison.svg?react";
import { poisonChance } from "@neverquest/state/monster";
import { poisonLength, poisonMagnitude } from "@neverquest/state/reserves";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function MonsterPoisonRating() {
  const poisonChanceValue = useRecoilValue(poisonChance);
  const poisonLengthValue = useRecoilValue(poisonLength);
  const poisonMagnitudeValue = useRecoilValue(poisonMagnitude);

  if (poisonChanceValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconPoison}
        tooltip="Poison rating"
      >
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">
                <span>Poison rating details</span>
              </PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td>
                      <span>Chance:</span>
                    </td>

                    <td>
                      <span>
                        {formatNumber({ format: "percentage", value: poisonChanceValue })}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Effect:</span>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <span>
                          -
                          {formatNumber({
                            format: "percentage",
                            value: poisonMagnitudeValue,
                          })}
                        </span>

                        <IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
                          <span>{LABEL_MAXIMUM}</span>
                        </IconDisplay>
                      </Stack>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span>Duration:</span>
                    </td>

                    <td>
                      <span>{formatNumber({ format: "time", value: poisonLengthValue })}</span>
                    </td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
        >
          <span>
            {formatNumber({
              value: poisonChanceValue * poisonMagnitudeValue * poisonLengthValue,
            })}
          </span>
        </OverlayTrigger>
      </IconDisplay>
    );
  }
}
