import { MouseEvent } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import icon from "@neverquest/icons/cowled.svg";
import { crew } from "@neverquest/state/caravan";
import { CrewStatus, CrewType } from "@neverquest/types/enums";
import { UIVariant } from "@neverquest/types/ui";
import { CREW_MEMBERS } from "@neverquest/utilities/constants-caravan";

export default function CrewHirable({
  setActive,
  type,
}: {
  setActive: () => void;
  type: CrewType;
}) {
  const { hireStatus, monologueProgress } = useRecoilValue(crew(type));

  if (hireStatus !== CrewStatus.Hired) {
    return null;
  }

  const { interaction, monologues, name } = CREW_MEMBERS[type];

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip={name} />

      <div className="align-items-center d-flex justify-content-between w-100">
        <span>{`"${monologues[monologueProgress]}"`}</span>

        <Button
          onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
            currentTarget.blur();

            setActive();
          }}
          variant={UIVariant.Outline}
        >
          {interaction}
        </Button>
      </div>
    </Stack>
  );
}
