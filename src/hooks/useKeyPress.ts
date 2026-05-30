import { useEffect } from "react";
import { useKeyboardStore } from "../store/keyboardStore";

export function useKeyPress(
  play: (code: string) => void,
  release: (code: string) => void,
) {
  const pressKey = useKeyboardStore((s) => s.pressKey);
  const releaseKey = useKeyboardStore((s) => s.releaseKey);

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.ctrlKey || e.metaKey) return;
      if (e.code.startsWith("F") && e.code.length <= 3) return;

      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
          e.code,
        )
      ) {
        e.preventDefault();
      }

      pressKey(e.code);
      play(e.code);
    };

    const handleUp = (e: KeyboardEvent) => {
      releaseKey(e.code);
      release(e.code);
    };

    const releaseAll = () => {
      useKeyboardStore.getState().activeKeys.forEach((code) => {
        useKeyboardStore.getState().releaseKey(code);
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
  }, [pressKey, releaseKey, play, release]);
}
