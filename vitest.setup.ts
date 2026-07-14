import '@testing-library/jest-dom/vitest';

// jsdom 不实现 Clipboard API，注入空 clipboard 供测试通过 Object.defineProperty 覆盖。
if (typeof navigator !== 'undefined' && !navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: () => Promise.resolve() },
    configurable: true,
    writable: true,
  });
}
