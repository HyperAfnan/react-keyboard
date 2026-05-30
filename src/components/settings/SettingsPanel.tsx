import { useKeyboardStore } from "../../store/keyboardStore";
import { ColorSwatch } from "../ui/ColorSwatch";
import { Toggle } from "../ui/Toggle";
import type { AccentColor, SoundPack } from "../../types/keyboard";

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)",
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

import React from "react";

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

  const drawerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
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
    <>
      <div
        className={`settings-overlay ${settingsOpen ? "open" : ""}`}
        onClick={closeSettings}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        className={`settings-drawer ${settingsOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        aria-hidden={!settingsOpen}
        tabIndex={-1}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 28 }}
        >
          <h2
            id="settings-title"
            style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fff" }}
          >
            Settings
          </h2>
          <button
            type="button"
            onClick={closeSettings}
            aria-label="Close settings"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "#aaa",
              width: 32,
              height: 32,
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.14)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Accent Color</SectionTitle>
          <div className="flex flex-row flex-wrap" style={{ gap: 8 }}>
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

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.07)",
            marginBottom: 28,
          }}
        />

        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Sound</SectionTitle>
          <div style={{ marginBottom: 16 }}>
            <Toggle
              id="sound-toggle"
              checked={soundEnabled}
              onChange={toggleSound}
              label="Enable sound"
            />
          </div>

          <div
            className="flex flex-col"
            style={{
              gap: 6,
              opacity: soundEnabled ? 1 : 0.35,
              transition: "opacity 200ms ease",
            }}
          >
            {SOUND_PACKS.map((pack) => (
              <button
                key={pack.value}
                onClick={() => {
                  if (soundEnabled) setSoundPack(pack.value);
                }}
                aria-pressed={soundPack === pack.value}
                disabled={!soundEnabled}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border:
                    soundPack === pack.value
                      ? "1.5px solid var(--accent)"
                      : "1.5px solid rgba(255,255,255,0.08)",
                  background:
                    soundPack === pack.value
                      ? "rgba(255,255,255,0.06)"
                      : "transparent",
                  color:
                    soundPack === pack.value
                      ? "#fff"
                      : "rgba(255,255,255,0.45)",
                  cursor: soundEnabled ? "pointer" : "default",
                  textAlign: "left",
                  transition: "all 150ms ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600 }}>
                  {pack.label}
                </span>
                <span style={{ fontSize: 10, opacity: 0.6 }}>{pack.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            fontSize: 11,
            color: "rgba(255,255,255,0.2)",
            textAlign: "center",
          }}
        >
          Mechanical Keyboard v1.0
        </div>
      </aside>
    </>
  );
}
