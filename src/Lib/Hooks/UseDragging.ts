import { useState } from "react";
import type { Dispatch, MouseEventHandler, SetStateAction } from "react";

export interface UseDraggingResult {
    isDragging: boolean;
    position: { x: number; y: number };
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    handleMouseDown: MouseEventHandler<HTMLDivElement>;
    handleMouseMove: MouseEventHandler<HTMLDivElement>;
    handleMouseUp: MouseEventHandler<HTMLDivElement>;
}

export const useDragging = (): UseDraggingResult => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        const leftClick = 0;
        if (e.button === leftClick) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            });
        }
    };

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return {
        isDragging,
        position,
        setPosition,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};
