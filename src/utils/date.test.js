import { describe, it, expect } from "vitest";
import { formatDate } from "./date";

describe("Formatting dates tests", () => {
  it.each([
    ["2026-01-15", "2026-01-15"],
    ["2025-12-24", "2025-12-24"],
    ["", "-"],
    [undefined, "-"],
    [null, "-"],
    ["not-a-date", "-"],
  ])("formats %s correctly as '%s'", (input, expected) => {
    const date = input; //arrange
    const result = formatDate(date); //act

    expect(result).toBe(expected);
  });
});
