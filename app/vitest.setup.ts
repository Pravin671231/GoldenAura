import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement IntersectionObserver/ResizeObserver — embla-carousel
// (and any future viewport-measuring library) needs these to initialize.
if (typeof window !== "undefined" && !window.IntersectionObserver) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect() {}
    observe() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    unobserve() {}
  }
  window.IntersectionObserver = MockIntersectionObserver;
}

if (typeof window !== "undefined" && !window.ResizeObserver) {
  class MockResizeObserver implements ResizeObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  }
  window.ResizeObserver = MockResizeObserver;
}

// jsdom doesn't implement matchMedia — embla-carousel (and any future
// breakpoint-aware library) needs this to initialize under test.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
