import { useEffect, useMemo } from "react";
import type { AccentColor, SoundPack } from "../types/keyboard";
import {
  createKeyboardStore,
  KeyboardStoreContext,
} from "../store/keyboardStore";
import { KeyboardLayout } from "./KeyboardLayout";
import { cn } from "../utils";

export interface KeyboardProps {
  variant?: "keychron-c3";
  accent?: AccentColor;
  soundPack?: SoundPack;
  soundEnabled?: boolean;
  className?: string;
}

export function Keyboard({
  variant: _variant = "keychron-c3",
  accent = "red",
  soundPack = "cherry-blue",
  soundEnabled = true,
  className,
}: KeyboardProps) {
  const store = useMemo(
    () =>
      createKeyboardStore({
        accent,
        soundPack,
        soundEnabled,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    store.setState({ accent });
  }, [store, accent]);

  useEffect(() => {
    store.setState({ soundPack });
  }, [store, soundPack]);

  useEffect(() => {
    store.setState({ soundEnabled });
  }, [store, soundEnabled]);

  return (
    <KeyboardStoreContext.Provider value={store}>
      <div className={cn("mechboard-root", className)}>
        <KeyboardLayout />
      </div>
    </KeyboardStoreContext.Provider>
  );
}
