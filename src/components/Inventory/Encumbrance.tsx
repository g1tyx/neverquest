import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react";
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";

export function Encumbrance() {
  const encumbranceValue = useRecoilValue(encumbrance);
  const encumbranceMaximumValue = useRecoilValue(encumbranceMaximum);

  useDeltaText({
    delta: "encumbranceMaximum",
    state: encumbranceMaximum,
  });

  return (
    <IconDisplay className="w-100" Icon={IconEncumbrance} tooltip="Encumbrance">
      <LabelledProgressBar
        value={(encumbranceValue / encumbranceMaximumValue) * 100}
        variant="dark"
      >
        <Stack direction="horizontal" gap={1}>
          {`${encumbranceValue}/${encumbranceMaximumValue}`}

          <DeltasDisplay delta="encumbranceMaximum" />
        </Stack>
      </LabelledProgressBar>
    </IconDisplay>
  );
}
