import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { RegenerationMeter } from "@neverquest/components/Character/RegenerationMeter";
import { FloatingText } from "@neverquest/components/FloatingText";
import {
  CLASS_TABLE_CELL_ITALIC,
  REGENERATION_AMOUNT_HEALTH,
  REGENERATION_AMOUNT_STAMINA,
  REGENERATION_RATE_HEALTH,
  REGENERATION_RATE_STAMINA,
} from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { RESERVES } from "@neverquest/data/reserves";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { reserveRegenerationRate } from "@neverquest/state/statistics";
import { AttributeType, DeltaTextType, DeltaType, ReserveType } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Regeneration({ type }: { type: ReserveType.Health | ReserveType.Stamina }) {
  const { atomDeltaRegenerationRate, atomRegenerationAmount, atomRegenerationRate } =
    RESERVES[type];
  const isHealth = type === ReserveType.Health;

  const regenerationAmountValue = useRecoilValue(atomRegenerationAmount);
  const regenerationRateValue = useRecoilValue(atomRegenerationRate);
  const reserveRegenerationRateValue = useRecoilValue(reserveRegenerationRate);

  const { name: amountName } = ATTRIBUTES[AttributeType.ReserveRegenerationAmount];
  const { name: rateName } = ATTRIBUTES[AttributeType.ReserveRegenerationRate];
  const baseAmount = isHealth ? REGENERATION_AMOUNT_HEALTH : REGENERATION_AMOUNT_STAMINA;
  const baseRate = isHealth ? REGENERATION_RATE_HEALTH : REGENERATION_RATE_STAMINA;
  const showAmount = regenerationAmountValue - baseAmount > 0;
  const showRate = regenerationRateValue - baseRate > 0;
  const title = isHealth ? "Health" : "Stamina";

  useDeltaText({
    atomDelta: atomDeltaRegenerationRate,
    atomValue: atomRegenerationRate,
    type: DeltaTextType.Time,
  });

  return (
    <>
      <OverlayTrigger
        overlay={
          <Popover>
            <Popover.Header>{title} regeneration details</Popover.Header>

            <Popover.Body>
              <Table borderless size="sm">
                <tbody>
                  {showRate && (
                    <>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Current rate:</td>

                        <td>{formatMilliseconds(regenerationRateValue)}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Base rate:</td>

                        <td>{formatMilliseconds(baseRate)}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>{rateName} attribute:</td>

                        <td>{`-${formatPercentage(reserveRegenerationRateValue)}`}</td>
                      </tr>
                    </>
                  )}

                  {showAmount && (
                    <>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Total amount:</td>

                        <td>{regenerationAmountValue}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Base amount:</td>

                        <td>{baseAmount}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>{amountName} attribute:</td>

                        <td>{`+${regenerationAmountValue - baseAmount}`}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </Popover.Body>
          </Popover>
        }
        placement="right"
        trigger={showAmount || showRate ? ["hover", "focus"] : []}
      >
        <>
          <RegenerationMeter type={type} />
        </>
      </OverlayTrigger>

      <FloatingText
        type={
          ReserveType.Health ? DeltaType.HealthRegenerationRate : DeltaType.StaminaRegenerationRate
        }
      />
    </>
  );
}
