import { create } from "zustand";
import type { AccentColor, SoundPack } from "../types/keyboard";

interface KeyboardState {
  activeKeys: Set<string>;
  pressKey: (code: string) => void;
  releaseKey: (code: string) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  soundEnabled: boolean;
  soundPack: SoundPack;
  toggleSound: () => void;
  setSoundPack: (pack: SoundPack) => void;
  settingsOpen: boolean;
  toggleSettings: () => void;
  closeSettings: () => void;
}

export const useKeyboardStore = create<KeyboardState>((set) => ({
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

  accent: "red",
  setAccent: (accent) => set({ accent }),
  soundEnabled: true,
  soundPack: "cherry-blue" as const,
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  setSoundPack: (soundPack) => set({ soundPack }),
  settingsOpen: false,
  toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
  closeSettings: () => set({ settingsOpen: false }),
}));
