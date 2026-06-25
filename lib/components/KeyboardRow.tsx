import { memo } from "react";
import type { KeyRow, KeyDef } from "../types/keyboard";
import { Key } from "./Key";
import { cn } from "../utils";

interface KeyboardRowProps {
  row: KeyRow;
  isApple?: boolean;
}

export const KeyboardRow = memo(function KeyboardRow({
  row,
  isApple,
}: KeyboardRowProps) {
  const keysToRender: Array<{
    type: "single" | "stacked";
    key?: KeyDef;
    up?: KeyDef;
    down?: KeyDef;
  }> = [];

  for (let i = 0; i < row.keys.length; i++) {
    const key = row.keys[i];
    if (isApple && key.code === "ArrowUp") {
      const nextKey = row.keys[i + 1];
      if (nextKey && nextKey.code === "ArrowDown") {
        keysToRender.push({
          type: "stacked",
          up: key,
          down: nextKey,
        });
        i++; // Skip the next key since we stacked it
        continue;
      }
    }
    keysToRender.push({
      type: "single",
      key: key,
    });
  }

  return (
    <div
      className={cn("flex flex-row", isApple ? "gap-[4px]" : "gap-[5px]")}
      style={{ marginLeft: row.offsetLeft ?? 0 }}
      role="group"
      aria-label={`Keyboard row ${row.id}`}
    >
      {keysToRender.map((item, index) => {
        if (item.type === "stacked" && item.up && item.down) {
          return (
            <div key={`stacked-${index}`} className="flex flex-col gap-[4px]">
              <Key keyDef={item.up} />
              <Key keyDef={item.down} />
            </div>
          );
        }
        if (item.type === "single" && item.key) {
          return <Key key={item.key.id} keyDef={item.key} />;
        }
        return null;
      })}
    </div>
  );
});
