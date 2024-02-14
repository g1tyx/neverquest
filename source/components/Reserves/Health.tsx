import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { ReserveMeter } from "@neverquest/components/Reserves/ReserveMeter";
import { LABEL_SEPARATOR, POPOVER_TRIGGER } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useTimer } from "@neverquest/hooks/useTimer";
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconProtected from "@neverquest/icons/protected.svg?react";
import IconQuests from "@neverquest/icons/quests.svg?react";
import IconVitality from "@neverquest/icons/vitality.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isRelicEquipped } from "@neverquest/state/items";
import { questsBonus } from "@neverquest/state/quests";
import { isPoisoned, poisonDuration } from "@neverquest/state/reserves";
import { isShowing } from "@neverquest/state/ui";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Health() {
  const attributePowerBonusVitality = useRecoilValue(attributePowerBonus("vitality"));
  const attributeStatisticVitality = useRecoilValue(attributeStatistic("vitality"));
  const isDreamCatcherEquipped = useRecoilValue(isRelicEquipped("dream catcher"));
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const isShowingHealth = useRecoilValue(isShowing("health"));
  const questsBonusHealth = useRecoilValue(questsBonus("healthBonus"));
  const setPoison = useSetRecoilState(poisonDuration);

  const { baseAmount } = RESERVES.health;
  const vitalityBonus = attributeStatisticVitality - baseAmount;

  useTimer({
    setTick: setPoison,
    stop: !isPoisonedValue,
  });

  if (isShowingHealth) {
    return (
      <IconDisplay
        className={getAnimationClass({ animation: "flipInX" })}
        Icon={IconHealth}
        tooltip="Health"
      >
        <Stack>
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverBody>
                  <DetailsTable>
                    <tr>
                      <td>
                        <span>Base:</span>
                      </td>

                      <td>
                        <IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
                          <span>{baseAmount}</span>
                        </IconDisplay>
                      </td>
                    </tr>

                    {vitalityBonus > 0 && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconVitality} iconProps={{ className: "small" }}>
                            <span>Vitality:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <Stack direction="horizontal" gap={1}>
                            <IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
                              <span>
                                +
                                {formatNumber({
                                  value: vitalityBonus,
                                })}
                              </span>
                            </IconDisplay>

                            {attributePowerBonusVitality > 0 && (
                              <>
                                {LABEL_SEPARATOR}

                                <IconDisplay
                                  Icon={IconEldritchCodex}
                                  iconProps={{ className: "small" }}
                                >
                                  <span>
                                    {formatNumber({
                                      format: "multiplier",
                                      value: attributePowerBonusVitality,
                                    })}
                                  </span>
                                </IconDisplay>
                              </>
                            )}
                          </Stack>
                        </td>
                      </tr>
                    )}

                    {questsBonusHealth > 0 && (
                      <tr>
                        <td>
                          <IconDisplay Icon={IconQuests} iconProps={{ className: "small" }}>
                            <span>Quest bonus:</span>
                          </IconDisplay>
                        </td>

                        <td>
                          <IconDisplay Icon={IconHealth} iconProps={{ className: "small" }}>
                            <span>
                              +
                              {formatNumber({
                                decimals: 0,
                                format: "percentage",
                                value: questsBonusHealth,
                              })}
                            </span>
                          </IconDisplay>
                        </td>
                      </tr>
                    )}
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
            placement="right"
            trigger={
              attributePowerBonusVitality > 0 || questsBonusHealth > 0 || vitalityBonus > 0
                ? POPOVER_TRIGGER
                : []
            }
          >
            <div className="w-100">
              <ReserveMeter
                PrefixIcon={isDreamCatcherEquipped ? IconProtected : undefined}
                reserve="health"
              />
            </div>
          </OverlayTrigger>

          <Regeneration reserve="health" />
        </Stack>
      </IconDisplay>
    );
  }
}
