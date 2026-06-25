import { memo, type MouseEvent, type TouchEvent, type KeyboardEvent } from "react";
import type { KeyDef } from "../types/keyboard";
import { useKeyboardStore } from "../store/keyboardStore";
import { useSoundEngine } from "../hooks/useSoundEngine";
import { cn } from "../utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconLayoutGrid,
  IconGlobe,
  IconSearch,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipBack,
  IconPlayerPlay,
  IconPlayerSkipForward,
  IconVolumeOff,
  IconVolume2,
  IconVolume,
  IconLock,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconChevronDown
} from "@tabler/icons-react";

interface KeyProps {
  keyDef: KeyDef;
}

const TABLER_ICONS: Record<string, React.ComponentType<{ className?: string; stroke?: number }>> = {
  "brightness-down": IconBrightnessDown,
  "brightness-up": IconBrightnessUp,
  "apps": IconLayoutGrid,
  "globe": IconGlobe,
  "search": IconSearch,
  "microphone": IconMicrophone,
  "moon": IconMoon,
  "skip-back": IconPlayerSkipBack,
  "play-pause": IconPlayerPlay,
  "skip-forward": IconPlayerSkipForward,
  "volume-mute": IconVolumeOff,
  "volume-down": IconVolume2,
  "volume-up": IconVolume,
  "lock": IconLock,
};

