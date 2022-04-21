import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/level-four.svg";
import { characterLevel } from "neverquest/state/character";
import { deltaCharacterLevel } from "neverquest/state/deltas";
import { showCharacterLevel } from "neverquest/state/show";

export default function CharacterLevel({ show = false }: { show?: boolean }) {
  const characterLevelValue = useRecoilValue(characterLevel);
  const showCharacterLevelValue = useRecoilValue(showCharacterLevel);

  if (!show && !showCharacterLevelValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Level" />

      <span>{characterLevelValue}</span>

      <FloatingText atom={deltaCharacterLevel} />
    </Stack>
  );
}
