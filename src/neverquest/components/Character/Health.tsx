import Stack from "react-bootstrap/Stack";

import Regeneration from "neverquest/components/Character/Regeneration";
import ImageIcon from "neverquest/components/ImageIcon";
import ResourceMeter from "neverquest/components/ResourceMeter";
import { UIAttachment } from "neverquest/env.d";
import icon from "neverquest/icons/hospital-cross.svg";
import {
  currentHealth,
  deltaHealth,
  isHealthMaxedOut,
  maximumHealth,
} from "neverquest/state/resources";
import { totalHealthRegenerationRate } from "neverquest/state/stats";

export default function Health() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Health" />

      <Stack>
        <ResourceMeter
          attached={UIAttachment.Below}
          resourceCurrent={currentHealth}
          resourceDelta={deltaHealth}
          resourceMaximum={maximumHealth}
        />

        <Regeneration
          isResourceMaxedOut={isHealthMaxedOut}
          regenerationRate={totalHealthRegenerationRate}
          resourceCurrent={currentHealth}
          resourceDelta={deltaHealth}
        />
      </Stack>
    </Stack>
  );
}