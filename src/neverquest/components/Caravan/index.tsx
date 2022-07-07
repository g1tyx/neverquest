import { useAtomValue } from "jotai";
import { nanoid } from "nanoid";
import { Fragment, useMemo, useState } from "react";
import { Card, Stack } from "react-bootstrap";

import DismissableScreen from "neverquest/components/DismissableScreen";
import Crew from "neverquest/components/Caravan/Crew";
import Mercenary from "neverquest/components/Caravan/Mercenary";
import Merchant from "neverquest/components/Caravan/Merchant";
import { crew } from "neverquest/state/caravan";
import { CrewType } from "neverquest/types/core";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

interface CrewMember {
  Component: JSX.Element;
  label: string;
  name: string;
  type: CrewType;
}

export default function Caravan() {
  const crewValue = useAtomValue(crew);
  const [currentMember, setCurrentMember] = useState<CrewMember>();
  const [isScreenShowing, setScreenShowing] = useState(false);

  const crewOrder = useMemo(
    () => [
      {
        Component: <Merchant />,
        key: nanoid(),
        label: "Trade",
        name: "Merchant",
        type: CrewType.Merchant,
      },
      {
        Component: <Mercenary />,
        key: nanoid(),
        label: "Train",
        name: "Mercenary",
        type: CrewType.Mercenary,
      },
    ],
    []
  );

  const onActivate = (isShowing: boolean, member?: CrewMember) => {
    setScreenShowing(isShowing);

    if (member) {
      setCurrentMember(member);
    }
  };

  return (
    <>
      <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
        <Card.Body>
          <Stack gap={3}>
            {crewOrder.map(
              ({ key, label, name, type }, index) =>
                crewValue[type] && (
                  <Fragment key={key}>
                    <Crew
                      label={label}
                      name={name}
                      setActive={() => onActivate(true, crewOrder[index])}
                      type={type}
                    />
                  </Fragment>
                )
            )}
          </Stack>
        </Card.Body>
      </Card>

      {currentMember && (
        <DismissableScreen
          contents={currentMember.Component}
          isShowing={isScreenShowing}
          onClose={() => onActivate(false)}
          title={currentMember.name}
        />
      )}
    </>
  );
}
