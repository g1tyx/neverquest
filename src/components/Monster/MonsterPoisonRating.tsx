import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC, POISON } from "@neverquest/constants";
import { ReactComponent as Icon } from "@neverquest/icons/death-juice.svg";
import { monsterDamage, monsterPoisonChance } from "@neverquest/state/monster";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";
import { getDamagePerTick } from "@neverquest/utilities/getters";

export default function () {
  const monsterPoisonChanceValue = useRecoilValue(monsterPoisonChance);
  const monsterDamageValue = useRecoilValue(monsterDamage);

  const { damage, duration, ticks } = POISON;
  const poisonPerTick = Math.round(
    getDamagePerTick({
      damage: monsterDamageValue,
      duration,
      proportion: damage,
      ticks,
    }) *
      monsterPoisonChanceValue *
      100
  );

  if (!monsterPoisonChanceValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header as="h4">Poison rating details</Popover.Header>

              <Popover.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Poison chance:</td>

                      <td>{formatPercentage(monsterPoisonChanceValue)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Poison damage:</td>

                      <td>{`${Math.ceil(damage * monsterDamageValue)} (${formatPercentage(
                        damage
                      )} of damage & ${poisonPerTick} per tick)`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                      <td>{formatMilliseconds(duration)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>{poisonPerTick}</span>
        </OverlayTrigger>
      }
      Icon={Icon}
      isAnimated
      tooltip="Poison rating"
    />
  );
}