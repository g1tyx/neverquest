import { useEffect, useRef, useState } from "react";
import { type SetterOrUpdater, useRecoilValue } from "recoil";
import { clearInterval, setInterval } from "worker-timers";

import { FRAMERATE } from "@neverquest/data/general";
import { isGameOver } from "@neverquest/state/character";

export function useAnimate({
  delta,
  factor = 1,
  onDelta,
  stop,
}: {
  delta: SetterOrUpdater<number>;
  factor?: number;
  onDelta?: () => void;
  stop: boolean;
}) {
  const isGameOverValue = useRecoilValue(isGameOver);

  const interval = useRef(-1);
  const previousTime = useRef(0);

  const [hasTicked, setHasTicked] = useState(false);

  const clear = () => {
    if (interval.current !== -1) {
      clearInterval(interval.current);

      interval.current = -1;
      previousTime.current = 0;
    }
  };

  useEffect(() => {
    if (hasTicked) {
      if (onDelta !== undefined) {
        onDelta();
      }

      setHasTicked(false);
    }
  }, [hasTicked, onDelta]);

  useEffect(() => {
    if (isGameOverValue || stop) {
      clear();
    } else if (interval.current === -1) {
      interval.current = setInterval(() => {
        const now = Date.now();

        delta((current) => {
          const newDelta = current - (now - (previousTime.current || now)) * factor;

          if (newDelta <= 0) {
            setHasTicked(true);

            return 0;
          }

          return newDelta;
        });

        previousTime.current = now;
      }, FRAMERATE);
    }

    return clear;
  }, [delta, factor, isGameOverValue, stop]);
}
