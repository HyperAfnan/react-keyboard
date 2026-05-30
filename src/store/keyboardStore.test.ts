import { beforeEach, describe, expect, it } from "vitest";
import { useKeyboardStore } from "./keyboardStore";

describe("keyboardStore activeKeys", () => {
  beforeEach(() => {
    useKeyboardStore.setState({ activeKeys: new Set() });
  });

  it("does not emit updates when pressing an already active key", () => {
    let updates = 0;
    const unsubscribe = useKeyboardStore.subscribe(() => {
      updates += 1;
    });

    useKeyboardStore.getState().pressKey("KeyA");
    useKeyboardStore.getState().pressKey("KeyA");

    unsubscribe();

    expect(useKeyboardStore.getState().activeKeys.has("KeyA")).toBe(true);
    expect(updates).toBe(1);
  });

  it("does not emit updates when releasing an inactive key", () => {
    let updates = 0;
    const unsubscribe = useKeyboardStore.subscribe(() => {
      updates += 1;
    });

    useKeyboardStore.getState().releaseKey("KeyA");

    unsubscribe();

    expect(updates).toBe(0);
  });
});
