import { useAtomValue } from "jotai";
import { Card, Stack } from "react-bootstrap";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/crossed-bones.svg";
import Monster from "@neverquest/components/Monster";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function Wilderness() {
  const isLevelCompletedValue = useAtomValue(isLevelCompleted);

  return (
    <Stack gap={3}>
      {isLevelCompletedValue ? (
        <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
          <Card.Body>
            <Stack direction="horizontal" gap={5}>
              <ImageIcon icon={icon} tooltip="Monster remains" />

              <span className="fst-italic">Everything is dead.</span>
            </Stack>
          </Card.Body>
        </Card>
      ) : (
        <Monster />
      )}
    </Stack>
  );
}