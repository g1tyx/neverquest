import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { essenceLoot } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function EssenceLoot() {
  const essenceLootValue = useRecoilValue(essenceLoot);

  useDeltaText({
    delta: "essenceLoot",
    value: essenceLoot,
  });

  if (essenceLootValue === 0) {
    return null;
  }

  return (
    <Stack className={getAnimationClass({ name: "flipInX" })} direction="horizontal">
      <IconDisplay Icon={IconEssence} tooltip="Looted essence">
        {formatNumber({ value: essenceLootValue })}
      </IconDisplay>

      <FloatingTextQueue delta="essenceLoot" />
    </Stack>
  );
}
