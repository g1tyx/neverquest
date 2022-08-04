import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import ResourceDisplay from "@neverquest/components/Resource/ResourceDisplay";
import Looting from "@neverquest/components/Resource/Looting";
import { ReactComponent as Icon } from "@neverquest/icons/open-chest.svg";
import { progress } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function Loot() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const progressValue = useRecoilValue(progress);

  return (
    <Stack gap={3}>
      <Looting />

      {progressValue > 0 && (
        <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
          <Card.Body>
            {hasLootedValue ? (
              <Stack direction="horizontal" gap={5}>
                <ImageIcon Icon={Icon} tooltip="Loot" />

                <span className="fst-italic">Nothing remains.</span>
              </Stack>
            ) : (
              <ResourceDisplay isLoot />
            )}
          </Card.Body>
        </Card>
      )}
    </Stack>
  );
}
