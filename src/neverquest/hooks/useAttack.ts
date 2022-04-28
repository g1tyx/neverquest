import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { UIAnimationSpeed, UIAnimationType, UIFloatingTextType } from "neverquest/env";
import { weapon } from "neverquest/state/inventory";
import { deltaHealthMonster, deltaStamina } from "neverquest/state/deltas";
import { currentHealthMonster, monsterStatusElement } from "neverquest/state/monster";
import { canAttack, currentStamina } from "neverquest/state/resources";
import { totalDamage } from "neverquest/state/statistics";
import { animateElement } from "neverquest/utilities/helpers";

export default function useAttack() {
  const [currentHealthMonsterValue, setCurrentHealthMonster] = useRecoilState(currentHealthMonster);
  const setCurrentStamina = useSetRecoilState(currentStamina);
  const setDeltaHealthMonster = useSetRecoilState(deltaHealthMonster);
  const setDeltaStamina = useSetRecoilState(deltaStamina);
  const canAttackValue = useRecoilValue(canAttack);
  const monsterStatusElementValue = useRecoilValue(monsterStatusElement);
  const totalDamageValue = useRecoilValue(totalDamage);
  const { staminaCost } = useRecoilValue(weapon);

  return () => {
    if (canAttackValue) {
      let monsterHealth = currentHealthMonsterValue - totalDamageValue;

      if (monsterHealth < 0) {
        monsterHealth = 0;
      }

      setCurrentStamina((currentStamina) => currentStamina - staminaCost);
      setDeltaStamina({
        color: UIFloatingTextType.Negative,
        value: `${-staminaCost}`,
      });

      setCurrentHealthMonster(monsterHealth);
      setDeltaHealthMonster({
        color: UIFloatingTextType.Negative,
        value: `${-totalDamageValue}`,
      });

      animateElement(monsterStatusElementValue, UIAnimationType.HeadShake, UIAnimationSpeed.Fast);

      return true;
    }

    return false;
  };
}
