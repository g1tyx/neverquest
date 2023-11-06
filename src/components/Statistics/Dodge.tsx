import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/Armor/DodgePenaltyContents";
import {
  CLASS_TABLE_CELL_ITALIC,
  LABEL_EMPTY,
  LABEL_SEPARATOR,
  LABEL_UNKNOWN,
} from "@neverquest/data/general";
import { ARMOR_NONE } from "@neverquest/data/inventory";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAgility from "@neverquest/icons/agility.svg?react";
import IconDodgePenalty from "@neverquest/icons/dodge-penalty.svg?react";
import IconDodge from "@neverquest/icons/dodge.svg?react";
import IconNudist from "@neverquest/icons/nudist.svg?react";
import IconTomeOfPower from "@neverquest/icons/tome-of-power.svg?react";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { armor } from "@neverquest/state/gear";
import { ownedItem } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isSkillAcquired } from "@neverquest/state/skills";
import { dodgeChance } from "@neverquest/state/statistics";
import { isTraitAcquired } from "@neverquest/state/traits";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Dodge() {
  const { name, staminaCost } = useRecoilValue(armor);
  const agilityPowerBonus = useRecoilValue(attributePowerBonus("agility"));
  const agility = useRecoilValue(attributeStatistic("agility"));
  const dodgeChanceValue = useRecoilValue(dodgeChance);
  const isShowingDodgeChance = useRecoilValue(isShowing("dodgeChance"));
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const isSkillAcquiredEvasion = useRecoilValue(isSkillAcquired("evasion"));
  const isTraitAcquiredNudist = useRecoilValue(isTraitAcquired("nudist"));
  const hasTomeOfPower = Boolean(useRecoilValue(ownedItem("tome of power")));

  useDeltaText({
    delta: "dodgeChance",
    format: "percentage",
    state: dodgeChance,
  });

  if (!isShowingDodgeChance) {
    return null;
  }

  return (
    <IconDisplay Icon={IconDodge} isAnimated tooltip="Dodge chance">
      <Stack direction="horizontal" gap={1}>
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Dodge chance details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconAgility} size="small" />
                        Agility:
                      </Stack>
                    </td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        {`${formatNumber({
                          decimals: 0,
                          format: "percentage",
                          value: agility,
                        })}`}

                        {agilityPowerBonus > 0 && (
                          <>
                            <span>{LABEL_SEPARATOR}</span>

                            <IconImage Icon={IconTomeOfPower} size="small" />

                            {`+${formatNumber({
                              format: "percentage",
                              value: agilityPowerBonus,
                            })}`}
                          </>
                        )}
                      </Stack>
                    </td>
                  </tr>

                  {isTraitAcquiredNudist && name === ARMOR_NONE.name && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconNudist} size="small" />
                          Nudist:
                        </Stack>
                      </td>

                      <td>x2</td>
                    </tr>
                  )}

                  {isShowingDodgePenalty ? (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconDodgePenalty} size="small" />
                          Armor penalty:
                        </Stack>
                      </td>

                      <td>
                        <DodgePenaltyContents staminaCost={staminaCost} />
                      </td>
                    </tr>
                  ) : (
                    <td className="text-end">{LABEL_UNKNOWN}</td>
                  )}
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={
            isSkillAcquiredEvasion && (isShowingDodgePenalty || hasTomeOfPower)
              ? ["hover", "focus"]
              : []
          }
        >
          <span>
            {isSkillAcquiredEvasion
              ? formatNumber({ format: "percentage", value: dodgeChanceValue })
              : LABEL_EMPTY}
          </span>
        </OverlayTrigger>

        <DeltasDisplay delta="dodgeChance" />
      </Stack>
    </IconDisplay>
  );
}
