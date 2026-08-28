import { describe, it, expect } from "vitest";
import { formatDate } from "./date";

describe("formatDate", () => {
  it.each([
    ["2026-01-15", "2026-01-15"],
    ["2025-12-24", "2025-12-24"],
    ["", "-"],
    [undefined, "-"],
    [null, "-"],
    ["not-a-date", "-"],
  ])("formats %s as %s", (input, expected) => {
    expect(formatDate(input)).toBe(expected);
  });
});
