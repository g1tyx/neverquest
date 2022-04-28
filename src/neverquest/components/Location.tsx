import { useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIOverlayPlacement } from "neverquest/env";
import icon from "neverquest/icons/compass.svg";
import { location } from "neverquest/state/global";

export default function Location() {
  const locationValue = useRecoilValue(location);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} placement={UIOverlayPlacement.Bottom} tooltip="Location" />

      <span>{locationValue}</span>
    </Stack>
  );
}
