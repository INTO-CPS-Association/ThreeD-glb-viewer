/// <reference lib="dom" />

import { describe, it, expect } from "bun:test";
import pickHandler from "../src/picker";

describe("Test picker", () => {
  it("Return pickEventHandler", async () => {
    const handler = pickHandler();

    expect(handler).toBeTypeOf("function");
    expect(handler.createPickerListener).toBeTypeOf("function");
  });
});
