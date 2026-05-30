import type { AccentColor } from "../../types/keyboard";

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
      className="color-swatch"
      onClick={onClick}
      aria-label={`Accent color ${color}`}
      aria-pressed={active}
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: COLOR_MAP[color],
        border: active ? "3px solid white" : "3px solid transparent",
        outline: active ? "2px solid rgba(255,255,255,0.3)" : undefined,
        cursor: "pointer",
        transition: "transform 150ms ease, outline 150ms ease",
        transform: active ? "scale(1.15)" : "scale(1)",
        flexShrink: 0,
      }}
    />
  );
}
