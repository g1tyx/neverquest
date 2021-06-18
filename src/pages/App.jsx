import React from "react";
import { useRecoilValue } from "recoil";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Header from "components/Header";
import Location from "components/Location";
import Progress from "components/Progress";
import Character from "components/Character";
import Encounter from "components/Encounter";
import { progress, progressMaximum } from "state/atoms";

export default function App() {
  const progressValue = useRecoilValue(progress);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  return (
    <>
      <Header />

      <Container>
        <Row className="align-items-center">
          <Col>
            <Location />
          </Col>

          <Col>
            <Progress
              value={(progressValue / progressMaximumValue) * 100}
              label={`${progressValue}/${progressMaximumValue}`}
            />
          </Col>

          <Col className="text-center">
            <Button variant="primary" disabled>
              Go to Caravan
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Character />
          </Col>

          <Col>
            <Encounter />
          </Col>
        </Row>
      </Container>
    </>
  );
}
