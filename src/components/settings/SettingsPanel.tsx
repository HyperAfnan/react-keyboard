import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKeyboardStore } from "../../store/keyboardStore";
import { ColorSwatch } from "../ui/ColorSwatch";
import { Toggle } from "../ui/Toggle";
import type { AccentColor, SoundPack } from "../../types/keyboard";
import { cn } from "../../lib/utils";

const ACCENT_COLORS: AccentColor[] = [
  "teal",
  "pink",
  "orange",
  "purple",
  "blue",
  "red",
];

const SOUND_PACKS: { value: SoundPack; label: string; desc: string }[] = [
  { value: "cherry-blue", label: "Cherry MX Blue", desc: "Clicky, tactile" },
  { value: "cherry-brown", label: "Cherry MX Brown", desc: "Tactile, quiet" },
  { value: "cherry-red", label: "Cherry MX Red", desc: "Linear, smooth" },
  { value: "cherry-black", label: "Cherry MX Black", desc: "Linear, heavy" },
  { value: "topre", label: "Topre", desc: "Thocky, premium" },
  { value: "creams", label: "NK Creams", desc: "Linear, buttery" },
  { value: "none", label: "Silent", desc: "No sound" },
];

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 mb-2.5">
      {children}
    </div>
  );
}

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

export function SettingsPanel() {
  const settingsOpen = useKeyboardStore((s) => s.settingsOpen);
  const closeSettings = useKeyboardStore((s) => s.closeSettings);

  const accent = useKeyboardStore((s) => s.accent);
  const setAccent = useKeyboardStore((s) => s.setAccent);

  const soundEnabled = useKeyboardStore((s) => s.soundEnabled);
  const toggleSound = useKeyboardStore((s) => s.toggleSound);

  const soundPack = useKeyboardStore((s) => s.soundPack);
  const setSoundPack = useKeyboardStore((s) => s.setSoundPack);

  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const focusables = getFocusableElements(drawer);
      const target = focusables[0] ?? drawer;
      target.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSettings();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = getFocusableElements(drawer);
      if (focusables.length === 0) {
        event.preventDefault();
        drawer.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active || !drawer.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(focusFirst);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [settingsOpen, closeSettings]);

  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="settings-backdrop"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeSettings}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="settings-drawer"
            ref={drawerRef}
            className={cn(
              "fixed top-0 right-0 z-50 flex h-screen w-[280px] flex-col overflow-y-auto bg-[#1c1c20] px-5 py-6 shadow-[-8px_0_32px_rgba(0,0,0,0.5)] border-l border-white/5 outline-none"
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between mb-7">
              <h2
                id="settings-title"
                className="m-0 text-base font-bold text-white"
              >
                Settings
              </h2>
              <button
                type="button"
                onClick={closeSettings}
                aria-label="Close settings"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-none bg-white/10 text-lg text-white/70 transition-colors duration-150 hover:bg-white/[0.14] hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mb-7">
              <SectionTitle>Accent Color</SectionTitle>
              <div className="flex flex-row flex-wrap gap-2">
                {ACCENT_COLORS.map((c) => (
                  <ColorSwatch
                    key={c}
                    color={c}
                    active={accent === c}
                    onClick={() => setAccent(c)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-7 h-px bg-white/5" />

            <div className="mb-7">
              <SectionTitle>Sound</SectionTitle>
              <div className="mb-4">
                <Toggle
                  id="sound-toggle"
                  checked={soundEnabled}
                  onChange={toggleSound}
                  label="Enable sound"
                />
              </div>

              <div
                className={cn(
                  "flex flex-col gap-1.5 transition-opacity duration-200",
                  !soundEnabled && "opacity-[0.35]"
                )}
              >
                {SOUND_PACKS.map((pack) => {
                  const isActive = soundPack === pack.value;
                  return (
                    <button
                      key={pack.value}
                      type="button"
                      onClick={() => {
                        if (soundEnabled) setSoundPack(pack.value);
                      }}
                      aria-pressed={isActive}
                      disabled={!soundEnabled}
                      className={cn(
                        "flex flex-col gap-0.5 rounded-lg border-[1.5px] px-3.5 py-2.5 text-left transition-all duration-150",
                        soundEnabled ? "cursor-pointer" : "cursor-default",
                        isActive
                          ? "border-[var(--accent)] bg-white/5 text-white"
                          : "border-white/5 bg-transparent text-white/40 hover:bg-white/[0.02]"
                      )}
                    >
                      <span className="text-[12px] font-semibold">
                        {pack.label}
                      </span>
                      <span className="text-[10px] opacity-60">{pack.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto border-t border-white/5 pt-5 text-center text-[11px] text-white/20">
              Mechanical Keyboard v1.0
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
