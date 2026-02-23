import '@testing-library/jest-dom';

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

// @ts-expect-error - mock for ResizeObserver
global.ResizeObserver = ResizeObserverMock;
