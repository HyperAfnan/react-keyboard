import { useKeyboardStore } from "../../store/keyboardStore";
import { KEYBOARD_ROWS } from "../../data/keyboardLayout";
import { KeyboardRow } from "./KeyboardRow";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useSoundEngine } from "../../hooks/useSoundEngine";
import { cn } from "../../lib/utils";

export function Keyboard() {
  const { play, release } = useSoundEngine();
  useKeyPress(play, release);

  const accent = useKeyboardStore((s) => s.accent);

  return (
    <div
      className={cn(`style-mechanical accent-${accent}`)}
      role="group"
      aria-label="On-screen mechanical keyboard"
    >
      <div className="inline-block select-none rounded-[10px] bg-[#1a1a1c] px-3.5 pb-4 pt-3 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_0_2px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="w-[776px] rounded-md bg-[#111113] px-2 pb-2.5 pt-2 shadow-[inset_0_4px_10px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col gap-1">
            {KEYBOARD_ROWS.map((row) => (
              <KeyboardRow key={row.id} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
