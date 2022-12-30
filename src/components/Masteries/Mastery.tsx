import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { MASTERIES } from "@neverquest/data/masteries";
import { deltas } from "@neverquest/state/deltas";
import { isShowingMastery } from "@neverquest/state/isShowing";
import { masteries, masteryCost } from "@neverquest/state/masteries";
import { MasteryType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";
import { getDeltaTypeFromMasteryType } from "@neverquest/utilities/getters";

export default function ({ type }: { type: MasteryType }) {
  const isShowingMasteryValue = useRecoilValue(isShowingMastery(type));
  const { progress, rank } = useRecoilValue(masteries(type));
  const masteryCostValue = useRecoilValue(masteryCost(type));

  const { description, Icon, name } = MASTERIES[type];

  if (!isShowingMasteryValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <Stack className="w-100" direction="horizontal" gap={3}>
            <span>{rank}</span>

            <LabelledProgressBar
              label={`${progress}/${masteryCostValue}`}
              value={(progress / masteryCostValue) * 100}
              variant={UIVariant.Secondary}
            />
          </Stack>

          <FloatingText atom={deltas(getDeltaTypeFromMasteryType(type))} />
        </Stack>
      }
      description={description}
      Icon={Icon}
      tooltip={name}
    />
  );
}
