import { useKeyboardStore } from "../store/keyboardStore";
import { KEYBOARD_ROWS, APPLE_KEYBOARD_ROWS } from "../data/keyboardLayout";
import { KeyboardRow } from "./KeyboardRow";
import { useKeyPress } from "../hooks/useKeyPress";
import { useSoundEngine } from "../hooks/useSoundEngine";
import { cn } from "../utils";

export function KeyboardLayout() {
  const { play, release } = useSoundEngine();
  useKeyPress(play, release);

  const accent = useKeyboardStore((s) => s.accent);
  const variant = useKeyboardStore((s) => s.variant);

  const isApple = variant === "apple-magic";
  const rows = isApple ? APPLE_KEYBOARD_ROWS : KEYBOARD_ROWS;

  return (
    <div
      className={cn(isApple ? "style-magic" : "style-mechanical", `accent-${accent}`)}
      role="group"
      aria-label={isApple ? "On-screen Apple Magic Keyboard" : "On-screen mechanical keyboard"}
    >
      {isApple ? (
        <div className="inline-block select-none rounded-[18px] bg-[#2a2a2c] px-[18px] pt-[12px] pb-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_0_1.5px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div>
            <div className="flex flex-col gap-[4px]">
              {rows.map((row) => (
                <KeyboardRow key={row.id} row={row} isApple={isApple} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="inline-block select-none rounded-[10px] bg-[#1a1a1c] px-3.5 pb-4 pt-3 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_0_2px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="w-[792px] rounded-md bg-[#0f0f11] px-2 pb-2.5 pt-2 shadow-[inset_0_4px_10px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col gap-[5px]">
              {rows.map((row) => (
                <KeyboardRow key={row.id} row={row} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
