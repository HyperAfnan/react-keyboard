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
      className="flex items-center gap-3 cursor-pointer select-none"
      style={{ color: "#a0a0b0" }}
    >
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          background: checked ? "var(--accent)" : "rgba(255,255,255,0.1)",
          border: "none",
          cursor: "pointer",
          position: "relative",
          transition: "background 200ms ease",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: checked ? 21 : 3,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            display: "block",
          }}
        />
      </button>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
    </label>
  );
}
