import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { useAtom, useAtomValue } from "jotai";

import InventoryElement from "neverquest/components/Inventory/InventoryElement";
import Coins from "neverquest/components/Loot/Coins";
import useAcquireItem from "neverquest/hooks/useAcquireItem";
import useReserve from "neverquest/hooks/useReserve";
import useCheckEncumbrance from "neverquest/hooks/useCheckEncumbrance";
import { merchantInventory } from "neverquest/state/caravan";
import { coins } from "neverquest/state/loot";
import { InventoryContentProps } from "neverquest/types/props";
import { UIVariant } from "neverquest/types/ui";

export default function BuyItems() {
  const acquireItem = useAcquireItem();
  const checkEncumbrance = useCheckEncumbrance();
  const setReserve = useReserve();
  const [merchantInventoryValue, setMerchantInventory] = useAtom(merchantInventory);
  const coinsValue = useAtomValue(coins);

  const inventoryEntries = Object.entries(merchantInventoryValue);

  const buyItem =
    ({ item, key }: InventoryContentProps) =>
    () => {
      const itemReceived = acquireItem({ item });

      if (itemReceived) {
        setReserve({ coinsDifference: -item.price });
        setMerchantInventory((current) => {
          const newMerchantInventory = { ...current };

          delete newMerchantInventory[key];

          return newMerchantInventory;
        });
      }
    };

  return (
    <Stack gap={3}>
      <h6>Buy items</h6>

      <Stack gap={3}>
        {inventoryEntries.length === 0 ? (
          <span className="fst-italic">Nothing available.</span>
        ) : (
          inventoryEntries.map(([key, { item }]) => {
            const { price, weight } = item;
            const isAffordable = price <= coinsValue;
            const isFitting = checkEncumbrance({ weight });
            const isPurchasable = isAffordable && isFitting;

            return (
              <Row key={key}>
                <Col xs={8}>
                  <InventoryElement item={item} />
                </Col>

                <Col>
                  <Coins tooltip="Price (coins)" value={price} />
                </Col>

                <Col>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        {!isAffordable && <div>Not enough coins!</div>}
                        {!isFitting && <div>Over-encumbered!</div>}
                      </Tooltip>
                    }
                    placement="top"
                    trigger={isPurchasable ? [] : ["hover", "focus"]}
                  >
                    <span className="d-inline-block">
                      <Button
                        disabled={!isPurchasable}
                        onClick={buyItem({ item, key })}
                        variant={UIVariant.Outline}
                      >
                        Buy
                      </Button>
                    </span>
                  </OverlayTrigger>
                </Col>
              </Row>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}
