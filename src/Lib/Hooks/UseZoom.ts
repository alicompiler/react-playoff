import { clampPosition } from "../Utils/Geometry";
import { usePlayOffContext } from "../Provider/PlayOffContext";

type UseZoomResult = {
    zoom: number;
    handleWheel: (e: WheelEvent) => void;
};

export const useZoom = (): UseZoomResult => {
    const { position, setPosition, zoom, setZoom, viewportRef, contentRef } = usePlayOffContext();

    const handleWheel = (e: WheelEvent) => {
        if (!viewportRef.current || !contentRef.current) return;

        const viewportRect = viewportRef.current.getBoundingClientRect();
        const contentWidth = contentRef.current.offsetWidth;
        const contentHeight = contentRef.current.offsetHeight;

        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();

            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = Math.min(Math.max(zoom * delta, 0.2), 1.8);

            const mouseX = e.clientX - viewportRect.left;
            const mouseY = e.clientY - viewportRect.top;

            const contentX = (mouseX - position.x) / zoom;
            const contentY = (mouseY - position.y) / zoom;

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

        } else {
            const desiredPos = {
                x: position.x - e.deltaX,
                y: position.y - e.deltaY,
            };

            const clampedPos = clampPosition(
                desiredPos,
                zoom,
                viewportRect,
                contentWidth,
                contentHeight
            );

            const willMove = clampedPos.x !== position.x || clampedPos.y !== position.y;

            if (willMove) {
                e.preventDefault();
                setPosition(clampedPos);
            }
        }
    };

    return {
        zoom,
        handleWheel,
    };
};
