import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
import LabelledProgressBar from "neverquest/components/LabelledProgressBar";
import levelIcon from "neverquest/icons/flying-flag.svg";
import progressIcon from "neverquest/icons/stairs.svg";
import { isWilderness, level, progress, progressMax } from "neverquest/state/global";
import { showLevelProgress } from "neverquest/state/show";
import { AnimationType, OverlayPlacement, UIVariant } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function LevelProgress() {
  const isWildernessValue = useAtomValue(isWilderness);
  const levelValue = useAtomValue(level);
  const progressValue = useAtomValue(progress);
  const progressMaxValue = useAtomValue(progressMax);
  const showLevelProgressValue = useAtomValue(showLevelProgress);

  if (!showLevelProgressValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={5}>
      <Stack direction="horizontal" gap={3}>
        <ImageIcon icon={levelIcon} placement={OverlayPlacement.Bottom} tooltip="Level" />

        <span>{levelValue}</span>
      </Stack>

      {isWildernessValue && (
        <Stack className="w-100" direction="horizontal" gap={3}>
          <ImageIcon
            icon={progressIcon}
            placement={OverlayPlacement.Bottom}
            tooltip="Level progress"
          />

          <LabelledProgressBar
            label={`${progressValue}/${progressMaxValue}`}
            value={(progressValue / progressMaxValue) * 100}
            variant={UIVariant.Primary}
          />
        </Stack>
      )}
    </Stack>
  );
}
