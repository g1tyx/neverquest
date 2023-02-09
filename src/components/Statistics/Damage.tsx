import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";
import { damage, damagePerSecond, damageTotal } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType } from "@neverquest/types/enums";

export function Damage() {
  const damageValue = useRecoilValue(damage);
  const damageTotalValue = useRecoilValue(damageTotal);
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const isShowingDamageDetails = useRecoilValue(isShowing(ShowingType.DamageDetails));
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const weaponValue = useRecoilValue(weapon);

  const { name } = ATTRIBUTES[AttributeType.Damage];

  useDeltaText({
    atomDelta: deltas(DeltaType.Damage),
    atomValue: damageTotal,
  });

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header>Damage details</Popover.Header>

                <Popover.Body>
                  <Table borderless size="sm">
                    <tbody>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Per attack:</td>

                        <td>{damageTotalValue}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                        <td>{weaponValue.damage}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

                        <td>{`+${damageValue}`}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Popover.Body>
              </Popover>
            }
            placement="top"
            trigger={isShowingDamageDetails ? ["hover", "focus"] : []}
          >
            <span>{damageValue}</span>
          </OverlayTrigger>

          <FloatingText type={DeltaType.Damage} />
        </>
      }
      description={isShowingDamagePerSecondValue ? `${damagePerSecondValue} DPS` : null}
      Icon={Icon}
      tooltip="Damage"
    />
  );
}
