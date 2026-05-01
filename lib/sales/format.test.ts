import { describe, expect, it } from "vitest";
import { formatDate, formatVND, formatVNDCompact } from "./format";

describe("formatVND", () => {
  it("formats whole VND amounts in vi-VN locale with no decimals", () => {
    expect(formatVND(200_000_000)).toMatch(/200\.000\.000\s?₫/);
  });

  it("formats zero", () => {
    expect(formatVND(0)).toMatch(/0\s?₫/);
  });

  it("formats small amounts", () => {
    expect(formatVND(5000)).toMatch(/5\.000\s?₫/);
  });
});

describe("formatVNDCompact", () => {
  it("uses M for millions", () => {
    expect(formatVNDCompact(200_000_000)).toBe("200M ₫");
    expect(formatVNDCompact(1_500_000)).toBe("2M ₫"); // rounds
    expect(formatVNDCompact(1_000_000)).toBe("1M ₫");
  });

  it("uses B for billions", () => {
    expect(formatVNDCompact(1_000_000_000)).toBe("1B ₫");
    expect(formatVNDCompact(1_500_000_000)).toBe("1.5B ₫");
    expect(formatVNDCompact(2_000_000_000)).toBe("2B ₫");
  });

  it("uses K for thousands", () => {
    expect(formatVNDCompact(50_000)).toBe("50K ₫");
  });

  it("falls through for tiny values", () => {
    expect(formatVNDCompact(0)).toBe("0 ₫");
    expect(formatVNDCompact(500)).toBe("500 ₫");
  });
});

describe("formatDate", () => {
  it("formats an ISO date as DD MMM YYYY", () => {
    expect(formatDate("2026-04-12")).toBe("12 Apr 2026");
  });

  it("handles end-of-year dates", () => {
    expect(formatDate("2025-12-31")).toBe("31 Dec 2025");
  });
});
