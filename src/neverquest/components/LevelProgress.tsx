import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import Progress from "neverquest/components/Progress";
import { UIVariant } from "neverquest/env";
import levelIcon from "neverquest/icons/flying-flag.svg";
import progressIcon from "neverquest/icons/stairs.svg";
import { isWilderness, level, progress, progressMax } from "neverquest/state/global";
import { showLevelProgress } from "neverquest/state/show";

export default function LevelProgress() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);
  const progressValue = useRecoilValue(progress);
  const progressMaxValue = useRecoilValue(progressMax);
  const showLevelProgressValue = useRecoilValue(showLevelProgress);

  if (!showLevelProgressValue) {
    return null;
  }

  return (
    <Stack className="animate__animated animate__flipInX" direction="horizontal" gap={5}>
      <Stack direction="horizontal" gap={3}>
        <ImageIcon icon={levelIcon} tooltip="Level" />

        <span>{levelValue}</span>
      </Stack>

      {isWildernessValue && (
        <Stack className="w-100" direction="horizontal" gap={3}>
          <ImageIcon icon={progressIcon} tooltip="Level progress" />

          <Progress
            label={`${progressValue}/${progressMaxValue}`}
            value={(progressValue / progressMaxValue) * 100}
            variant={UIVariant.Primary}
          />
        </Stack>
      )}
    </Stack>
  );
}
