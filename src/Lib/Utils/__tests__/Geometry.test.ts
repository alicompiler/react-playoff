import { describe, it, expect } from 'vitest';
import { clampPosition } from '../Geometry';

describe('Geometry Utils', () => {
    describe('clampPosition', () => {
        const viewportRect = {
            width: 1000,
            height: 800,
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            right: 1000,
            bottom: 800,
            toJSON: () => {}
        } as DOMRect;

        const contentWidth = 2000;
        const contentHeight = 1500;

        it('should clamp position when content is larger than viewport', () => {
            const zoom = 1;
            
            expect(clampPosition({ x: 0, y: 0 }, zoom, viewportRect, contentWidth, contentHeight)).toEqual({ x: 0, y: 0 });
            
            expect(clampPosition({ x: -2500, y: -2000 }, zoom, viewportRect, contentWidth, contentHeight)).toEqual({ x: -1900, y: -1400 });
            
            expect(clampPosition({ x: 2000, y: 1500 }, zoom, viewportRect, contentWidth, contentHeight)).toEqual({ x: 900, y: 700 });
        });

        it('should handle different zoom levels', () => {
            const zoom = 0.5;

            expect(clampPosition({ x: -1500, y: -1000 }, zoom, viewportRect, contentWidth, contentHeight)).toEqual({ x: -900, y: -650 });
        });

        it('should use minimum padding if content is very small', () => {
            const smallContentWidth = 50;
            const smallContentHeight = 50;
            const zoom = 1;

            expect(clampPosition({ x: -100, y: -100 }, zoom, viewportRect, smallContentWidth, smallContentHeight)).toEqual({ x: 0, y: 0 });
            expect(clampPosition({ x: 2000, y: 2000 }, zoom, viewportRect, smallContentWidth, smallContentHeight)).toEqual({ x: 950, y: 750 });
        });
    });
});
