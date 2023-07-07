import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { DodgePenaltyContents } from "@neverquest/components/Inventory/DodgePenaltyContents";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAgility } from "@neverquest/icons/agility.svg";
import { ReactComponent as IconDodge } from "@neverquest/icons/dodge.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { rawAttributeStatistic } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { armor, hasItem } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { dodgeTotal, powerBonus } from "@neverquest/state/statistics";
import {
  CLASS_TABLE_CELL_ITALIC,
  LABEL_EMPTY,
  LABEL_UNKNOWN,
} from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Dodge() {
  const { staminaCost } = useRecoilValue(armor);
  const dodgeTotalValue = useRecoilValue(dodgeTotal);
  const isShowingDodge = useRecoilValue(isShowing("dodge"));
  const isShowingDodgePenalty = useRecoilValue(isShowing("dodgePenalty"));
  const hasTomeOfPower = useRecoilValue(hasItem("tome of power"));
  const powerBonusValue = useRecoilValue(powerBonus("agility"));
  const statisticValue = useRecoilValue(rawAttributeStatistic("agility"));
  const skillEvasion = useRecoilValue(skills("evasion"));

  useDeltaText({
    atomDelta: deltas("dodge"),
    atomValue: dodgeTotal,
    type: "percentage",
  });

  if (!isShowingDodge) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Dodge chance details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Agility:</td>

                      <td>
                        <IconImage Icon={IconAgility} size="tiny" />
                        &nbsp;{`${formatPercentage(statisticValue, 0)}`}
                      </td>
                    </tr>

                    {powerBonusValue > 0 && (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Empowered:</td>

                        <td>
                          <IconImage Icon={IconPower} size="tiny" />
                          &nbsp;{`+${formatPercentage(powerBonusValue)}`}
                        </td>
                      </tr>
                    )}

                    {isShowingDodgePenalty ? (
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Armor penalty:</td>

                        <td>
                          <DodgePenaltyContents staminaCost={staminaCost} />
                        </td>
                      </tr>
                    ) : (
                      <td className="text-end">{LABEL_UNKNOWN}</td>
                    )}
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={
              skillEvasion && (isShowingDodgePenalty || hasTomeOfPower) ? ["hover", "focus"] : []
            }
          >
            <span>{skillEvasion ? formatPercentage(dodgeTotalValue) : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText deltaType="dodge" />
        </Stack>
      }
      Icon={IconDodge}
      isAnimated
      tooltip="Dodge chance"
    />
  );
}
