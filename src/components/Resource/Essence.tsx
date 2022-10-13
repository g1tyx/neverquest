import IconDisplay from "@neverquest/components/IconDisplay";
import { ReactComponent as Icon } from "@neverquest/icons/incense.svg";
import { LootProps } from "@neverquest/types/props";

export default function ({ tooltip, value }: LootProps) {
  return <IconDisplay contents={value} Icon={Icon} tooltip={tooltip || "Essence"} />;
}
