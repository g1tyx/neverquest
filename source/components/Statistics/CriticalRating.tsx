import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY, LABEL_SEPARATOR } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react";
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react";
import IconCriticalRating from "@neverquest/icons/critical-rating.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconDexterity from "@neverquest/icons/dexterity.svg?react";
import IconPerception from "@neverquest/icons/perception.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { isSkillAcquired } from "@neverquest/state/skills";
import { criticalRating, criticalStrike } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function CriticalRating() {
  const attributePowerBonusDexterity = useRecoilValue(attributePowerBonus("dexterity"));
  const attributePowerBonusPerception = useRecoilValue(attributePowerBonus("perception"));
  const attributeStatisticDexterity = useRecoilValue(attributeStatistic("dexterity"));
  const attributeStatisticPerception = useRecoilValue(attributeStatistic("perception"));
  const criticalRatingValue = useRecoilValue(criticalRating);
  const criticalStrikeValue = useRecoilValue(criticalStrike);
  const isShowingCriticalRating = useRecoilValue(isShowing("criticalRating"));
  const assassinationValue = useRecoilValue(isSkillAcquired("assassination"));

  useDeltaText({
    delta: "criticalRating",
    state: criticalRating,
    stop: () => !assassinationValue,
  });

  if (isShowingCriticalRating) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconCriticalRating}
        tooltip="Critical rating"
      >
        <Stack direction="horizontal" gap={1}>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">
                  <span>Critical rating details</span>
                </PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconDisplay Icon={IconDexterity} iconProps={{ className: "small" }}>
                          <span>Dexterity:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconDisplay Icon={IconCriticalChance} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                format: "percentage",
                                value: attributeStatisticDexterity,
                              })}
                              &nbsp;chance
                            </span>
                          </IconDisplay>

                          {attributePowerBonusDexterity > 0 && (
                            <>
                              {LABEL_SEPARATOR}

                              <IconDisplay
                                Icon={IconTomeOfPower}
                                iconProps={{ className: "small" }}
                              >
                                <span>
                                  {formatNumber({
                                    format: "multiplier",
                                    value: attributePowerBonusDexterity,
                                  })}
                                </span>
                              </IconDisplay>
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconDisplay Icon={IconPerception} iconProps={{ className: "small" }}>
                          <span>Perception:</span>
                        </IconDisplay>
                      </td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconDisplay Icon={IconCriticalDamage} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                decimals: 0,
                                format: "percentage",
                                value: attributeStatisticPerception,
                              })}
                              &nbsp;damage
                            </span>
                          </IconDisplay>

                          {attributePowerBonusPerception > 0 && (
                            <>
                              {LABEL_SEPARATOR}

                              <IconDisplay
                                Icon={IconTomeOfPower}
                                iconProps={{ className: "small" }}
                              >
                                <span>
                                  {formatNumber({
                                    format: "multiplier",
                                    value: attributePowerBonusPerception,
                                  })}
                                </span>
                              </IconDisplay>
                            </>
                          )}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <span>Critical strike damage:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconDamage} iconProps={{ className: "small" }}>
                          <span>{formatNumber({ value: criticalStrikeValue })}</span>
                        </IconDisplay>
                      </td>
                    </tr>
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            trigger={assassinationValue ? ["focus", "hover"] : []}
          >
            <span>
              {assassinationValue ? formatNumber({ value: criticalRatingValue }) : LABEL_EMPTY}
            </span>
          </OverlayTrigger>

          <DeltasDisplay delta="criticalRating" />
        </Stack>
      </IconDisplay>
    );
  }
}
