import type { AccentColor } from "../../types/keyboard";
import { cn } from "../../lib/utils";

interface ColorSwatchProps {
  color: AccentColor;
  active: boolean;
  onClick: () => void;
}

const COLOR_MAP: Record<AccentColor, string> = {
  teal: "hsl(174, 72%, 45%)",
  pink: "hsl(330, 80%, 60%)",
  orange: "hsl(25, 90%, 55%)",
  purple: "hsl(265, 75%, 58%)",
  blue: "hsl(210, 85%, 55%)",
  red: "hsl(0, 80%, 55%)",
};

export function ColorSwatch({ color, active, onClick }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Accent color ${color}`}
      aria-pressed={active}
      className={cn(
        "h-7 w-7 shrink-0 cursor-pointer rounded-full border-[3px] transition-[transform,outline] duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        active
          ? "scale-115 border-white outline-2 outline-white/30"
          : "scale-100 border-transparent outline-none"
      )}
      style={{
        background: COLOR_MAP[color],
      }}
    />
  );
}

