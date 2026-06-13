import { cn } from "../../lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  label: string;
}

export function Toggle({ checked, onChange, id, label }: ToggleProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center gap-3 text-[#a0a0b0]"
    >
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          "relative h-[22px] w-10 shrink-0 cursor-pointer rounded-full border-none transition-colors duration-200",
          checked ? "bg-[var(--accent)]" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "absolute top-[3px] block h-4 w-4 rounded-full bg-white transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
            checked ? "left-[21px]" : "left-[3px]"
          )}
        />
      </button>
      <span className="text-[13px] font-medium">{label}</span>
    </label>
  );
}

