import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import LootedResource from "neverquest/components/Loot/LootedResource";
import UnlootedResource from "neverquest/components/Loot/UnlootedResource";
import { LootType } from "neverquest/env.d";
import { aether, aetherLoot, coins, coinsLoot, scrap, scrapLoot } from "neverquest/state/loot";

export default function LootDisplay({ isLoot }: { isLoot?: boolean }) {
  return (
    <Row>
      {isLoot ? (
        <>
          <Col>
            <UnlootedResource atom={scrapLoot} name={LootType.Scrap} />
          </Col>

          <Col>
            <UnlootedResource atom={coinsLoot} name={LootType.Coins} />
          </Col>

          <Col>
            <UnlootedResource atom={aetherLoot} name={LootType.Aether} />
          </Col>
        </>
      ) : (
        <>
          <Col>
            <LootedResource atom={scrap} name={LootType.Scrap} />
          </Col>

          <Col>
            <LootedResource atom={coins} name={LootType.Coins} />
          </Col>

          <Col>
            <LootedResource atom={aether} name={LootType.Aether} />
          </Col>
        </>
      )}
    </Row>
  );
}