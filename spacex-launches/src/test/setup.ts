import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

// Mock для window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // устаревшее
    removeListener: vi.fn(), // устаревшее
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

expect.extend(matchers);
