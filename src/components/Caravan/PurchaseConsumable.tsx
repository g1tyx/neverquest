import { nanoid } from "nanoid";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { CONSUMABLES } from "@neverquest/data/inventory";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { canFit } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import type { ConsumableItem } from "@neverquest/types";
import type { Consumable } from "@neverquest/types/unions";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function PurchaseConsumable({ type }: { type: Consumable }) {
  const coinsValue = useRecoilValue(coins);

  const acquireItem = useAcquireItem();
  const transactResources = useTransactResources();

  const { item } = CONSUMABLES[type];
  const itemWithID: ConsumableItem = {
    ...item,
    id: nanoid(),
  };
  const { coinPrice, weight } = itemWithID;

  const canFitValue = useRecoilValue(canFit(weight));
  const isAffordable = coinPrice <= coinsValue;
  const isPurchasable = canFitValue && isAffordable;

  const handlePurchase = () => {
    if (acquireItem(itemWithID)) {
      transactResources({ coinsDifference: -coinPrice });
    }
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <ItemDisplay item={itemWithID} overlayPlacement="right" />

      <Stack direction="horizontal" gap={3}>
        <ResourceDisplay tooltip="Price (coins)" type="coins" value={coinPrice} />

        <OverlayTrigger
          overlay={
            <Tooltip>
              {!isAffordable && <div>Not enough coins!</div>}
              {!canFitValue && <div>Over-encumbered!</div>}
            </Tooltip>
          }
          trigger={isPurchasable ? [] : ["hover", "focus"]}
        >
          <span>
            <Button disabled={!isPurchasable} onClick={handlePurchase} variant="outline-dark">
              Purchase
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
