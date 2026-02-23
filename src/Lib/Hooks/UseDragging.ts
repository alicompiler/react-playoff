import { useState } from "react";
import type { MouseEventHandler } from "react";
import { clampPosition } from "../Utils/Geometry";
import { usePlayOffContext } from "../Provider/PlayOffContext";

export interface UseDraggingResult {
    isDragging: boolean;
    handleMouseDown: MouseEventHandler<HTMLDivElement>;
    handleMouseMove: MouseEventHandler<HTMLDivElement>;
    handleMouseUp: MouseEventHandler<HTMLDivElement>;
}

export const useDragging = (): UseDraggingResult => {
    const { position, setPosition, zoom, viewportRef, contentRef } = usePlayOffContext();
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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
        if (isDragging && viewportRef.current && contentRef.current) {
            const newPos = {
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
            };

            const viewportRect = viewportRef.current.getBoundingClientRect();
            const contentWidth = contentRef.current.offsetWidth;
            const contentHeight = contentRef.current.offsetHeight;

            setPosition(clampPosition(
                newPos,
                zoom,
                viewportRect,
                contentWidth,
                contentHeight
            ));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return {
        isDragging,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};
