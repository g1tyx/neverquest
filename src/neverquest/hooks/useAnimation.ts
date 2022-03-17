import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { gameOver } from "neverquest/state/global";

export default function useAnimation(callback: (time: number) => void, stop: boolean) {
  const gameOverValue = useRecoilValue(gameOver);
  const frameRef = useRef(-1);
  const previousTimeRef = useRef(-1);

  const animate = useCallback(
    (time: number) => {
      callback(time - (previousTimeRef.current || time));
      previousTimeRef.current = time;
      frameRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    if (gameOverValue || stop) {
      cancelAnimationFrame(frameRef.current);
      previousTimeRef.current = -1;
    } else {
      frameRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [animate, gameOverValue, stop]);
}