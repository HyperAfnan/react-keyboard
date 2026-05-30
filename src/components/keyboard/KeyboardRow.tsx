import React from "react";
import type { KeyRow } from "../../types/keyboard";
import { Key } from "./Key";

interface KeyboardRowProps {
  row: KeyRow;
}

export const KeyboardRow = React.memo(function KeyboardRow({
  row,
}: KeyboardRowProps) {
  return (
    <div
      className="flex flex-row"
      style={{ gap: 4, marginLeft: row.offsetLeft ?? 0 }}
      role="group"
      aria-label={`Keyboard row ${row.id}`}
    >
      {row.keys.map((key) => (
        <Key key={key.id} keyDef={key} />
      ))}
    </div>
  );
});
