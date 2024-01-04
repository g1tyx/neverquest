import { useLayoutEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Awakening } from "@neverquest/components/Awakening";
import { Attack } from "@neverquest/components/Controls/Attack";
import { Capabilities } from "@neverquest/components/Controls/Capabilities";
import { CollectLoot } from "@neverquest/components/Controls/CollectLoot";
import { Journal } from "@neverquest/components/Controls/Journal";
import { Knapsack } from "@neverquest/components/Controls/Knapsack";
import { Retire } from "@neverquest/components/Controls/Retire";
import { Travel } from "@neverquest/components/Controls/Travel";
import { Encounter } from "@neverquest/components/Encounter";
import { WildernessStatus } from "@neverquest/components/Encounter/WildernessStatus";
import { Essence } from "@neverquest/components/Essence";
import { GameOver } from "@neverquest/components/GameOver";
import { Gear } from "@neverquest/components/Inventory/Gear";
import { Location } from "@neverquest/components/Location";
import { Masteries } from "@neverquest/components/Masteries";
import { QuestNotifications } from "@neverquest/components/Quests/QuestNotifications";
import { ScreenMessage } from "@neverquest/components/ScreenMessage";
import { Statistics } from "@neverquest/components/Statistics";
import { Status } from "@neverquest/components/Status";
import { CLASS_FULL_WIDTH_JUSTIFIED, SCREEN_WIDTH_MINIMUM } from "@neverquest/data/general";
import { consciousness } from "@neverquest/state/encounter";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Layout() {
  const consciousnessValue = useRecoilValue(consciousness);

  const [screenSizeWarning, setScreenSizeWarning] = useState("");

  useLayoutEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth <= SCREEN_WIDTH_MINIMUM) {
        setScreenSizeWarning(
          `Requires a screen width of minimum ${formatNumber({
            value: SCREEN_WIDTH_MINIMUM,
          })} pixels.`,
        );
      } else {
        setScreenSizeWarning("");
      }
    };

    window.addEventListener("resize", checkWidth);

    checkWidth();

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  if (screenSizeWarning !== "") {
    return <ScreenMessage>{screenSizeWarning}</ScreenMessage>;
  }

  switch (consciousnessValue) {
    case "mors": {
      return (
        <ScreenMessage>
          <h5
            className={getAnimationClass({
              animation: "zoomIn",
              speed: "slower",
            })}
          >
            Fin.
          </h5>
        </ScreenMessage>
      );
    }

    case "somnium": {
      return (
        <Container className="somnium mb-4">
          <Row>
            <Col>
              <Stack gap={3}>
                <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
                  <Location />

                  <Essence />
                </div>

                <Stack className="overlay-offcanvas" gap={3}>
                  <Status />

                  <Statistics />

                  <Gear />

                  <Masteries />
                </Stack>
              </Stack>
            </Col>

            <Col xs="auto">
              <Stack gap={3}>
                <Retire />

                <Attack />

                <Capabilities />

                <Knapsack />

                <Journal />

                <CollectLoot />

                <Travel />
              </Stack>
            </Col>

            <Col>
              <Stack gap={3}>
                <WildernessStatus />

                <Encounter />
              </Stack>
            </Col>
          </Row>

          <GameOver />

          <QuestNotifications />
        </Container>
      );
    }

    case "vigilans": {
      return (
        <Container className="mb-4">
          <Awakening />

          <QuestNotifications />
        </Container>
      );
    }
  }
}
