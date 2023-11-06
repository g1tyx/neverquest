import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { equippableItems, inventory } from "@neverquest/state/inventory";
import { isGear } from "@neverquest/types/type-guards";

export function StoredGear() {
  const equippableItemsValue = useRecoilValue(equippableItems);
  const inventoryValue = useRecoilValue(inventory);

  const toggleEquipGear = useToggleEquipGear();

  return inventoryValue
    .filter(isGear)
    .filter((current) => !current.isEquipped)
    .toSorted((current1, current2) => current1.name.localeCompare(current2.name))
    .map((current) => {
      const { ID } = current;
      const canEquipGear = equippableItemsValue[ID];

      return (
        <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={ID}>
          <ItemDisplay item={current} overlayPlacement="right" />

          <OverlayTrigger
            overlay={<Tooltip>Skill required.</Tooltip>}
            trigger={canEquipGear ? [] : ["hover", "focus"]}
          >
            <span>
              <Button
                disabled={!canEquipGear}
                onClick={() => toggleEquipGear(current)}
                variant="outline-dark"
              >
                Equip
              </Button>
            </span>
          </OverlayTrigger>
        </div>
      );
    });
}
