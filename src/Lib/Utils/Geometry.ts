export const clampPosition = (
    pos: { x: number; y: number },
    zoom: number,
    viewportRect: DOMRect,
    contentWidth: number,
    contentHeight: number,
    padding = 100
) => {
    const vWidth = viewportRect.width;
    const vHeight = viewportRect.height;

    const actualPaddingX = Math.min(padding, contentWidth * zoom);
    const actualPaddingY = Math.min(padding, contentHeight * zoom);

    const minX = actualPaddingX - contentWidth * zoom;
    const maxX = vWidth - actualPaddingX;

    const minY = actualPaddingY - contentHeight * zoom;
    const maxY = vHeight - actualPaddingY;

    return {
        x: Math.max(minX, Math.min(maxX, pos.x)),
        y: Math.max(minY, Math.min(maxY, pos.y)),
    };
};
