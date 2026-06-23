import { useCallback, useEffect } from "react";
import { Howl } from "howler";
import { useKeyboardStore } from "../store/keyboardStore";
import type { SoundPack } from "../types/keyboard";

const CODE_TO_SCAN: Record<string, string> = {
  Escape: "1",
  F1: "59",
  F2: "60",
  F3: "61",
  F4: "62",
  F5: "63",
  F6: "64",
  F7: "65",
  F8: "66",
  F9: "67",
  F10: "68",
  F11: "87",
  F12: "88",
  PrintScreen: "3639",
  ScrollLock: "70",
  Pause: "3653",

  Backquote: "41",
  Digit1: "2",
  Digit2: "3",
  Digit3: "4",
  Digit4: "5",
  Digit5: "6",
  Digit6: "7",
  Digit7: "8",
  Digit8: "9",
  Digit9: "10",
  Digit0: "11",
  Minus: "12",
  Equal: "13",
  Backspace: "14",

  Insert: "3666",
  Home: "3655",
  PageUp: "3657",

  Tab: "15",
  KeyQ: "16",
  KeyW: "17",
  KeyE: "18",
  KeyR: "19",
  KeyT: "20",
  KeyY: "21",
  KeyU: "22",
  KeyI: "23",
  KeyO: "24",
  KeyP: "25",
  BracketLeft: "26",
  BracketRight: "27",
  Backslash: "43",

  Delete: "3667",
  End: "3663",
  PageDown: "3665",

  CapsLock: "58",
  KeyA: "30",
  KeyS: "31",
  KeyD: "32",
  KeyF: "33",
  KeyG: "34",
  KeyH: "35",
  KeyJ: "36",
  KeyK: "37",
  KeyL: "38",
  Semicolon: "39",
  Quote: "40",
  Enter: "28",

  ShiftLeft: "42",
  KeyZ: "44",
  KeyX: "45",
  KeyC: "46",
  KeyV: "47",
  KeyB: "48",
  KeyN: "49",
  KeyM: "50",
  Comma: "51",
  Period: "52",
  Slash: "53",
  ShiftRight: "54",

  ArrowUp: "57416",
  ArrowLeft: "57419",
  ArrowRight: "57421",
  ArrowDown: "57424",

  ControlLeft: "29",
  MetaLeft: "3675",
  AltLeft: "56",
  Space: "57",
  AltRight: "3640",
  ContextMenu: "3677",
  ControlRight: "3613",
  MetaRight: "3676",

  NumLock: "69",
  NumpadDivide: "3637",
  NumpadMultiply: "55",
  NumpadSubtract: "74",
  Numpad7: "71",
  Numpad8: "72",
  Numpad9: "73",
  NumpadAdd: "78",
  Numpad4: "75",
  Numpad5: "76",
  Numpad6: "77",
  Numpad1: "79",
  Numpad2: "80",
  Numpad3: "81",
  Numpad0: "82",
  NumpadDecimal: "83",
  NumpadEnter: "3612",
};

const PACK_NAMES: Record<Exclude<SoundPack, "none">, string> = {
  "cherry-blue": "cherry-blue",
  "cherry-brown": "cherry-brown",
  "cherry-red": "cherry-red",
  "cherry-black": "cherry-black",
  topre: "topre",
  creams: "creams",
};

interface PackConfig {
  sound: string;
  defines: Record<string, [number, number] | null>;
}

interface PackEntry {
  howl: Howl | null;
  config: PackConfig | null;
  loading: boolean;
}

const packCache: Partial<Record<string, PackEntry>> = {};

async function ensurePack(
  pack: SoundPack,
  cdnBaseUrl: string,
): Promise<void> {
  if (pack === "none") return;

  const cacheKey = `${cdnBaseUrl}/${pack}`;
  if (packCache[cacheKey]) return;

  packCache[cacheKey] = { howl: null, config: null, loading: true };
  const folder = `${cdnBaseUrl}/${PACK_NAMES[pack]}`;

  try {
    const res = await fetch(`${folder}/config.json`);
    if (!res.ok) throw new Error(`config fetch failed: HTTP ${res.status}`);
    const config: PackConfig = await res.json();

    const sprite: Record<string, [number, number]> = {};
    for (const [key, val] of Object.entries(config.defines)) {
      if (Array.isArray(val)) sprite[`k_${key}`] = val as [number, number];
    }

    const howl = new Howl({
      src: [`${folder}/${config.sound}`],
      sprite,
      preload: true,
      html5: false,
    });

    packCache[cacheKey] = { howl, config, loading: false };
  } catch {
    packCache[cacheKey] = { howl: null, config: null, loading: false };
  }
}

function pickSprite(config: PackConfig, code: string): string | null {
  const scan = CODE_TO_SCAN[code];
  if (scan !== undefined) {
    const entry = config.defines[scan];
    if (Array.isArray(entry)) return `k_${scan}`;
  }

  const valid = Object.keys(config.defines).filter((k) =>
    Array.isArray(config.defines[k]),
  );
  if (valid.length === 0) return null;
  return `k_${valid[Math.floor(Math.random() * valid.length)]}`;
}

export function useSoundEngine() {
  const soundEnabled = useKeyboardStore((s) => s.soundEnabled);
  const soundPack = useKeyboardStore((s) => s.soundPack);
  const cdnBaseUrl = useKeyboardStore((s) => s.cdnBaseUrl);

  useEffect(() => {
    if (soundPack !== "none") {
      void ensurePack(soundPack, cdnBaseUrl);
    }
  }, [soundPack, cdnBaseUrl]);

  const play = useCallback(
    (code: string) => {
      if (!soundEnabled || soundPack === "none") return;
      const cacheKey = `${cdnBaseUrl}/${soundPack}`;
      const entry = packCache[cacheKey];
      if (!entry?.howl || !entry?.config) return;

      const sprite = pickSprite(entry.config, code);
      if (!sprite) return;

      const id = entry.howl.play(sprite);
      if (id !== undefined) {
        entry.howl.rate(0.97 + Math.random() * 0.06, id);
        entry.howl.volume(0.85, id);
      }
    },
    [soundEnabled, soundPack, cdnBaseUrl],
  );

  const release = useCallback(
    (code: string) => {
      if (!soundEnabled || soundPack === "none") return;
      const cacheKey = `${cdnBaseUrl}/${soundPack}`;
      const entry = packCache[cacheKey];
      if (!entry?.howl || !entry?.config) return;

      const sprite = pickSprite(entry.config, code);
      if (!sprite) return;

      const id = entry.howl.play(sprite);
      if (id !== undefined) {
        entry.howl.rate(1.08 + Math.random() * 0.06, id);
        entry.howl.volume(0.28, id);
      }
    },
    [soundEnabled, soundPack, cdnBaseUrl],
  );

  return { play, release };
}
