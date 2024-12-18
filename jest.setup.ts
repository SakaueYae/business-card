import "@testing-library/jest-dom";

require("dotenv").config();

Object.defineProperty(global, "structuredClone", {
  writable: true,
  value: (val: unknown) => val && JSON.parse(JSON.stringify(val)),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
