import { useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useSetRecoilState } from "recoil";

import MonsterAttack from "neverquest/components/Monster/MonsterAttack";
import MonsterHealth from "neverquest/components/Monster/MonsterHealth";
import MonsterDamage from "neverquest/components/Monster/MonsterDamage";
import MonsterDamagePerSecond from "neverquest/components/Monster/MonsterDamagePerSecond";
import MonsterName from "neverquest/components/Monster/MonsterName";
import MonsterStagger from "neverquest/components/Monster/MonsterStagger";
import { monsterStatusElement } from "neverquest/state/monster";
import { AnimationSpeed, AnimationType } from "neverquest/types/ui";
import { animateElement } from "neverquest/utilities/helpers";

export default function MonsterStatus() {
  const element = useRef(null);
  const setMonsterStatusElement = useSetRecoilState(monsterStatusElement);

  useEffect(() => {
    const { current } = element;

    animateElement(current, AnimationType.ZoomInRight, AnimationSpeed.Faster);
    setMonsterStatusElement(current);
  }, []);

  return (
    <Card ref={element}>
      <Card.Body>
        <Stack gap={3}>
          <MonsterName />

          <MonsterHealth />

          <Row>
            <Col>
              <MonsterAttack />
            </Col>

            <Col>
              <MonsterStagger />
            </Col>
          </Row>

          <MonsterDamage />

          <MonsterDamagePerSecond />
        </Stack>
      </Card.Body>
    </Card>
  );
}