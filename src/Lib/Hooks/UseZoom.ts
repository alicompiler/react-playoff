import { useState, type Dispatch, type SetStateAction } from "react";

type UseZoomResult = {
    zoom: number;
    setZoom: Dispatch<SetStateAction<number>>;
    handleWheel: (e: React.WheelEvent) => void;
};

export const useZoom = (
    position: { x: number; y: number },
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>,
    viewportRef: React.RefObject<HTMLDivElement | null>,
): UseZoomResult => {
    const [zoom, setZoom] = useState(1);

    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = Math.min(Math.max(zoom * delta, 0.5), 1);

            if (newZoom !== zoom && viewportRef.current) {
                const rect = viewportRef.current.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                // Project mouse into logical coordinates
                const contentX = (mouseX - position.x) / zoom;
                const contentY = (mouseY - position.y) / zoom;

                // Adjust position to keep the content point under the mouse
                setPosition({
                    x: mouseX - contentX * newZoom,
                    y: mouseY - contentY * newZoom,
                });
                setZoom(newZoom);
            }
        } else {
            setPosition((prev: { x: number; y: number }) => ({
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY,
            }));
        }
    };

    return {
        zoom,
        setZoom,
        handleWheel,
    };
};
