import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { canFit } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import type { Item } from "@neverquest/types";

export function PurchaseItemButton({
  handlePurchase,
  item,
}: {
  handlePurchase: () => void;
  item: Item;
}) {
  const coinsValue = useRecoilValue(coins);

  const { coinPrice, weight } = item;
  const isAffordable = coinPrice <= coinsValue;
  const canFitValue = useRecoilValue(canFit(weight));
  const isPurchasable = isAffordable && canFitValue;

  return (
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
          Buy
        </Button>
      </span>
    </OverlayTrigger>
  );
}