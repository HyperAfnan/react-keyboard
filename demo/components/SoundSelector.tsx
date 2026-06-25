import type { SoundPack } from "../../lib/main";
import { cn } from "../../lib/utils";

const SoundWaveIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="10" width="2.5" height="4" rx="1" />
    <rect x="8" y="6" width="2.5" height="12" rx="1" />
    <rect x="13" y="3" width="2.5" height="18" rx="1" />
    <rect x="18" y="8" width="2.5" height="8" rx="1" />
  </svg>
);

const SOUND_PACKS = [
  {
    value: "cherry-blue",
    label: "Cherry MX Blue",
    iconColor: "text-blue-500",
    activeClass: "border-blue-500/80 bg-blue-500/5 text-white shadow-[0_0_12px_rgba(59,130,246,0.25)]"
  },
  {
    value: "cherry-brown",
    label: "Cherry MX Brown",
    iconColor: "text-amber-500",
    activeClass: "border-amber-500/80 bg-amber-500/5 text-white shadow-[0_0_12px_rgba(245,158,11,0.25)]"
  },
  {
    value: "cherry-red",
    label: "Cherry MX Red",
    iconColor: "text-rose-500",
    activeClass: "border-rose-500/80 bg-rose-500/5 text-white shadow-[0_0_12px_rgba(244,63,94,0.25)]"
  },
  {
    value: "cherry-black",
    label: "Cherry MX Black",
    iconColor: "text-neutral-400",
    activeClass: "border-neutral-400/80 bg-neutral-400/5 text-white shadow-[0_0_12px_rgba(163,163,163,0.25)]"
  },
  {
    value: "topre",
    label: "Topre",
    iconColor: "text-emerald-400",
    activeClass: "border-emerald-400/80 bg-emerald-400/5 text-white shadow-[0_0_12px_rgba(52,211,153,0.25)]"
  },
  {
    value: "creams",
    label: "NovelKeys Creams",
    iconColor: "text-purple-500",
    activeClass: "border-purple-500/80 bg-purple-500/5 text-white shadow-[0_0_12px_rgba(168,85,247,0.25)]"
  },
  {
    value: "none",
    label: "Silent",
    iconColor: "text-zinc-500",
    activeClass: "border-zinc-500/80 bg-zinc-500/5 text-white shadow-[0_0_12px_rgba(161,161,170,0.25)]"
  },
] as const;

interface SoundSelectorProps {
  soundPack: SoundPack;
  onChange: (pack: SoundPack) => void;
}

export function SoundSelector({ soundPack, onChange }: SoundSelectorProps) {
  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-3xl">
      <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-2.5 sm:gap-3 w-full">
        {SOUND_PACKS.map((pack) => {
          const isActive = soundPack === pack.value;
          return (
            <button
              key={pack.value}
              onClick={() => onChange(pack.value)}
              className={cn(
                "flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none active:scale-[0.98] w-full sm:w-auto",
                isActive
                  ? pack.activeClass
                  : "border-zinc-800 bg-zinc-900/10 hover:border-zinc-700 hover:bg-zinc-900/30 text-zinc-400 hover:text-zinc-300"
              )}
            >
              <SoundWaveIcon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0", pack.iconColor)} />
              <span>{pack.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
