import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconStage } from "@neverquest/icons/stage.svg";
import { deltas } from "@neverquest/state/deltas";
import { stage } from "@neverquest/state/encounter";

export function Stage() {
  const stageValue = useRecoilValue(stage);

  useDeltaText({
    atomDelta: deltas("stage"),
    atomValue: stage,
    stop: ({ current }) => current === 1,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{stageValue}</span>

          <FloatingText deltaType="stage" />
        </Stack>
      }
      Icon={IconStage}
      iconProps={{ overlayPlacement: "bottom" }}
      tooltip="Stage"
    />
  );
}
