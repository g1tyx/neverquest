import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssenceBonus from "@neverquest/icons/essence-bonus.svg?react";
import { essenceBonus } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function EssenceBonus() {
  const essenceBonusValue = useRecoilValue(essenceBonus);

  useDeltaText({
    delta: "essenceBonus",
    format: "percentage",
    value: essenceBonus,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay Icon={IconEssenceBonus} tooltip="Essence loot bonus">{`+${formatNumber({
        format: "percentage",
        value: essenceBonusValue,
      })}`}</IconDisplay>

      <FloatingTextQueue delta="essenceBonus" />
    </Stack>
  );
}
