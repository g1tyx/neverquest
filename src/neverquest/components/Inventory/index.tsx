import { useAtomValue, useSetAtom } from "jotai";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Encumbrance from "neverquest/components/Inventory/Encumbrance";
import { inventory, itemEquip, itemUnequip } from "neverquest/state/inventory";
import { isEquipment } from "neverquest/utilities/type-guards";
import { UIVariant } from "neverquest/types/ui";

export default function Inventory() {
  const inventoryValue = useAtomValue(inventory);
  const equipItem = useSetAtom(itemEquip);
  const unequipItem = useSetAtom(itemUnequip);

  const equippedInventoryIDs = Object.getOwnPropertySymbols(inventoryValue).filter(
    (id) => inventoryValue[id].isEquipped
  );
  const storedInventoryValueIDs = Object.getOwnPropertySymbols(inventoryValue).filter(
    (id) => !inventoryValue[id].isEquipped
  );

  const onEquipItem = (id: symbol) => () => equipItem(id);
  const onUnequipItem = (id: symbol) => () => unequipItem(id);

  return (
    <Stack gap={5}>
      <Stack className="position-sticky">
        <Encumbrance />
      </Stack>

      <Stack gap={3}>
        <h6>Equipped</h6>

        {equippedInventoryIDs.length === 0 && <span className="fst-italic">Nothing equipped.</span>}

        {equippedInventoryIDs.map((id) => {
          const { item, key } = inventoryValue[id];

          return (
            <Row key={key}>
              <Col xs={8}>
                <Stack direction="horizontal">
                  <InventoryElement item={item} />
                </Stack>
              </Col>

              <Col>
                <Button onClick={onUnequipItem(id)} variant={UIVariant.Outline}>
                  Unequip
                </Button>
              </Col>
            </Row>
          );
        })}
      </Stack>

      <Stack gap={3}>
        <h6>Stored</h6>

        {storedInventoryValueIDs.length === 0 && (
          <span className="fst-italic">Nothing stored.</span>
        )}

        {storedInventoryValueIDs.map((id) => {
          const { item, key } = inventoryValue[id];

          return (
            <Row key={key}>
              <Col xs={7}>
                <InventoryElement item={item} />
              </Col>

              {isEquipment(item) && (
                <Col>
                  <Button onClick={onEquipItem(id)} variant={UIVariant.Outline}>
                    Equip
                  </Button>
                </Col>
              )}
            </Row>
          );
        })}
      </Stack>
    </Stack>
  );
}
