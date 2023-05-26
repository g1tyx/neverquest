import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { GearComparison } from "@neverquest/components/Inventory/GearComparison";
import { GearLevelDetail } from "@neverquest/components/Inventory/GearLevelDetail";
import { StaminaCostDetail } from "@neverquest/components/Inventory/StaminaCostDetail";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN } from "@neverquest/data/internal";
import { type SHIELD_NONE, SHIELD_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconBlock } from "@neverquest/icons/block.svg";
import { ReactComponent as IconNone } from "@neverquest/icons/gear-class-none.svg";
import { ReactComponent as IconStagger } from "@neverquest/icons/shield-stagger.svg";
import { shield as shieldEquipped } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import type { Shield } from "@neverquest/types";
import { Showing, Skill } from "@neverquest/types/enums";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";

export function ShieldName({
  placement,
  shield,
}: {
  placement?: Placement;
  shield: Shield | typeof SHIELD_NONE;
}) {
  const isShowingGearClass = useRecoilValue(isShowing(Showing.GearClass));
  const shieldEquippedValue = useRecoilValue(shieldEquipped);
  const staggerSkillValue = useRecoilValue(skills(Skill.Traumatology));

  const { block, level, name, stagger, staminaCost, weight } = shield;
  const isEquipped = JSON.stringify(shieldEquippedValue) === JSON.stringify(shield);

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body>
            <DetailsTable>
              <GearLevelDetail
                comparison={
                  isEquipped
                    ? null
                    : { showingType: Showing.Shield, subtrahend: shieldEquippedValue.level }
                }
                level={level}
              />

              <tr>
                <td className={CLASS_TABLE_CELL_ITALIC}>Block chance:</td>

                <td>
                  <IconImage Icon={IconBlock} size="tiny" />
                  &nbsp;{formatPercentage(block)}
                  {!isEquipped && (
                    <GearComparison
                      difference={block - shieldEquippedValue.block}
                      showingType={Showing.Shield}
                    />
                  )}
                </td>
              </tr>

              <StaminaCostDetail
                comparison={
                  isEquipped
                    ? null
                    : {
                        showingType: Showing.Shield,
                        subtrahend: shieldEquippedValue.staminaCost,
                      }
                }
                cost={staminaCost}
              />

              <tr>
                {isShowingGearClass ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Class:</td>

                    <td>
                      {(() => {
                        if ("gearClass" in shield) {
                          const { gearClass } = shield;

                          if (gearClass) {
                            const { Icon } = SHIELD_SPECIFICATIONS[gearClass];

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

              <tr>
                {staggerSkillValue ? (
                  <>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Stagger chance:</td>

                    <td>
                      <IconImage Icon={IconStagger} size="tiny" />
                      &nbsp;{formatPercentage(stagger)}
                      {!isEquipped && (
                        <GearComparison
                          difference={stagger - shieldEquippedValue.stagger}
                          showingType={Showing.Shield}
                        />
                      )}
                    </td>
                  </>
                ) : (
                  <td className="text-end">{LABEL_UNKNOWN}</td>
                )}
              </tr>

              <WeightDetail
                comparison={
                  isEquipped
                    ? null
                    : { showingType: Showing.Shield, subtrahend: shieldEquippedValue.weight }
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
