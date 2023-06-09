import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/DodgePenaltyContents";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { type ARMOR_NONE, ARMOR_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { ReactComponent as IconNone } from "@neverquest/icons/none.svg";
import { ReactComponent as IconProtection } from "@neverquest/icons/protection.svg";
import { armor as armorEquipped } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import type { Armor } from "@neverquest/types";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ArmorName({
  armor,
  placement,
}: {
  armor: Armor | typeof ARMOR_NONE;
  placement?: Placement;
}) {
  const armorEquippedValue = useRecoilValue(armorEquipped);
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const isShowingGearClass = useRecoilValue(isShowing("gearClass"));

  const { deflection, level, name, protection, staminaCost, weight } = armor;
  const showComparison = armorEquippedValue.id === armor.id;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  showComparison
                    ? null
                    : { showingType: "armor", subtrahend: armorEquippedValue.level }
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Protection:</td>

                <td>
                  <IconImage Icon={IconProtection} size="tiny" />
                  &nbsp;{protection}
                  {!showComparison && (
                    <GearComparison
                      difference={protection - armorEquippedValue.protection}
                      showingType="armor"
                    />
                  )}
                </td>
              </tr>

              <tr>
                {isShowingGearClass ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      {(() => {
                        if ("gearClass" in armor) {
                          const { gearClass } = armor;

                          if (gearClass) {
                            const { Icon } = ARMOR_SPECIFICATIONS[gearClass];

                            return (
                              <>
                                <IconImage Icon={Icon} size="tiny" />
                                &nbsp;{capitalizeAll(gearClass)}
                              </>
                            );
                          }
                        }

                        return (
                          <>
                            <IconImage Icon={IconNone} size="tiny" />
                            &nbsp;None
                          </>
                        );
                      })()}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              {deflection > 0 && (
                <tr>
                  {isShowingDeflection ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance:</td>

                      <td>
                        <IconImage Icon={IconDeflection} size="tiny" />
                        &nbsp;{formatPercentage(deflection)}
                        {!showComparison && (
                          <GearComparison
                            difference={deflection - armorEquippedValue.deflection}
                            showingType="armor"
                          />
                        )}
                      </td>
                    </>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </tr>
              )}

              {staminaCost > 0 && (
                <tr>
                  {isShowingDodgePenalty ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Dodge penalty:</td>

                      <td>
                        <DodgePenaltyContents staminaCost={staminaCost} />

                        {!showComparison && (
                          <GearComparison
                            difference={staminaCost - armorEquippedValue.staminaCost}
                            isDownPositive
                            showingType="armor"
                          />
                        )}
                      </td>
                    </>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </tr>
              )}

              <WeightDetail
                comparison={
                  showComparison
                    ? null
                    : { showingType: "armor", subtrahend: armorEquippedValue.weight }
                }
                weight={weight}
              />
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
