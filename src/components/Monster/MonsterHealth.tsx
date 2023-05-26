import { Stack } from "react-bootstrap";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { Delta, Reserve } from "@neverquest/types/enums";

export function MonsterHealth() {
  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <ReserveMeter type={Reserve.MonsterHealth} />

          <FloatingText type={Delta.HealthMonster} />
        </Stack>
      }
      Icon={IconHealth}
      tooltip="Monster health"
    />
  );
}
