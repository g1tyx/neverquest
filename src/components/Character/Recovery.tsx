import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { RecoveryMeter } from "@neverquest/components/Character/RecoveryMeter";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/internal";
import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconRecovery } from "@neverquest/icons/recovery.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { recoveryRate, tenacity } from "@neverquest/state/statistics";
import { AttributeType, DeltaText, DeltaType, ShowingType } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Recovery() {
  const isShowingRecovery = useRecoilValue(isShowing(ShowingType.Recovery));
  const tenacityValue = useRecoilValue(tenacity);
  const recoveryRateValue = useRecoilValue(recoveryRate);

  const deltaRecoveryRate = deltas(DeltaType.RecoveryRate);

  const { name } = ATTRIBUTES[AttributeType.RecoveryRate];
  const showRecoveryRate = recoveryRateValue !== RECOVERY_RATE;
  const showTenacity = tenacityValue > 0;

  useDeltaText({
    atomDelta: deltaRecoveryRate,
    atomValue: recoveryRate,
    type: DeltaText.Time,
  });

  if (!isShowingRecovery) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header className="text-center">Recovery details</Popover.Header>

              <Popover.Body>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Base rate:</td>

                    <td>{formatMilliseconds(RECOVERY_RATE)}</td>
                  </tr>

                  <tr>
                    {showRecoveryRate ? (
                      <>
                        <td className={CLASS_TABLE_CELL_ITALIC}>{name} attribute:</td>

                        <td>{`-${formatPercentage(1 - recoveryRateValue / RECOVERY_RATE)}`}</td>
                      </>
                    ) : (
                      <td className="text-end">{LABEL_UNKNOWN}</td>
                    )}
                  </tr>

                  <tr>
                    {showTenacity ? (
                      <>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Chance to skip recovery:</td>

                        <td>{formatPercentage(tenacityValue)}</td>
                      </>
                    ) : (
                      <td className="text-end">{LABEL_UNKNOWN}</td>
                    )}
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
          trigger={showRecoveryRate || showTenacity ? ["hover", "focus"] : []}
        >
          <Stack className="w-100" direction="horizontal">
            <RecoveryMeter />

            <FloatingText type={DeltaType.RecoveryRate} />
          </Stack>
        </OverlayTrigger>
      }
      Icon={IconRecovery}
      isAnimated
      tooltip="Recovery rate"
    />
  );
}
