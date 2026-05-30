import React from "react";
import type { KeyDef } from "../../types/keyboard";
import { useKeyboardStore } from "../../store/keyboardStore";
import { useSoundEngine } from "../../hooks/useSoundEngine";

interface KeyProps {
  keyDef: KeyDef;
}

function KeyComponent({ keyDef }: KeyProps) {
  const isPressed = useKeyboardStore((s) => s.activeKeys.has(keyDef.code));
  const pressKey = useKeyboardStore((s) => s.pressKey);
  const releaseKey = useKeyboardStore((s) => s.releaseKey);
  const { play, release } = useSoundEngine();

  const variantClass =
    keyDef.variant === "alpha"
      ? "key-alpha"
      : keyDef.variant === "accent"
        ? "key-accent"
        : "key-modifier";

  const classes = ["key-base", variantClass, isPressed ? "key-pressed" : ""]
    .filter(Boolean)
    .join(" ");

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    pressKey(keyDef.code);
    play(keyDef.code);
  };

  const handlePressEnd = () => {
    releaseKey(keyDef.code);
    release(keyDef.code);
  };

  const handleLeave = () => {
    releaseKey(keyDef.code);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.repeat) return;
    e.preventDefault();
    pressKey(keyDef.code);
    play(keyDef.code);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    releaseKey(keyDef.code);
    release(keyDef.code);
  };

  return (
    <div
      id={keyDef.id}
      className={classes}
      style={{
        width: keyDef.width,
        height: keyDef.height ?? 44,
        marginLeft: keyDef.marginLeft,
      }}
      role="button"
      tabIndex={0}
      aria-label={keyDef.label || keyDef.id}
      aria-pressed={isPressed}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handleLeave}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handleLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {keyDef.centerLabel ? (
        <div
          className="key-label-center"
          style={{ fontSize: getLabelSize(keyDef) }}
        >
          {keyDef.label}
        </div>
      ) : (
        <div className="key-label">
          <span className="key-label-sub">{keyDef.subLabel}</span>
          <span className="key-label-main">{keyDef.label}</span>
        </div>
      )}
    </div>
  );
}

function getLabelSize(key: KeyDef): string {
  const len = key.label.length;
  if (len <= 1) return "13px";
  if (len <= 2) return "10px";
  if (len <= 4) return "9px";
  if (len <= 7) return "8px";
  return "7px";
}

export const Key = React.memo(KeyComponent);
