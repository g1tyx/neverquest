import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconBleedChance from "@neverquest/icons/bleed-chance.svg?react";
import IconBleedRating from "@neverquest/icons/bleed-rating.svg?react";
import IconBleeding from "@neverquest/icons/bleeding.svg?react";
import IconCruelty from "@neverquest/icons/cruelty.svg?react";
import { bleed, bleedChance } from "@neverquest/state/ailments";
import { weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { bleedRating, damage } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass, getWeaponIcon } from "@neverquest/utilities/getters";

export function BleedRating() {
  const { duration } = useRecoilValue(bleed);
  const bleedChanceValue = useRecoilValue(bleedChance);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const damageValue = useRecoilValue(damage);
  const masteryStatisticCruelty = useRecoilValue(masteryStatistic("cruelty"));
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    delta: "bleedRating",
    state: bleedRating,
  });

  if (bleedRatingValue > 0) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconBleedRating}
        tooltip="Bleed rating"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <IconDisplay
                          Icon={getWeaponIcon(weaponValue)}
                          iconProps={{ className: "small" }}
                        >
                          <span>Chance:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <IconDisplay Icon={IconBleedChance} iconProps={{ className: "small" }}>
                          {bleedChanceValue === 0
                            ? LABEL_EMPTY
                            : formatNumber({ format: "percentage", value: bleedChanceValue })}
                        </IconDisplay>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <IconDisplay Icon={IconCruelty} iconProps={{ className: "small" }}>
                          <span>Cruelty:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <span>
                          {formatNumber({
                            format: "percentage",
                            value: masteryStatisticCruelty,
                          })}
                          &nbsp;of total damage
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <span>Bleed damage:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconBleeding} iconProps={{ className: "small" }}>
                          <span>
                            {formatNumber({
                              value: damageValue * masteryStatisticCruelty,
                            })}
                            &nbsp;over&nbsp;
                            {formatNumber({
                              decimals: 0,
                              format: "time",
                              value: duration,
                            })}
                          </span>
                        </IconDisplay>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{formatNumber({ value: bleedRatingValue })}</span>
          </OverlayTrigger>

          <DeltasDisplay delta="bleedRating" />
        </Stack>
      </IconDisplay>
    );
  }
}
