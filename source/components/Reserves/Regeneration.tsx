import { useEffect } from "react";
import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { RegenerationMeter } from "@neverquest/components/Reserves/RegenerationMeter";
import { LABEL_SEPARATOR } from "@neverquest/data/general";
import { RESERVES } from "@neverquest/data/reserves";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconFortitude from "@neverquest/icons/fortitude.svg?react";
import IconRegenerationAmount from "@neverquest/icons/regeneration-amount.svg?react";
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import IconVigor from "@neverquest/icons/vigor.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { isRecovering } from "@neverquest/state/character";
import {
  isHealthAtMaximum,
  isRegenerating,
  isStaminaAtMaximum,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Reserve } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

const RESERVE_CHANGE = {
  health: useChangeHealth,
  stamina: useChangeStamina,
};

export function Regeneration({ reserve }: { reserve: Reserve }) {
  const attributeStatisticFortitudeState = attributeStatistic("fortitude");
  const regenerateRateState = regenerationRate(reserve);

  const attributePowerBonusFortitude = useRecoilValue(attributePowerBonus("fortitude"));
  const attributePowerBonusVigor = useRecoilValue(attributePowerBonus("vigor"));
  const attributeStatisticFortitude = useRecoilValue(attributeStatisticFortitudeState);
  const attributeStatisticVigor = useRecoilValue(attributeStatistic("vigor"));
  const isReserveAtMaximum = useRecoilValue(
    reserve === "health" ? isHealthAtMaximum : isStaminaAtMaximum,
  );
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isRegeneratingValue = useRecoilValue(isRegenerating(reserve));
  const isSkillAcquiredCalisthenics = useRecoilValue(isSkillAcquired("calisthenics"));
  const setRegenerationDuration = useSetRecoilState(regenerationDuration(reserve));
  const regenerationRateValue = useRecoilValue(regenerateRateState);

  const {
    baseRegenerationAmount,
    baseRegenerationRate,
    regenerationDeltaAmount,
    regenerationDeltaRate,
  } = RESERVES[reserve];

  const changeReserve = RESERVE_CHANGE[reserve]();

  useTimerDelta({
    delta: setRegenerationDuration,
    onDelta: () => {
      changeReserve({ isRegeneration: true });
    },
    stop: isRecoveringValue || isReserveAtMaximum,
  });

  useDeltaText({
    delta: regenerationDeltaAmount,
    state: attributeStatisticFortitudeState,
  });

  useDeltaText({
    delta: regenerationDeltaRate,
    format: "time",
    state: regenerateRateState,
    stop: ({ current, previous }) => (previous ?? 0) - current < 10,
  });

  useEffect(() => {
    if (!isReserveAtMaximum && !isRegeneratingValue) {
      setRegenerationDuration(regenerationRateValue);
    }
  }, [isRegeneratingValue, isReserveAtMaximum, regenerationRateValue, setRegenerationDuration]);

  return (
    <Stack direction="horizontal">
      <OverlayTrigger
        overlay={
          <Popover>
            <PopoverBody>
              <DetailsTable>
                <tr>
                  <td>
                    <span>Base rate:</span>
                  </td>

                  <td>
                    <IconDisplay Icon={IconRegenerationRate} iconProps={{ className: "small" }}>
                      <span>{formatNumber({ format: "time", value: baseRegenerationRate })}</span>
                    </IconDisplay>
                  </td>
                </tr>

                <tr>
                  <td>
                    <IconDisplay Icon={IconVigor} iconProps={{ className: "small" }}>
                      <span>Vigor:</span>
                    </IconDisplay>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <span>
                        -
                        {formatNumber({
                          format: "percentage",
                          value: attributeStatisticVigor,
                        })}
                      </span>

                      {attributePowerBonusVigor > 0 && (
                        <>
                          {LABEL_SEPARATOR}

                          <IconDisplay Icon={IconTomeOfPower} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                format: "multiplier",
                                value: attributePowerBonusVigor,
                              })}
                            </span>
                          </IconDisplay>
                        </>
                      )}
                    </Stack>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span>Base amount:</span>
                  </td>

                  <td>
                    <IconDisplay Icon={IconRegenerationAmount} iconProps={{ className: "small" }}>
                      <span>{baseRegenerationAmount}</span>
                    </IconDisplay>
                  </td>
                </tr>

                <tr>
                  <td>
                    <IconDisplay Icon={IconFortitude} iconProps={{ className: "small" }}>
                      <span>Fortitude:</span>
                    </IconDisplay>
                  </td>

                  <td>
                    <Stack direction="horizontal" gap={1}>
                      <span>+{attributeStatisticFortitude}</span>

                      {attributePowerBonusFortitude > 0 && (
                        <>
                          {LABEL_SEPARATOR}

                          <IconDisplay Icon={IconTomeOfPower} iconProps={{ className: "small" }}>
                            <span>
                              {formatNumber({
                                format: "multiplier",
                                value: attributePowerBonusFortitude,
                              })}
                            </span>
                          </IconDisplay>
                        </>
                      )}
                    </Stack>
                  </td>
                </tr>
              </DetailsTable>
            </PopoverBody>
          </Popover>
        }
        placement="right"
        trigger={isSkillAcquiredCalisthenics ? ["focus", "hover"] : []}
      >
        <div className="w-100">
          <RegenerationMeter reserve={reserve} />
        </div>
      </OverlayTrigger>

      <DeltasDisplay delta={regenerationDeltaAmount} />

      <DeltasDisplay delta={regenerationDeltaRate} />
    </Stack>
  );
}
