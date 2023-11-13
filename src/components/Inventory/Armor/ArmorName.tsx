import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconImage } from "@neverquest/components/IconImage";
import { AppliedGems } from "@neverquest/components/Inventory/AppliedGems";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/Armor/DodgePenaltyContents";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/general";
import { ARMOR_NONE, ARMOR_SPECIFICATIONS } from "@neverquest/data/inventory";
import IconDeflection from "@neverquest/icons/deflection.svg?react";
import IconNone from "@neverquest/icons/none.svg?react";
import IconProtection from "@neverquest/icons/protection.svg?react";
import { armor as armorEquipped } from "@neverquest/state/gear";
import { isShowing } from "@neverquest/state/isShowing";
import type { Armor } from "@neverquest/types";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

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

  const { deflection, ID, level, name, protection, staminaCost, weight } = armor;
  const isUnshielded = name === ARMOR_NONE.name;
  const showComparison = ID !== armorEquippedValue.ID;

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverHeader className="text-center">{name}</PopoverHeader>

          <PopoverBody>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  showComparison
                    ? { showing: "armor", subtrahend: armorEquippedValue.level }
                    : undefined
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Protection:</td>

                <td>
                  <Stack direction="horizontal" gap={1}>
                    <IconImage Icon={IconProtection} size="small" />

                    {formatNumber({ value: protection })}

                    {showComparison && (
                      <GearComparison
                        difference={protection - armorEquippedValue.protection}
                        showing="armor"
                      />
                    )}
                  </Stack>
                </td>
              </tr>

              <AppliedGems gearItem={armor} />

              {!isUnshielded && (
                <tr>
                  {isShowingGearClass ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                      <td>
                        {(() => {
                          const { gearClass } = armor;

                          if (gearClass) {
                            const { Icon } = ARMOR_SPECIFICATIONS[gearClass];

                            return (
                              <Stack direction="horizontal" gap={1}>
                                <IconImage Icon={Icon} size="small" />

                                {capitalizeAll(gearClass)}
                              </Stack>
                            );
                          }

                          return (
                            <Stack direction="horizontal" gap={1}>
                              <IconImage Icon={IconNone} size="small" />
                              None
                            </Stack>
                          );
                        })()}
                      </td>
                    </>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </tr>
              )}

              {deflection > 0 && (
                <tr>
                  {isShowingDeflection ? (
                    <>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Deflection chance:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconDeflection} size="small" />

                          {formatNumber({ format: "percentage", value: deflection })}

                          {showComparison && (
                            <GearComparison
                              difference={deflection - armorEquippedValue.deflection}
                              showing="armor"
                            />
                          )}
                        </Stack>
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
                        <Stack direction="horizontal" gap={1}>
                          <DodgePenaltyContents staminaCost={staminaCost} />

                          {showComparison && (
                            <GearComparison
                              difference={staminaCost - armorEquippedValue.staminaCost}
                              isDownPositive
                              showing="armor"
                            />
                          )}
                        </Stack>
                      </td>
                    </>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </tr>
              )}

              {!isUnshielded && (
                <WeightDetail
                  comparison={
                    showComparison
                      ? { showing: "armor", subtrahend: armorEquippedValue.weight }
                      : undefined
                  }
                  weight={weight}
                />
              )}
            </DetailsTable>
          </PopoverBody>
        </Popover>
      }
      placement={placement}
    >
      <span>{name}</span>
    </OverlayTrigger>
  );
}
