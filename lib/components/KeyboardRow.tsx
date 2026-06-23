import { memo }  from "react";
import type { KeyRow } from "../types/keyboard";
import { Key } from "./Key";

interface KeyboardRowProps {
  row: KeyRow;
}

export const KeyboardRow = memo(function KeyboardRow({
  row,
}: KeyboardRowProps) {
  return (
    <div
      className="flex flex-row gap-1"
      style={{ marginLeft: row.offsetLeft ?? 0 }}
      role="group"
      aria-label={`Keyboard row ${row.id}`}
    >
      {row.keys.map((key) => (
        <Key key={key.id} keyDef={key} />
      ))}
    </div>
  );
});
