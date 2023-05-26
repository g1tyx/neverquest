import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/internal";
import { MASTERIES } from "@neverquest/data/masteries";
import { BLEED } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconBleedRating } from "@neverquest/icons/bleed-rating.svg";
import { deltas } from "@neverquest/state/deltas";
import { skills } from "@neverquest/state/skills";
import { bleed, bleedDamage, bleedRating, bleedTick, damage } from "@neverquest/state/statistics";
import { Delta, Mastery, Skill } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function BleedRating() {
  const bleedValue = useRecoilValue(bleed);
  const bleedDamageValue = useRecoilValue(bleedDamage);
  const bleedRatingValue = useRecoilValue(bleedRating);
  const bleedTickValue = useRecoilValue(bleedTick);
  const damageValue = useRecoilValue(damage);
  const bleedSkill = useRecoilValue(skills(Skill.Anatomy));

  const deltaBleed = deltas(Delta.BleedRating);

  const { duration } = BLEED;
  const { name } = MASTERIES[Mastery.Cruelty];

  useDeltaText({
    atomDelta: deltaBleed,
    atomValue: bleedRating,
  });

  if (!bleedSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Bleed rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                      <td>{`${formatPercentage(bleedValue)} chance`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} mastery:`}</td>

                      <td>{`${formatPercentage(bleedDamageValue)} of damage`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Bleed damage:</td>

                      <td>{`${Math.round(
                        damageValue * bleedDamageValue
                      )} (${bleedTickValue} per tick)`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Duration:</td>

                      <td>{formatMilliseconds(duration)}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
          >
            <span>{bleedRatingValue}</span>
          </OverlayTrigger>

          <FloatingText type={Delta.BleedRating} />
        </>
      }
      Icon={IconBleedRating}
      isAnimated
      tooltip="Bleed rating"
    />
  );
}
