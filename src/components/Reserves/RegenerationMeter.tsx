import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isRecovering } from "@neverquest/state/character";
import {
  healthRegenerationAmount,
  healthRegenerationDuration,
  healthRegenerationRate,
  isHealthAtMaximum,
  isStaminaAtMaximum,
  staminaRegenerationAmount,
  staminaRegenerationDuration,
  staminaRegenerationRate,
} from "@neverquest/state/reserves";
import type { DeltaReserve } from "@neverquest/types/ui";
import type { Reserve } from "@neverquest/types/unions";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

const RESERVE_CHANGE: Record<Reserve, () => (change: DeltaReserve) => void> = {
  health: useChangeHealth,
  stamina: useChangeStamina,
};

export function RegenerationMeter({ type }: { type: Reserve }) {
  const isHealth = type === "health";
  const regenerationDuration = isHealth ? healthRegenerationDuration : staminaRegenerationDuration;

  const [regenerationDurationValue, setRegenerationDuration] = useRecoilState(regenerationDuration);
  const isReserveAtMaximum = useRecoilValue(isHealth ? isHealthAtMaximum : isStaminaAtMaximum);
  const regenerationAmountValue = useRecoilValue(
    isHealth ? healthRegenerationAmount : staminaRegenerationAmount,
  );
  const regenerationRateValue = useRecoilValue(
    isHealth ? healthRegenerationRate : staminaRegenerationRate,
  );
  const isRecoveringValue = useRecoilValue(isRecovering);
  const resetRegenerationDuration = useResetRecoilState(regenerationDuration);

  const changeReserve = RESERVE_CHANGE[type]();

  const { label } = RESERVES[type];
  const ReserveIcon = isHealth ? IconHealth : IconStamina;
  const regenerationProgress =
    regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue;

  useAnimation({
    callback: (delta) => {
      const value = regenerationDurationValue - delta;

      if (value <= 0) {
        changeReserve({ value: regenerationAmountValue });

        setRegenerationDuration(regenerationRateValue);
      } else {
        setRegenerationDuration(value);
      }
    },
    stop: isReserveAtMaximum || isRecoveringValue,
  });

  // Needed to catch attribute resets and poison/blight penalties.
  useEffect(() => {
    if (isReserveAtMaximum) {
      resetRegenerationDuration();
    }
  }, [isReserveAtMaximum, resetRegenerationDuration]);

  const details = (() => {
    if (isRecoveringValue) {
      return "Recovering ...";
    }

    if (regenerationProgress === 0) {
      return (
        <span>
          {`${label} regeneration`}
          <br />
          <IconImage Icon={ReserveIcon} size="tiny" />
          &nbsp;{`${regenerationAmountValue} per ${formatMilliseconds(regenerationRateValue)}`}
        </span>
      );
    }

    return (
      <span>
        {`Regenerating ${type}`}
        <br />
        <IconImage Icon={ReserveIcon} size="tiny" />
        &nbsp;
        {`${regenerationAmountValue} in ${formatMilliseconds(
          regenerationRateValue - regenerationProgress,
        )}`}
      </span>
    );
  })();

  return (
    <LabelledProgressBar
      attached="above"
      disableTransitions
      label={details}
      size="tiny"
      value={(regenerationProgress / regenerationRateValue) * 100}
      variant="secondary"
    />
  );
}
