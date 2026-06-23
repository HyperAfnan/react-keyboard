import { createContext, useContext } from "react";
import { createStore, type StoreApi } from "zustand";
import { useStore } from "zustand";
import type { AccentColor, SoundPack } from "../types/keyboard";

const CDN_BASE_URL =
  "https://pub-b47bf94ace5f4c9cb4afcab2016e8c8a.r2.dev/sounds";

export interface KeyboardState {
  activeKeys: Set<string>;
  pressKey: (code: string) => void;
  releaseKey: (code: string) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  soundEnabled: boolean;
  soundPack: SoundPack;
  toggleSound: () => void;
  setSoundPack: (pack: SoundPack) => void;
  cdnBaseUrl: string;
}

export function createKeyboardStore(
  initialState?: Partial<
    Pick<KeyboardState, "accent" | "soundPack" | "soundEnabled">
  >,
) {
  return createStore<KeyboardState>((set) => ({
    activeKeys: new Set<string>(),
    pressKey: (code) =>
      set((s) => {
        if (s.activeKeys.has(code)) return s;
        const next = new Set(s.activeKeys);
        next.add(code);
        return { activeKeys: next };
      }),
    releaseKey: (code) =>
      set((s) => {
        if (!s.activeKeys.has(code)) return s;
        const next = new Set(s.activeKeys);
        next.delete(code);
        return { activeKeys: next };
      }),

    accent: initialState?.accent ?? "red",
    setAccent: (accent) => set({ accent }),
    soundEnabled: initialState?.soundEnabled ?? true,
    soundPack: initialState?.soundPack ?? ("cherry-blue" as const),
    toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
    setSoundPack: (soundPack) => set({ soundPack }),
    cdnBaseUrl: CDN_BASE_URL,
  }));
}

export const KeyboardStoreContext =
  createContext<StoreApi<KeyboardState> | null>(null);

export function useKeyboardStore<T>(selector: (s: KeyboardState) => T): T {
  const store = useContext(KeyboardStoreContext);
  if (!store) {
    throw new Error(
      "useKeyboardStore must be used within a <Keyboard /> component.",
    );
  }
  return useStore(store, selector);
}

export function useKeyboardStoreApi(): StoreApi<KeyboardState> {
  const store = useContext(KeyboardStoreContext);
  if (!store) {
    throw new Error(
      "useKeyboardStoreApi must be used within a <Keyboard /> component.",
    );
  }
  return store;
}
