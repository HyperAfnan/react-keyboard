import { memo, type MouseEvent, type TouchEvent, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import type { KeyDef } from "../../types/keyboard";
import { useKeyboardStore } from "../../store/keyboardStore";
import { useSoundEngine } from "../../hooks/useSoundEngine";
import { cn } from "../../lib/utils";

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

  const classes = cn(
    "relative flex h-[44px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] border-none bg-transparent p-0 [transform-origin:center_bottom] [-webkit-tap-highlight-color:transparent] select-none",
    variantClass,
    isPressed && "key-pressed"
  );

  const handlePressStart = (e: MouseEvent | TouchEvent) => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.repeat) return;
    e.preventDefault();
    pressKey(keyDef.code);
    play(keyDef.code);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    releaseKey(keyDef.code);
    release(keyDef.code);
  };

  return (
    <motion.div
      id={keyDef.id}
      className={classes}
      style={{
        width: keyDef.width,
        height: keyDef.height ?? 44,
        marginLeft: keyDef.marginLeft,
      }}
      animate={{
        y: isPressed ? 6 : 0,
        scale: isPressed ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 25,
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
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-semibold tracking-[0.01em] lowercase"
          style={{ fontSize: getLabelSize(keyDef) }}
        >
          {keyDef.label}
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-between px-[5px] py-1">
          <span className="text-[7px] font-semibold leading-none tracking-[0.01em] opacity-60 font-sans">{keyDef.subLabel}</span>
          <span className="text-[10px] font-bold leading-none tracking-[-0.01em]">{keyDef.label}</span>
        </div>
      )}
    </motion.div>
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

export const Key = memo(KeyComponent);
