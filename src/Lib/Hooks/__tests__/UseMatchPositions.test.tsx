import React from 'react';
import { renderHook, act } from '@testing-library/react';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMatchPositions } from '../UseMatchPositions';
import { PlayOffContext } from '../../Provider/PlayOffContext';
import type { PlayOffContextType } from '../../Provider/PlayOffContext';

let resizeCallback: ResizeObserverCallback;
const observe = vi.fn();
const disconnect = vi.fn();
class MockResizeObserver {
    constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback;
    }
    observe = observe;
    unobserve = vi.fn();
    disconnect = disconnect;
}
vi.stubGlobal('ResizeObserver', MockResizeObserver);


const mockContextBase: Partial<PlayOffContextType> = {
    contentRef: { current: document.createElement('div') },
    matchRefs: { current: {} },
};

const wrapper = ({ children, context }: { children: React.ReactNode; context: PlayOffContextType }) => (
    <PlayOffContext.Provider value={context}>{children}</PlayOffContext.Provider>
);

describe('useMatchPositions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize and observe content/match elements', () => {
        const content = document.createElement('div');
        const match1 = document.createElement('div');
        const matchRefs = { '1': match1 };

        const context = {
            ...mockContextBase,
            contentRef: { current: content },
            matchRefs: { current: matchRefs },
        } as PlayOffContextType;

        renderHook(() => useMatchPositions(), {
            wrapper: ({ children }) => wrapper({ children, context }),
        });

        expect(observe).toHaveBeenCalledWith(content);
        expect(observe).toHaveBeenCalledWith(match1);
    });

    it('should disconnect observer on unmount', () => {
        const { unmount } = renderHook(() => useMatchPositions(), {
            wrapper: ({ children }) => wrapper({ children, context: mockContextBase as PlayOffContextType }),
        });

        unmount();
        expect(disconnect).toHaveBeenCalled();
    });

    it('should update positions when content resizes', () => {
        const content = document.createElement('div');
        const match1 = document.createElement('div');
        const matchRefs = { '1': match1 };

        const context = {
            ...mockContextBase,
            contentRef: { current: content },
            matchRefs: { current: matchRefs },
        } as PlayOffContextType;

        const { result } = renderHook(() => useMatchPositions(), {
            wrapper: ({ children }) => wrapper({ children, context }),
        });

        act(() => {
            resizeCallback([], {} as ResizeObserver);
        });

        expect(observe).toHaveBeenCalledWith(content);

        expect(result.current.matchPositions).toEqual({
            '1': {
                id: '1',
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        });
    });

    it('should update positions when match resizes', () => {
        const content = document.createElement('div');
        const match1 = document.createElement('div');
        const matchRefs = { '1': match1 };

        const context = {
            ...mockContextBase,
            contentRef: { current: content },
            matchRefs: { current: matchRefs },
        } as PlayOffContextType;

        const { result } = renderHook(() => useMatchPositions(), {
            wrapper: ({ children }) => wrapper({ children, context }),
        });

        act(() => {
            resizeCallback([], {} as ResizeObserver);
        });

        expect(observe).toHaveBeenCalledWith(match1);

        expect(result.current.matchPositions).toEqual({
            '1': {
                id: '1',
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        });
    });

    it('should calculate and set positions on mount', () => {
        const content = document.createElement('div');
        const match1 = document.createElement('div');
        const matchRefs = { '1': match1 };

        const context = {
            ...mockContextBase,
            contentRef: { current: content },
            matchRefs: { current: matchRefs },
        } as PlayOffContextType;

        const { result } = renderHook(() => useMatchPositions(), {
            wrapper: ({ children }) => wrapper({ children, context }),
        });

        expect(result.current.matchPositions).toEqual({
            '1': {
                id: '1',
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        });
    });
});
