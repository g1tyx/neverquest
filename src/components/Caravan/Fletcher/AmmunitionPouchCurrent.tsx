import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import { ammunition, ammunitionMaximum } from "@neverquest/state/items";

export function AmmunitionPouchCurrent() {
  const ammunitionValue = useRecoilValue(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));

  useDeltaText({
    delta: "ammunition",
    state: ammunition,
  });

  if (ownedAmmunitionPouch === null) {
    return null;
  }

  return (
    <IconDisplay Icon={IconAmmunitionPouch} tooltip="Ammunition pouch">
      <LabelledProgressBar value={(ammunitionValue / ammunitionMaximumValue) * 100} variant="dark">
        <Stack direction="horizontal" gap={1}>
          {`${ammunitionValue}/${ammunitionMaximumValue}`}

          <DeltasDisplay delta="ammunition" />
        </Stack>
      </LabelledProgressBar>
    </IconDisplay>
  );
}
