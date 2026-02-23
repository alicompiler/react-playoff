import { clampPosition } from "../Utils/Geometry";
import { usePlayOffContext } from "../Provider/PlayOffContext";

type UseZoomResult = {
    zoom: number;
    handleWheel: (e: React.WheelEvent) => void;
};

export const useZoom = (): UseZoomResult => {
    const { position, setPosition, zoom, setZoom, viewportRef, contentRef } = usePlayOffContext();

    const handleWheel = (e: React.WheelEvent) => {
        if (!viewportRef.current || !contentRef.current) return;

        const viewportRect = viewportRef.current.getBoundingClientRect();
        const contentWidth = contentRef.current.offsetWidth;
        const contentHeight = contentRef.current.offsetHeight;

        if (e.ctrlKey || e.metaKey) {
            if (e.cancelable) {
                e.preventDefault();
            }
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = Math.min(Math.max(zoom * delta, 0.5), 1);

            if (newZoom !== zoom) {
                const mouseX = e.clientX - viewportRect.left;
                const mouseY = e.clientY - viewportRect.top;

                // Project mouse into logical coordinates
                const contentX = (mouseX - position.x) / zoom;
                const contentY = (mouseY - position.y) / zoom;

                // Adjust position to keep the content point under the mouse
                const newPos = {
                    x: mouseX - contentX * newZoom,
                    y: mouseY - contentY * newZoom,
                };

                setPosition(clampPosition(
                    newPos,
                    newZoom,
                    viewportRect,
                    contentWidth,
                    contentHeight
                ));
                setZoom(newZoom);
            }
        } else {
            const newPos = {
                x: position.x - e.deltaX,
                y: position.y - e.deltaY,
            };

            setPosition(clampPosition(
                newPos,
                zoom,
                viewportRect,
                contentWidth,
                contentHeight
            ));
        }
    };

    return {
        zoom,
        handleWheel,
    };
};
