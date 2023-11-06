import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { inventory } from "@neverquest/state/inventory";
import { isStaminaAtMaximum, stamina, staminaMaximumBlighted } from "@neverquest/state/reserves";

export function Elixir({ ID }: { ID: string }) {
  const isStaminaAtMaximumValue = useRecoilValue(isStaminaAtMaximum);
  const staminaValue = useRecoilValue(stamina);
  const staminaMaximumBlightedValue = useRecoilValue(staminaMaximumBlighted);
  const setInventory = useSetRecoilState(inventory);

  const changeStamina = useChangeStamina();

  const recover = () => {
    const staminaDifference = staminaMaximumBlightedValue - staminaValue;

    changeStamina({
      delta: [
        {
          color: "text-muted",
          value: "RECOVER",
        },
        {
          color: "text-success",
          value: `+${staminaDifference}`,
        },
      ],
      value: staminaDifference,
    });

    setInventory((current) => current.filter((current) => current.ID !== ID));
  };

  return (
    <OverlayTrigger
      overlay={<Tooltip>Already at full stamina</Tooltip>}
      trigger={isStaminaAtMaximumValue ? ["hover", "focus"] : []}
    >
      <span>
        <Button disabled={isStaminaAtMaximumValue} onClick={recover} variant="outline-dark">
          Drink
        </Button>
      </span>
    </OverlayTrigger>
  );
}
