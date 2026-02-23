import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useZoom } from '../UseZoom';
import { PlayOffContext } from '../../Provider/PlayOffContext';
import type { PlayOffContextType } from '../../Provider/PlayOffContext';

const mockContextBase: Partial<PlayOffContextType> = {
    position: { x: 0, y: 0 },
    setPosition: vi.fn(),
    zoom: 1,
    setZoom: vi.fn(),
    viewportRef: { current: document.createElement('div') },
    contentRef: { current: document.createElement('div') },
};

const wrapper = ({ children, context }: { children: React.ReactNode; context: PlayOffContextType }) => (
    <PlayOffContext.Provider value={context}>{children}</PlayOffContext.Provider>
);

describe('useZoom', () => {
    it('should update zoom and position on wheel with ctrlKey', () => {
        const setPosition = vi.fn();
        const setZoom = vi.fn();
        const viewport = document.createElement('div');
        vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({
            left: 0,
            top: 0,
            width: 1000,
            height: 1000,
        } as DOMRect);

        const content = document.createElement('div');
        Object.defineProperty(content, 'offsetWidth', { value: 2000 });
        Object.defineProperty(content, 'offsetHeight', { value: 2000 });

        const context = {
            ...mockContextBase,
            setPosition,
            setZoom,
            viewportRef: { current: viewport },
            contentRef: { current: content },
        } as PlayOffContextType;

        const { result } = renderHook(() => useZoom(), {
            wrapper: ({ children }) => wrapper({ children, context }),
        });

        const event = {
            ctrlKey: true,
            deltaY: 100,
            clientX: 500,
            clientY: 500,
            preventDefault: vi.fn(),
        } as unknown as React.WheelEvent;

        result.current.handleWheel(event);

        expect(setZoom).toHaveBeenCalledWith(0.9);
        expect(setPosition).toHaveBeenCalledWith({ x: 50, y: 50 });
    });

    it('should update position on wheel without ctrlKey (panning)', () => {
        const setPosition = vi.fn();
        const viewport = document.createElement('div');
        vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({
            left: 0,
            top: 0,
            width: 1000,
            height: 1000,
        } as DOMRect);

        const content = document.createElement('div');
        Object.defineProperty(content, 'offsetWidth', { value: 2000 });
        Object.defineProperty(content, 'offsetHeight', { value: 2000 });

        const context = {
            ...mockContextBase,
            setPosition,
            viewportRef: { current: viewport },
            contentRef: { current: content },
        } as PlayOffContextType;

        const { result } = renderHook(() => useZoom(), {
            wrapper: ({ children }) => wrapper({ children, context }),
        });

        const event = {
            ctrlKey: false,
            deltaX: 10,
            deltaY: 20,
        } as unknown as React.WheelEvent;

        result.current.handleWheel(event);

        expect(setPosition).toHaveBeenCalledWith({ x: -10, y: -20 });
    });
});
