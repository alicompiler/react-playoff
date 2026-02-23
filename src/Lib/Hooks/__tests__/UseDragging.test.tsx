import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDragging } from '../UseDragging';
import { PlayOffContext } from '../../Provider/PlayOffContext';
import type { PlayOffContextType } from '../../Provider/PlayOffContext';

const mockContextBase: Partial<PlayOffContextType> = {
    position: { x: 0, y: 0 },
    setPosition: vi.fn(),
    zoom: 1,
    viewportRef: { current: document.createElement('div') },
    contentRef: { current: document.createElement('div') },
};

const wrapper = ({ children, context }: { children: React.ReactNode; context: PlayOffContextType }) => (
    <PlayOffContext.Provider value={context}>{children}</PlayOffContext.Provider>
);

describe('useDragging', () => {
    it('should start dragging on mouse down', () => {
        const { result } = renderHook(() => useDragging(), {
            wrapper: ({ children }) => wrapper({ children, context: mockContextBase as PlayOffContextType }),
        });

        act(() => {
            result.current.handleMouseDown({ button: 0, clientX: 100, clientY: 100 } as React.MouseEvent<HTMLDivElement>);
        });

        expect(result.current.isDragging).toBe(true);
    });

    it('should update position on mouse move when dragging', () => {
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

        const { result } = renderHook(() => useDragging(), {
            wrapper: ({ children }) => wrapper({ children, context }),
        });

        act(() => {
            result.current.handleMouseDown({ button: 0, clientX: 100, clientY: 100 } as React.MouseEvent<HTMLDivElement>);
        });

        act(() => {
            result.current.handleMouseMove({ clientX: 150, clientY: 150 } as React.MouseEvent<HTMLDivElement>);
        });

        expect(setPosition).toHaveBeenCalledWith({ x: 50, y: 50 });
    });

    it('should stop dragging on mouse up', () => {
        const { result } = renderHook(() => useDragging(), {
            wrapper: ({ children }) => wrapper({ children, context: mockContextBase as PlayOffContextType }),
        });

        act(() => {
            result.current.handleMouseDown({ button: 0, clientX: 100, clientY: 100 } as React.MouseEvent<HTMLDivElement>);
        });

        expect(result.current.isDragging).toBe(true);

        act(() => {
            result.current.handleMouseUp({} as React.MouseEvent<HTMLDivElement>);
        });

        expect(result.current.isDragging).toBe(false);
    });

    it('should not start dragging on non-left mouse down', () => {
        const { result } = renderHook(() => useDragging(), {
            wrapper: ({ children }) => wrapper({ children, context: mockContextBase as PlayOffContextType }),
        });

        act(() => {
            result.current.handleMouseDown({ button: 1, clientX: 100, clientY: 100 } as React.MouseEvent<HTMLDivElement>);
        });

        expect(result.current.isDragging).toBe(false);
    });

    it('should not update position on mouse move if not dragging', () => {
        const setPosition = vi.fn();
        const context = {
            ...mockContextBase,
            setPosition,
        } as PlayOffContextType;

        const { result } = renderHook(() => useDragging(), {
            wrapper: ({ children }) => wrapper({ children, context }),
        });

        act(() => {
            result.current.handleMouseMove({ clientX: 150, clientY: 150 } as React.MouseEvent<HTMLDivElement>);
        });

        expect(setPosition).not.toHaveBeenCalled();
    });
});
