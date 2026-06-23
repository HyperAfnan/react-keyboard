import { useState } from "react";
import { Keyboard } from "../lib/main";
import type { AccentColor, SoundPack } from "../lib/main";
import { SettingsPanel } from "./SettingsPanel";
import { cn } from "../lib/utils";

function App() {
  const [accent, setAccent] = useState<AccentColor>("red");
  const [soundPack, setSoundPack] = useState<SoundPack>("cherry-blue");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => setSettingsOpen((o) => !o);
  const closeSettings = () => setSettingsOpen(false);
  const toggleSound = () => setSoundEnabled((e) => !e);

  return (
    <div
      className={cn(
        `accent-${accent}`,
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-5",
        "bg-[radial-gradient(ellipse_at_50%_30%,_#1a1a22_0%,_#0a0a0c_70%)]"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[20%] h-[200px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[80px]"
      />

      <div className="mb-8 flex w-full max-w-[900px] items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-[22px] leading-none">⌨</span>
          <div>
            <div className="text-base font-bold tracking-tight text-white">MechBoard</div>
            <div className="text-[11px] font-normal text-white/35">On-screen mechanical keyboard</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            title={soundEnabled ? "Mute sound" : "Enable sound"}
            className={cn(
              "flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-white/10 bg-white/5 text-base transition-all duration-150 hover:bg-white/10 hover:text-white",
              soundEnabled ? "text-white" : "text-white/30"
            )}
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>

          <button
            onClick={toggleSettings}
            aria-label="Open settings"
            aria-expanded={settingsOpen}
            className={cn(
              "flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-white/10 text-base transition-all duration-150 hover:bg-white/10 hover:text-white",
              settingsOpen ? "bg-white/10 text-white" : "bg-white/5 text-white/60"
            )}
          >
            ⚙
          </button>
        </div>
      </div>

      <div className="flex w-full max-w-[900px] justify-center overflow-x-auto">
        <Keyboard
          accent={accent}
          soundPack={soundPack}
          soundEnabled={soundEnabled}
        />
      </div>

      <div className="mt-6 text-center text-[12px] tracking-wide text-white/20">
        Type on your physical keyboard — or click the keys above
      </div>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={closeSettings}
        accent={accent}
        onAccentChange={setAccent}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        soundPack={soundPack}
        onSoundPackChange={setSoundPack}
      />
    </div>
  );
}

export default App;
