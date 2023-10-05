import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { TAILORING_EXPANSION, TAILORING_PRICES_MAXIMUM } from "@neverquest/data/caravan";
import { ENCUMBRANCE } from "@neverquest/data/inventory";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";
import { encumbranceMaximum, hasKnapsack } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_NO_ESSENCE } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandKnapsack() {
  const essenceValue = useRecoilValue(essence);
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const [encumbranceMaximumValue, setEncumbranceMaximum] = useRecoilState(encumbranceMaximum);

  const transactEssence = useTransactEssence();

  const price = Math.ceil(
    TAILORING_PRICES_MAXIMUM.knapsack *
      getGrowthSigmoid(encumbranceMaximumValue - (ENCUMBRANCE - 1)),
  );
  const isAffordable = price <= essenceValue;
  const canExpand = isAffordable && hasKnapsackValue;

  const handleExpansion = () => {
    transactEssence(-price);
    setEncumbranceMaximum((current) => current + TAILORING_EXPANSION.knapsack);
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents="Add pockets"
        description={`Increases maximum encumbrance by ${TAILORING_EXPANSION.knapsack}.`}
        Icon={IconTailoring}
        tooltip="Tailoring"
      />

      <Stack direction="horizontal" gap={3}>
        <IconDisplay contents={formatValue({ value: price })} Icon={IconEssence} tooltip="Price" />

        <OverlayTrigger
          overlay={
            <Tooltip>
              {!hasKnapsackValue && <div>Knapsack required.</div>}

              {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}
            </Tooltip>
          }
          trigger={canExpand ? [] : ["hover", "focus"]}
        >
          <span>
            <Button disabled={!canExpand} onClick={handleExpansion} variant="outline-dark">
              Expand
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}