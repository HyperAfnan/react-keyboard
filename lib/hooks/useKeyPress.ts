import { useEffect } from "react";
import { useKeyboardStore, useKeyboardStoreApi } from "../store/keyboardStore";

export function useKeyPress(
  play: (code: string) => void,
  release: (code: string) => void,
) {
  const pressKey = useKeyboardStore((s) => s.pressKey);
  const releaseKey = useKeyboardStore((s) => s.releaseKey);
  const storeApi = useKeyboardStoreApi();

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      e.preventDefault();
      pressKey(e.code);
      play(e.code);
    };

    const handleUp = (e: KeyboardEvent) => {
      releaseKey(e.code);
      release(e.code);
    };

    const releaseAll = () => {
      storeApi.getState().activeKeys.forEach((code) => {
        storeApi.getState().releaseKey(code);
      });
    };

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    window.addEventListener("blur", releaseAll);
    document.addEventListener("visibilitychange", releaseAll);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
      window.removeEventListener("blur", releaseAll);
      document.removeEventListener("visibilitychange", releaseAll);
    };
  }, [pressKey, releaseKey, play, release, storeApi]);
}
