import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { Coins } from "@neverquest/components/Resources/Coins";
import { ENCUMBRANCE } from "@neverquest/constants";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { encumbranceMaximum, hasKnapsack } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandInventory() {
  const coinsValue = useRecoilValue(coins);
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const [encumbranceMaximumValue, setEncumbranceMaximum] = useRecoilState(encumbranceMaximum);

  const transactResources = useTransactResources();

  const price = Math.round(
    250 * getGrowthSigmoid((encumbranceMaximumValue - (ENCUMBRANCE - 1)) * 10)
  );
  const isAffordable = price <= coinsValue;
  const canExpand = isAffordable && hasKnapsackValue;

  const handleExpansion = () => {
    transactResources({ coinsDifference: price });
    setEncumbranceMaximum((current) => current + 1);
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <Coins tooltip="Price (coins)" value={price} />

      <OverlayTrigger
        overlay={
          <Tooltip>
            {!canExpand && <div>Knapsack required!</div>}
            {!isAffordable && <div>Not enough coins!</div>}
          </Tooltip>
        }
        placement="top"
        trigger={canExpand ? [] : ["hover", "focus"]}
      >
        <span className="d-inline-block">
          <Button disabled={!canExpand} onClick={handleExpansion} variant={UIVariant.Outline}>
            Expand
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
