import { Button, ButtonGroup, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { AmmunitionPouchCapacity } from "@neverquest/components/Items/Usable/AmmunitionPouchCapacity";
import { AMMUNITION_PRICE } from "@neverquest/data/caravan";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { inventory } from "@neverquest/state/inventory";
import { ownedItem } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import type { AmmunitionPouchItem } from "@neverquest/types";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_MAXIMUM,
  LABEL_NO_ESSENCE,
} from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function PurchaseAmmunition() {
  const essenceValue = useRecoilValue(essence);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const setInventory = useSetRecoilState(inventory);

  const transactEssence = useTransactEssence();

  const handlePurchase = (amount: number) => {
    if (isAffordable(amount) && ownedAmmunitionPouch !== null) {
      transactEssence(-AMMUNITION_PRICE * amount);
      setInventory((currentInventory) =>
        currentInventory.map((currentItem) =>
          currentItem.id === ownedAmmunitionPouch.id
            ? {
                ...currentItem,
                current: (currentItem as AmmunitionPouchItem).current + amount,
              }
            : currentItem,
        ),
      );
    }
  };
  const isAffordable = (amount: number) => AMMUNITION_PRICE * amount <= essenceValue;

  return (
    <Stack gap={3}>
      <h6>Purchase ammunition</h6>

      {ownedAmmunitionPouch !== null && <AmmunitionPouchCapacity />}

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay contents="Ammunition (each)" Icon={IconAmmunition} tooltip="Ammunition" />

        <Stack direction="horizontal" gap={3}>
          <IconDisplay
            contents={formatValue({ value: AMMUNITION_PRICE })}
            Icon={IconEssence}
            tooltip="Price"
          />

          {ownedAmmunitionPouch === null ? (
            <span className="fst-italic">Nowhere to store ammunition.</span>
          ) : (
            (() => {
              const { current, maximum } = ownedAmmunitionPouch as AmmunitionPouchItem;

              return (
                <ButtonGroup>
                  {[
                    { amount: 1, label: "1" },
                    { amount: 10, label: "10" },
                    { amount: maximum - current, label: LABEL_MAXIMUM },
                  ].map(({ amount, label }) => {
                    const canPurchase = isAffordable(amount);

                    return (
                      <OverlayTrigger
                        key={label}
                        overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
                        trigger={canPurchase ? [] : ["hover", "focus"]}
                      >
                        <span>
                          <Button
                            disabled={!canPurchase}
                            onClick={() => handlePurchase(amount)}
                            variant="outline-dark"
                          >
                            {label}
                          </Button>
                        </span>
                      </OverlayTrigger>
                    );
                  })}
                </ButtonGroup>
              );
            })()
          )}
        </Stack>
      </div>
    </Stack>
  );
}