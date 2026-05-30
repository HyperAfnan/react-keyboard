import { useKeyboardStore } from "../../store/keyboardStore";
import { KEYBOARD_ROWS } from "../../data/keyboardLayout";
import { KeyboardRow } from "./KeyboardRow";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useSoundEngine } from "../../hooks/useSoundEngine";

export function Keyboard() {
  const { play, release } = useSoundEngine();
  useKeyPress(play, release);

  const accent = useKeyboardStore((s) => s.accent);

  return (
    <div
      className={`style-mechanical accent-${accent}`}
      role="group"
      aria-label="On-screen mechanical keyboard"
    >
      <div className="keyboard-shell">
        <div className="keyboard-bezel">
          <div className="flex flex-col" style={{ gap: 4 }}>
            {KEYBOARD_ROWS.map((row) => (
              <KeyboardRow key={row.id} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
