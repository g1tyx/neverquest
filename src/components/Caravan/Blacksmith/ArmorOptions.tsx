import { useState } from "react";
import { FormControl, FormSelect, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { CraftedGear } from "@neverquest/components/Caravan/Blacksmith/CraftedGear";
import { CraftGear } from "@neverquest/components/Caravan/Blacksmith/CraftGear";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DodgePenaltyContents } from "@neverquest/components/Items/Armor/DodgePenaltyContents";
import { GEAR_LEVEL_MAXIMUM, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/caravan";
import { ARMOR_SPECIFICATIONS } from "@neverquest/data/inventory";
import { ReactComponent as IconDeflection } from "@neverquest/icons/deflection.svg";
import { ReactComponent as IconDodgePenalty } from "@neverquest/icons/dodge-penalty.svg";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReactComponent as IconGearLevel } from "@neverquest/icons/gear-level.svg";
import { ReactComponent as IconArmorProtection } from "@neverquest/icons/protection.svg";
import { ReactComponent as IconUnknown } from "@neverquest/icons/unknown.svg";
import { ARMOR_CLASS_TYPES, type ArmorClass } from "@neverquest/LOCRAN/types";
import { blacksmithInventory } from "@neverquest/state/caravan";
import { stage } from "@neverquest/state/encounter";
import { isShowing } from "@neverquest/state/isShowing";
import { allowNSFW } from "@neverquest/state/settings";
import { skills } from "@neverquest/state/skills";
import { LABEL_UNKNOWN } from "@neverquest/utilities/constants";
import { capitalizeAll, formatPercentage } from "@neverquest/utilities/formatters";
import { generateArmor } from "@neverquest/utilities/generators";
import { getArmorRanges, getGearPrices, getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ArmorOptions() {
  const allowNSFWValue = useRecoilValue(allowNSFW);
  const { armor: craftedArmor } = useRecoilValue(blacksmithInventory);
  const isShowingDeflection = useRecoilValue(isShowing("deflection"));
  const isShowingDodge = useRecoilValue(isShowing("dodge"));
  const skillArmorcraft = useRecoilValue(skills("armorcraft"));
  const stageValue = useRecoilValue(stage);

  const [armorClass, setArmorClass] = useState<ArmorClass>("hide");
  const [armorLevel, setArmorLevel] = useState(stageValue);

  const { Icon } = ARMOR_SPECIFICATIONS[armorClass];
  const factor = getGrowthSigmoid(armorLevel);
  const { deflection, protection, staminaCost, weight } = getArmorRanges({
    factor,
    gearClass: armorClass,
  });
  const { coinPrice, scrapPrice } = getGearPrices({
    factor,
    ...ARMOR_SPECIFICATIONS[armorClass],
  });
  const maximumArmorLevel = Math.min(stageValue + GEAR_LEVEL_RANGE_MAXIMUM, GEAR_LEVEL_MAXIMUM);

  const craftArmor = () =>
    generateArmor({
      allowNSFW: allowNSFWValue,
      gearClass: armorClass,
      hasPrefix: true,
      hasSuffix: Math.random() <= getGrowthSigmoid(armorLevel),
      level: armorLevel,
      tags:
        armorLevel < stageValue - 1
          ? ["lowQuality"]
          : armorLevel > maximumArmorLevel
          ? ["highQuality"]
          : undefined,
    });

  return (
    <>
      <Stack className="mx-auto" gap={3}>
        <IconDisplay
          contents={
            <FormControl
              max={maximumArmorLevel}
              min={1}
              onChange={({ target: { value } }) => {
                if (!value) {
                  return;
                }

                const parsedValue = Number.parseInt(value);

                if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximumArmorLevel) {
                  return;
                }

                setArmorLevel(parsedValue);
              }}
              type="number"
              value={armorLevel}
            />
          }
          Icon={IconGearLevel}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Level"
        />

        <IconDisplay
          contents={
            <FormSelect
              onChange={({ target: { value } }) => setArmorClass(value as ArmorClass)}
              value={armorClass}
            >
              {ARMOR_CLASS_TYPES.map((armorClass) => (
                <option key={armorClass} value={armorClass}>
                  {capitalizeAll(armorClass)}
                </option>
              ))}
            </FormSelect>
          }
          Icon={Icon}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Class"
        />

        <IconDisplay
          contents={`${protection.minimum}-${protection.maximum}`}
          Icon={IconArmorProtection}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Protection"
        />

        {deflection !== null && (
          <IconDisplay
            contents={
              isShowingDeflection
                ? `${formatPercentage(deflection.minimum)}-${formatPercentage(deflection.maximum)}`
                : LABEL_UNKNOWN
            }
            Icon={isShowingDeflection ? IconDeflection : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={isShowingDeflection ? "Deflection chance" : LABEL_UNKNOWN}
          />
        )}

        {staminaCost !== 0 && (
          <IconDisplay
            contents={
              isShowingDodge ? <DodgePenaltyContents staminaCost={staminaCost} /> : LABEL_UNKNOWN
            }
            Icon={isShowingDodge ? IconDodgePenalty : IconUnknown}
            iconProps={{ overlayPlacement: "left" }}
            tooltip={isShowingDodge ? "Dodge penalty" : LABEL_UNKNOWN}
          />
        )}

        <IconDisplay
          contents={`${weight.minimum}-${weight.maximum}`}
          Icon={IconEncumbrance}
          iconProps={{ overlayPlacement: "left" }}
          tooltip="Weight"
        />
      </Stack>

      <hr />

      {!skillArmorcraft && armorClass === "plate" ? (
        <span className="text-center">Cannot use without training.</span>
      ) : craftedArmor === null ? (
        <CraftGear coinPrice={coinPrice} onCraft={craftArmor} scrapPrice={scrapPrice} />
      ) : (
        <CraftedGear gearItem={craftedArmor} />
      )}
    </>
  );
}
