import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isRecovering } from "@neverquest/state/character";
import {
  regenerationAmount,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import type { Reserve } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export function RegenerationMeter({ reserve }: { reserve: Reserve }) {
  const isHealth = reserve === "health";

  const regenerationAmountValue = useRecoilValue(regenerationAmount(reserve));
  const regenerationDurationValue = useRecoilValue(regenerationDuration(reserve));
  const regenerationRateValue = useRecoilValue(regenerationRate(reserve));
  const isRecoveringValue = useRecoilValue(isRecovering);

  const { label } = RESERVES[reserve];
  const ReserveIcon = isHealth ? IconHealth : IconStamina;
  const regenerationProgress =
    regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue;

  const details = (() => {
    if (isRecoveringValue) {
      return "Recovering ...";
    }

    if (regenerationProgress === 0) {
      return (
        <Stack>
          {`${label} regeneration`}

          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={ReserveIcon} size="small" />

            {`${regenerationAmountValue} per ${formatValue({
              format: "time",
              value: regenerationRateValue,
            })}`}
          </Stack>
        </Stack>
      );
    }

    return (
      <Stack>
        {`Regenerating ${reserve}`}

        <Stack direction="horizontal" gap={1}>
          <IconImage Icon={ReserveIcon} size="small" />

          {`${regenerationAmountValue} in ${formatValue({
            format: "time",
            value: regenerationRateValue - regenerationProgress,
          })}`}
        </Stack>
      </Stack>
    );
  })();

  return (
    <LabelledProgressBar
      attached="above"
      disableTransitions
      label={details}
      size="small"
      value={(regenerationProgress / regenerationRateValue) * 100}
      variant="secondary"
    />
  );
}
