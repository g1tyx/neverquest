import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, RecoilState, RecoilValueReadOnly } from "recoil";

import Progress from "neverquest/components/Progress";
import { DeltaDisplay, UIAttachment, UIFloatingTextType, UISize, UIVariant } from "neverquest/env";
import useAnimation from "neverquest/hooks/useAnimation";
import { isRecovering } from "neverquest/state/character";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function Regeneration({
  regenerationRate,
  atom,
  atomDelta,
  isResourceMaxedOut,
}: {
  regenerationRate: RecoilValueReadOnly<number>;
  atom: RecoilState<number>;
  atomDelta: RecoilState<DeltaDisplay>;
  isResourceMaxedOut: RecoilValueReadOnly<boolean>;
}) {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const regenerationRateValue = useRecoilValue(regenerationRate);
  const isResourceMaxedOutValue = useRecoilValue(isResourceMaxedOut);
  const setCurrentResource = useSetRecoilState(atom);
  const setDeltaResource = useSetRecoilState(atomDelta);
  const [deltaRegeneration, setDeltaRegeneration] = useState(0);

  useAnimation((deltaTime) => {
    setDeltaRegeneration((currentDelta) => currentDelta + deltaTime);
  }, isResourceMaxedOutValue || isRecoveringValue);

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      setCurrentResource((currentResource) => currentResource + 1);
      setDeltaResource({
        color: UIFloatingTextType.Positive,
        value: "+1",
      });
    }
  }, [deltaRegeneration, regenerationRateValue]);

  // Catches any leftover increments after regeneration is complete.
  useEffect(() => {
    if (deltaRegeneration > 0 && isResourceMaxedOutValue) {
      setDeltaRegeneration(0);
    }
  }, [deltaRegeneration, isResourceMaxedOutValue]);

  const label = (() => {
    if (isRecoveringValue) {
      return "Recovering ...";
    }

    return `${deltaRegeneration === 0 ? "Regeneration" : "Regenerating"} ${formatMilliseconds(
      regenerationRateValue - deltaRegeneration
    )}`;
  })();

  return (
    <Progress
      attached={UIAttachment.Above}
      disableTransitions
      label={label}
      size={UISize.Tiny}
      value={(deltaRegeneration / regenerationRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
