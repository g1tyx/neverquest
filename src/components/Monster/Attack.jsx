import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import useAnimation from "hooks/useAnimation";
import attackIcon from "icons/tron-arrow.svg";
import { attacking, level } from "state/atoms";
import { defend } from "state/selectors";
import formatCountdown from "utilities/formatCountdown";
import getDamage from "utilities/getDamage";

export default function MonsterAttack({ damagePerHit }) {
  const isAttacking = useRecoilValue(attacking);
  const levelValue = useRecoilValue(level);
  const setDefend = useSetRecoilState(defend);
  const [canAttack, setCanAttack] = useState(true);
  const [deltaAttack, setDeltaAttack] = useState(0);
  // Need this in case character stops attacking due to 0 stamina.
  const [isEngaged, setEngaged] = useState(false);

  const attackSpeedValue = 3010 - 10 * levelValue;

  useAnimation((deltaTime) => {
    if (deltaAttack >= attackSpeedValue) {
      setDefend(getDamage(damagePerHit));
      setDeltaAttack(0);
    } else {
      setDeltaAttack(deltaAttack + deltaTime);
    }
  }, !canAttack || !isEngaged);

  useEffect(() => {
    if (isAttacking && !isEngaged) {
      setEngaged(true);
    }
  }, [isAttacking, isEngaged]);

  useEffect(() => () => setCanAttack(false), []);

  return (
    <WithIcon icon={attackIcon} alt="Monster attack rate">
      <div style={{ width: "100%" }}>
        <Progress
          label={formatCountdown(attackSpeedValue - deltaAttack)}
          value={(deltaAttack / attackSpeedValue) * 100}
          variant="info"
        />
      </div>
    </WithIcon>
  );
}
