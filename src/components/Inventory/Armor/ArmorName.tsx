import { OverlayTrigger, Popover } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, ICON_SIZE_INLAY, LABEL_UNKNOWN } from "@neverquest/constants";
import { ARMOR_CLASS_ICONS } from "@neverquest/data/gear";
import { hasKnapsack } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import { Armor } from "@neverquest/types";
import { SkillType } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ArmorName({ armor, placement = "top" }: { armor: Armor; placement?: Placement }) {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const armorsSkillValue = useRecoilValue(skills(SkillType.Armors));

  const {
    armorClass,
    deflectionChance,
    dodgeChanceModifier,
    name,
    protection,
    staminaCost,
    weight,
  } = armor;
  const Icon = armorClass ? ARMOR_CLASS_ICONS[armorClass] : () => null;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Protection:</td>

                <td>{protection}</td>
              </tr>

              {armorsSkillValue ? (
                <>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      <Icon width={ICON_SIZE_INLAY} />
                      &nbsp;
                      {capitalizeAll(armorClass ?? "None")}
                    </td>
                  </tr>

                  {deflectionChance && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance:</td>

                      <td>{formatPercentage(deflectionChance)}</td>
                    </tr>
                  )}

                  {staminaCost && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Stamina cost when dodging:</td>

                      <td>{staminaCost}</td>
                    </tr>
                  )}

                  {dodgeChanceModifier && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Penalty to dodge chance:</td>

                      <td>{formatPercentage(dodgeChanceModifier)}</td>
                    </tr>
                  )}
                </>
              ) : (
                <tr>
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                </tr>
              )}

              <tr>
                {hasKnapsackValue ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Weight:</td>

                    <td>{weight}</td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>
            </DetailsTable>
          </Popover.Body>
        </Popover>
      }
      placement={placement}
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}
