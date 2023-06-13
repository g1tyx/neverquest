import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ReactComponent as IconBlightRating } from "@neverquest/icons/blight-rating.svg";
import { poisonDuration } from "@neverquest/state/character";
import { monsterBlightChance, monsterPoisonChance } from "@neverquest/state/monster";
import { blightIncrement } from "@neverquest/state/reserves";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function MonsterBlightRating() {
  const blightIncrementValue = useRecoilValue(blightIncrement);
  const poisonDurationValue = useRecoilValue(poisonDuration);
  const monsterBlightChanceValue = useRecoilValue(monsterBlightChance);
  const monsterPoisonChanceValue = useRecoilValue(monsterPoisonChance);

  if (monsterBlightChanceValue === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header className="text-center">Blight details</Popover.Header>

              <Popover.Body>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                    <td>{`${formatPercentage(monsterBlightChanceValue)} if poisoned`}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Effect:</td>

                    <td>{`${blightIncrementValue} stamina reduction per affliction`}</td>
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
        >
          <span>
            {poisonDurationValue > 0
              ? formatPercentage(monsterBlightChanceValue * monsterPoisonChanceValue)
              : LABEL_EMPTY}
          </span>
        </OverlayTrigger>
      }
      Icon={IconBlightRating}
      isAnimated
      tooltip="Blight rating"
    />
  );
}
