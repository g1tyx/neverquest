import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import useDeltaText from "neverquest/hooks/useDeltaText";
import icon from "neverquest/icons/wolverine-claws.svg";
import { damage } from "neverquest/state/attributes";
import { deltaTotalDamage } from "neverquest/state/deltas";
import { weapon } from "neverquest/state/inventory";
import { showTotalDamageSummary } from "neverquest/state/show";
import { totalDamage } from "neverquest/state/statistics";
import { getComputedStat } from "neverquest/utilities/helpers";

export default function TotalDamage() {
  const damageValue = useRecoilValue(damage);
  const showTotalDamageBreakdownValue = useRecoilValue(showTotalDamageSummary);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  useDeltaText({
    deltaAtom: deltaTotalDamage,
    valueAtom: totalDamage,
  });

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total damage" />

      {showTotalDamageBreakdownValue ? (
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header as="h4">Damage breakdown</Popover.Header>

              <Popover.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className="text-end">Weapon:</td>

                      <td>{weaponValue.damage}</td>
                    </tr>

                    <tr>
                      <td>{`${damageValue.name} attribute:`}</td>

                      <td>{getComputedStat(damageValue)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>{totalDamageValue}</span>
        </OverlayTrigger>
      ) : (
        <span>{totalDamageValue}</span>
      )}

      <FloatingText atom={deltaTotalDamage} />
    </Stack>
  );
}