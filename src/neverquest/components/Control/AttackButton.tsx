import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue, useRecoilState } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import { UIVariant } from "neverquest/env.d";
import attackIcon from "neverquest/icons/tron-arrow.svg";
import restingIcon from "neverquest/icons/tired-eye.svg";
import retreatIcon from "neverquest/icons/return-arrow.svg";
import { isAttacking } from "neverquest/state/character";
import { isLevelCompleted } from "neverquest/state/global";
import { showLevelProgress } from "neverquest/state/show";

export default function AttackButton() {
  const [isAttackingValue, setAttacking] = useRecoilState(isAttacking);
  const [showLevelProgressValue, setShowLevelProgressValue] = useRecoilState(showLevelProgress);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  useEffect(() => {
    if (isAttackingValue && isLevelCompletedValue) {
      setAttacking(false);
    }
  }, [isAttackingValue, isLevelCompletedValue, setAttacking]);

  const { icon, tooltip } = (() => {
    if (isLevelCompletedValue) {
      return { icon: restingIcon, tooltip: "Resting" };
    }

    if (isAttackingValue) {
      return { icon: retreatIcon, tooltip: "Retreat" };
    }

    return { icon: attackIcon, tooltip: "Attack" };
  })();

  const onEngage = () => {
    setAttacking((currentAttack) => !currentAttack);

    if (!showLevelProgressValue) {
      setShowLevelProgressValue(true);
    }
  };

  return (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} placement="top">
      <span className="d-inline-block">
        <Button disabled={isLevelCompletedValue} onClick={onEngage} variant={UIVariant.Outline}>
          <ImageIcon icon={icon} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}
