import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconPowerLevel } from "@neverquest/icons/power-level.svg";
import { characterLevel } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export function PowerLevel() {
  const characterLevelValue = useRecoilValue(characterLevel);

  const deltaPowerLevel = deltas(DeltaType.PowerLevel);

  useDeltaText({
    atomDelta: deltaPowerLevel,
    atomValue: characterLevel,
  });

  return (
    <IconDisplay
      contents={
        <>
          <span>{characterLevelValue}</span>

          <FloatingText type={DeltaType.PowerLevel} />
        </>
      }
      Icon={IconPowerLevel}
      tooltip="Power level"
    />
  );
}