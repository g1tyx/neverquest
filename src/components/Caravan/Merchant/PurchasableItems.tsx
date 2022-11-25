import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import BuyItemButton from "@neverquest/components/Caravan/Merchant/BuyItemButton";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import Coins from "@neverquest/components/Resource/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { merchantInventory } from "@neverquest/state/caravan";

export default function ({ inventoryIDs }: { inventoryIDs: string[] }) {
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  return (
    <>
      {inventoryIDs.map((id) => {
        const { key, possession } = merchantInventoryValue[id];
        const { price } = possession;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={key}>
            <InventoryElement possession={possession} />

            <Stack direction="horizontal" gap={3}>
              <Coins tooltip="Price (coins)" value={price} />

              <BuyItemButton id={id} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}
