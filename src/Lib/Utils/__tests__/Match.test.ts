import { describe, it, expect } from 'vitest';
import { getMatchIdsToHighlight, calculateMatchPositions } from '../Match';
import type { Rounds } from '../../Types';

describe('Match Utils', () => {
    describe('getMatchIdsToHighlight', () => {
        const rounds: Rounds = [
            [
                { id: '1', home: { name: 'Team A' }, away: { name: 'Team B' }, nextMatchId: '3' },
                { id: '2', home: { name: 'Team C' }, away: { name: 'Team D' }, nextMatchId: '3' }
            ],
            [
                { id: '3', home: { name: 'Team A' }, away: { name: 'Team C' }, nextMatchId: '' }
            ]
        ];

        it('should return empty set if no team is selected', () => {
            const result = getMatchIdsToHighlight(null, rounds);
            expect(result.size).toBe(0);
        });

        it('should return match IDs where the selected team is playing', () => {
            const result = getMatchIdsToHighlight('Team C', rounds);
            expect(result.has('2')).toBe(true);
            expect(result.has('3')).toBe(true);
            expect(result.has('1')).toBe(false);
            expect(result.size).toBe(2);
        });

        it('should return empty set if selected team is not in any match', () => {
            const result = getMatchIdsToHighlight('Team X', rounds);
            expect(result.size).toBe(0);
        });
    });

    describe('calculateMatchPositions', () => {
        it('should return empty object if contentDiv is null', () => {
            const result = calculateMatchPositions(null, {});
            expect(result).toEqual({});
        });

        it('should calculate positions correctly for elements', () => {
            const contentDiv = document.createElement('div');
            
            const match1 = document.createElement('div');
            Object.defineProperty(match1, 'offsetLeft', { value: 10 });
            Object.defineProperty(match1, 'offsetTop', { value: 20 });
            Object.defineProperty(match1, 'offsetWidth', { value: 100 });
            Object.defineProperty(match1, 'offsetHeight', { value: 50 });
            Object.defineProperty(match1, 'offsetParent', { value: contentDiv });

            const matchRefs = {
                'match-1': match1
            };

            const result = calculateMatchPositions(contentDiv, matchRefs);

            expect(result['match-1']).toEqual({
                id: 'match-1',
                x: 10,
                y: 20,
                width: 100,
                height: 50
            });
        });

        it('should traverse offsetParents correctly', () => {
            const contentDiv = document.createElement('div');
            const parent = document.createElement('div');
            const child = document.createElement('div');

            Object.defineProperty(parent, 'offsetLeft', { value: 50 });
            Object.defineProperty(parent, 'offsetTop', { value: 50 });
            Object.defineProperty(parent, 'offsetParent', { value: contentDiv });

            Object.defineProperty(child, 'offsetLeft', { value: 20 });
            Object.defineProperty(child, 'offsetTop', { value: 20 });
            Object.defineProperty(child, 'offsetWidth', { value: 100 });
            Object.defineProperty(child, 'offsetHeight', { value: 50 });
            Object.defineProperty(child, 'offsetParent', { value: parent });

            const matchRefs = {
                'child': child
            };

            const result = calculateMatchPositions(contentDiv, matchRefs);

            expect(result['child'].x).toBe(70);
            expect(result['child'].y).toBe(70);
        });
    });
});
