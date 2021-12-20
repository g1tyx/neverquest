import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import AttributesAvailable from "components/Attributes/AttributesAvailable";
import AttributeCost from "components/Attributes/AttributeCost";
import AttributesList from "components/Attributes/AttributesList";
import Experience from "components/Character/Experience";
import Level from "components/Character/Level";

export default function Attributes() {
  return (
    <Stack gap={5}>
      <Row>
        <Col>
          <Experience />
        </Col>

        <Col>
          <Level />
        </Col>

        <Col>
          <AttributeCost />
        </Col>

        <Col>
          <AttributesAvailable />
        </Col>
      </Row>

      <AttributesList />
    </Stack>
  );
}
