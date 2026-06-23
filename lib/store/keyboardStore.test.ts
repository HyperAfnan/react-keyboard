import { beforeEach, describe, expect, it } from "vitest";
import { createKeyboardStore } from "./keyboardStore";

describe("keyboardStore activeKeys", () => {
  let store: ReturnType<typeof createKeyboardStore>;

  beforeEach(() => {
    store = createKeyboardStore();
  });

  it("does not emit updates when pressing an already active key", () => {
    let updates = 0;
    const unsubscribe = store.subscribe(() => {
      updates += 1;
    });

    store.getState().pressKey("KeyA");
    store.getState().pressKey("KeyA");

    unsubscribe();

    expect(store.getState().activeKeys.has("KeyA")).toBe(true);
    expect(updates).toBe(1);
  });

  it("does not emit updates when releasing an inactive key", () => {
    let updates = 0;
    const unsubscribe = store.subscribe(() => {
      updates += 1;
    });

    store.getState().releaseKey("KeyA");

    unsubscribe();

    expect(updates).toBe(0);
  });

  it("creates isolated store instances", () => {
    const store2 = createKeyboardStore({ accent: "blue" });

    expect(store.getState().accent).toBe("red");
    expect(store2.getState().accent).toBe("blue");

    store.getState().pressKey("KeyA");

    expect(store.getState().activeKeys.has("KeyA")).toBe(true);
    expect(store2.getState().activeKeys.has("KeyA")).toBe(false);
  });
});
