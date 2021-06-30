import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import Monster from "components/Monster";
import { activeMonster, progress } from "state/atoms";
import { progressMax } from "state/selectors";

export default function Wilderness() {
  const [activeMonsterId, setActiveMonster] = useRecoilState(activeMonster);
  const progressMaxValue = useRecoilValue(progressMax);
  const progressValue = useRecoilValue(progress);
  const monsterQueue = useRef(
    new Array(progressMaxValue).fill({
      id: uuidv4(),
      Component: Monster,
    })
  );
  const monster = monsterQueue.current[progressValue] || {};

  useEffect(() => {
    if (activeMonsterId === null && monster.id) {
      setActiveMonster(monster.id);
    }
  }, [activeMonsterId, monster.id, setActiveMonster]);

  return monster.id ? (
    <div className="mb-3">
      <monster.Component id={monster.id} />
    </div>
  ) : null;
}
