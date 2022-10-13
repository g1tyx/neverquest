import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import { totalRecoveryRate } from "@neverquest/state/statistics";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function () {
  const [isRecoveringValue, setRecovering] = useRecoilState(isRecovering);
  const totalRecoveryRateValue = useRecoilValue(totalRecoveryRate);
  const [deltaRecovery, setDeltaRecovery] = useState(0);

  useAnimation((delta) => {
    setDeltaRecovery((current) => current + delta);
  }, !isRecoveringValue);

  useEffect(() => {
    if (deltaRecovery >= totalRecoveryRateValue) {
      setDeltaRecovery(0);
      setRecovering(false);
    }
  }, [deltaRecovery, totalRecoveryRateValue, setRecovering]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(totalRecoveryRateValue - deltaRecovery)}
      value={(deltaRecovery / totalRecoveryRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
