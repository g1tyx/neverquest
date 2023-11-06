import { Button, Stack } from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useMerchantTradeItem } from "@neverquest/hooks/actions/useMerchantTradeItem";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { inventory } from "@neverquest/state/inventory";
import type { InventoryItem } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItem({ item }: { item: InventoryItem }) {
  const setInventory = useSetRecoilState(inventory);

  const merchantTradeItem = useMerchantTradeItem();
  const transactEssence = useTransactEssence();

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <IconDisplay Icon={IconEssence} tooltip="Value">
          {formatNumber({ value: getSellPrice(item) })}
        </IconDisplay>

        <Button
          onClick={() => {
            transactEssence(getSellPrice(item));
            merchantTradeItem(item, "sale");

            setInventory((current) => current.filter((current) => current.ID !== item.ID));
          }}
          variant="outline-dark"
        >
          Sell
        </Button>
      </Stack>
    </>
  );
}
