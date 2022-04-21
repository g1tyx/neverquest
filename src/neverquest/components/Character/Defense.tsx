import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useRecoilValue } from "recoil";

import Block from "neverquest/components/Character/Block";
import Dodge from "neverquest/components/Character/Dodge";
import Protection from "neverquest/components/Character/Protection";
import { showBlockChance, showDodgeChance, showTotalProtection } from "neverquest/state/show";

export default function Defense() {
  const showBlockChanceValue = useRecoilValue(showBlockChance);
  const showDodgeChanceValue = useRecoilValue(showDodgeChance);
  const showTotalProtectionValue = useRecoilValue(showTotalProtection);

  if (!showBlockChanceValue && !showDodgeChanceValue && !showTotalProtectionValue) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Protection />
      </Col>

      <Col>
        <Block />
      </Col>

      <Col>
        <Dodge />
      </Col>
    </Row>
  );
}
