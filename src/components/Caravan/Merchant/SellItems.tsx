import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SellItem } from "@neverquest/components/Caravan/Merchant/SellItem";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { inventory } from "@neverquest/state/inventory";
import {
  isArmor,
  isConsumable,
  isGear,
  isShard,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { stackItems } from "@neverquest/utilities/helpers";

export function SellItems() {
  const inventoryValue = useRecoilValue(inventory);

  const equippedGear = [
    ...inventoryValue.filter((current) => isGear(current) && current.isEquipped),
  ];
  const storedItems = inventoryValue.filter(
    (current) => !isGear(current) || (isGear(current) && !current.isEquipped),
  );

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {inventoryValue.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {[equippedGear.find(isWeapon), equippedGear.find(isArmor), equippedGear.find(isShield)]
            .filter(isGear)
            .map((item) => {
              const { id, isEquipped } = item;

              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                  <Stack direction="horizontal">
                    <ItemDisplay item={item} overlayPlacement="right" />

                    {isEquipped && (
                      <span className="fst-italic" style={{ width: "max-content" }}>
                        &nbsp;(Equipped)
                      </span>
                    )}
                  </Stack>

                  <SellItem item={item} showConfirmation={isEquipped} />
                </div>
              );
            })}

          {storedItems
            .filter(isGear)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.id}>
                <ItemDisplay item={item} overlayPlacement="right" />

                <SellItem item={item} />
              </div>
            ))}

          {[...storedItems.filter(isTrinket)]
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((item) => (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.id}>
                <ItemDisplay item={item} overlayPlacement="right" />

                <SellItem item={item} />
              </div>
            ))}

          {[
            ...stackItems(
              storedItems.filter(isConsumable).sort((a, b) => a.type.localeCompare(b.type)),
            ),
            ...stackItems(storedItems.filter(isShard).sort((a, b) => a.type.localeCompare(b.type))),
          ].map((stackedItem) => {
            const { item, stack } = stackedItem;

            return (
              <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.id}>
                <ItemDisplay item={item} overlayPlacement="right" stack={stack} />

                <SellItem item={item} />
              </div>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