function KeyComponent({ keyDef }: KeyProps) {
  const variant = useKeyboardStore((s) => s.variant);
  const isApple = variant === "apple-magic";
  const activeKeys = useKeyboardStore((s) => s.activeKeys);

  const isPressed = (() => {
    const isShiftPressed = activeKeys.has("ShiftLeft") || activeKeys.has("ShiftRight");
    const isMetaPressed = activeKeys.has("MetaLeft") || activeKeys.has("MetaRight");

    if (isShiftPressed && isMetaPressed) {
      if (keyDef.code.startsWith("Shift")) {
        return false;
      }
      if (keyDef.code === "MetaRight") {
        return true;
      }
      if (keyDef.code === "MetaLeft") {
        return false;
      }
    }
    return activeKeys.has(keyDef.code);
  })();

  const pressKey = useKeyboardStore((s) => s.pressKey);
  const releaseKey = useKeyboardStore((s) => s.releaseKey);
  const { play, release } = useSoundEngine();

  let appleCornerClass = "";
  if (isApple) {
    if (keyDef.code === "Escape") {
      appleCornerClass = "!rounded-tl-[10px]";
    } else if (keyDef.code === "F13") {
      appleCornerClass = "!rounded-tr-[10px]";
    } else if (keyDef.code === "Fn") {
      appleCornerClass = "!rounded-bl-[10px]";
    } else if (keyDef.code === "ArrowRight") {
      appleCornerClass = "!rounded-br-[10px]";
    }
  }

  const variantClass =
    keyDef.variant === "alpha"
      ? "key-alpha"
      : keyDef.variant === "accent"
        ? "key-accent"
        : "key-modifier";

  const classes = cn(
    "relative flex h-[44px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] border-none p-0 [transform-origin:center_bottom] [-webkit-tap-highlight-color:transparent] select-none",
    variantClass,
    isPressed && "key-pressed",
    appleCornerClass
  );

  const handlePressStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (activeKeys.has(keyDef.code)) return;
    pressKey(keyDef.code);
    play(keyDef.code);
  };

  const handlePressEnd = () => {
    if (!activeKeys.has(keyDef.code)) return;
    releaseKey(keyDef.code);
    release(keyDef.code);
  };

  const handleLeave = () => {
    if (!activeKeys.has(keyDef.code)) return;
    releaseKey(keyDef.code);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.repeat) return;
    e.preventDefault();
    if (activeKeys.has(keyDef.code)) return;
    pressKey(keyDef.code);
    play(keyDef.code);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (!activeKeys.has(keyDef.code)) return;
    releaseKey(keyDef.code);
    release(keyDef.code);
  };

  const isArrow = keyDef.code.startsWith("Arrow");
  const isHalfHeightArrow = isApple && (keyDef.code === "ArrowUp" || keyDef.code === "ArrowDown");

  const appleFontClass = isApple
    ? cn(
      "font-['-apple-system,BlinkMacSystemFont,\"SF_Pro_Text\",\"Segoe_UI\",Roboto,Helvetica,Arial,sans-serif'] font-normal tracking-[-0.01em]",
      keyDef.variant === "alpha" ? "text-[9.5px] uppercase" : "text-[8px] opacity-85"
    )
    : "";

  const renderKeyContent = () => {
    if (isApple && isArrow) {
      let ArrowIcon = null;
      if (keyDef.code === "ArrowLeft") {
        ArrowIcon = IconChevronLeft;
      } else if (keyDef.code === "ArrowRight") {
        ArrowIcon = IconChevronRight;
      } else if (keyDef.code === "ArrowUp") {
        ArrowIcon = IconChevronUp;
      } else if (keyDef.code === "ArrowDown") {
        ArrowIcon = IconChevronDown;
      }

      if (ArrowIcon) {
        return (
          <div className={cn("pointer-events-none absolute inset-0 flex items-center justify-center text-current opacity-95", appleFontClass)}>
            <ArrowIcon
              className={isHalfHeightArrow ? "w-2 h-2" : "w-2.5 h-2.5"}
              stroke={isHalfHeightArrow ? 3 : 2.5}
            />
          </div>
        );
      }
    }

    if (isApple && (keyDef.code === "F13" || keyDef.label === "lock")) {
      return (
        <div className={cn("pointer-events-none absolute inset-0 flex items-center justify-center text-current opacity-95", appleFontClass)}>
          <IconLock className="w-[10px] h-[10px]" stroke={2.5} />
        </div>
      );
    }

    const iconName = keyDef.subLabel;
    if (isApple && iconName && TABLER_ICONS[iconName]) {
      const IconComp = TABLER_ICONS[iconName];
      return (
        <div className={cn("pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-1 px-1.5", appleFontClass)}>
          <div className="flex-1 flex items-center justify-center text-current opacity-95">
            <IconComp className="w-[10px] h-[10px]" stroke={2.5} />
          </div>
          <span className="text-[6.5px] font-medium leading-none tracking-[-0.01em] opacity-40 font-sans self-start">
            {keyDef.label}
          </span>
        </div>
      );
    }

    if (isApple && keyDef.symbol) {
      return (
        <div className={cn("pointer-events-none absolute inset-0 flex flex-col items-start justify-between px-[5px] py-[5px]", appleFontClass)}>
          <span className="text-[9.5px] font-light leading-none tracking-[-0.01em] opacity-90">
            {keyDef.symbol}
          </span>
          <span className="text-[6.5px] font-normal leading-none tracking-[-0.01em] opacity-80">
            {keyDef.label}
          </span>
        </div>
      );
    }

    if (isApple && keyDef.code === "CapsLock") {
      return (
        <div className={cn("pointer-events-none absolute inset-0 flex items-center justify-center tracking-[0.01em]", appleFontClass)}>
          <span
            className="absolute left-[6px] top-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full"
            style={{
              backgroundColor: isPressed ? '#34c759' : 'rgba(255,255,255,0.12)',
              boxShadow: isPressed ? '0 0 4px rgba(52,199,89,0.6)' : 'none',
              transition: 'background-color 0.15s, box-shadow 0.15s',
            }}
          />
          {keyDef.label}
        </div>
      );
    }

    if (keyDef.centerLabel) {
      return (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center tracking-[0.01em]",
            isApple ? appleFontClass : "font-semibold lowercase"
          )}
          style={isApple ? undefined : { fontSize: getLabelSize(keyDef) }}
        >
          {keyDef.label}
        </div>
      );
    }

    return (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-between px-[5px] py-1">
        <span className="text-[7px] font-semibold leading-none tracking-[0.01em] opacity-60 font-sans">{keyDef.subLabel}</span>
        <span className="text-[10px] font-bold leading-none tracking-[-0.01em]">{keyDef.label}</span>
      </div>
    );
  };

  return (
    <div
      id={keyDef.id}
      className={classes}
      style={{
        width: keyDef.width,
        height: keyDef.height ?? (isApple ? (isHalfHeightArrow ? 16.5 : 38) : 44),
        marginLeft: keyDef.marginLeft,
        transform: isPressed
          ? (isApple ? "translateY(1px) scale(0.99)" : "translateY(6px) scale(0.98)")
          : "none",
        transition: "transform 0.08s cubic-bezier(0.2, 0, 0, 1)",
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
      {renderKeyContent()}
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

export const Key = memo(KeyComponent);
