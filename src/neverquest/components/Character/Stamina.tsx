import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Regeneration from "neverquest/components/Character/Regeneration";
import ImageIcon from "neverquest/components/ImageIcon";
import ResourceMeter from "neverquest/components/ResourceMeter";
import { UIAttachment } from "neverquest/env";
import icon from "neverquest/icons/lungs.svg";
import { deltaStamina } from "neverquest/state/deltas";
import { currentStamina, isStaminaMaxedOut, maximumStamina } from "neverquest/state/resources";
import { showStamina } from "neverquest/state/show";
import { totalStaminaRegenerationRate } from "neverquest/state/stats";

export default function Stamina() {
  const showStaminaValue = useRecoilValue(showStamina);

  if (!showStaminaValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Stamina" />

      <Stack>
        <ResourceMeter
          attached={UIAttachment.Below}
          atom={currentStamina}
          atomDelta={deltaStamina}
          atomMaximum={maximumStamina}
        />

        <Regeneration
          isResourceMaxedOut={isStaminaMaxedOut}
          regenerationRate={totalStaminaRegenerationRate}
          atom={currentStamina}
          atomDelta={deltaStamina}
        />
      </Stack>
    </Stack>
  );
}
