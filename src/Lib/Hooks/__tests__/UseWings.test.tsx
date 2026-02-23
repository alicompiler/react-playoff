import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useWings } from '../UseWings';
import type { Rounds } from '../../Types';

describe('useWings', () => {
    const rounds: Rounds = [
        [
            { id: '1', home: { name: 'A' }, away: { name: 'B' }, nextMatchId: '5' },
            { id: '2', home: { name: 'C' }, away: { name: 'D' }, nextMatchId: '5' },
            { id: '3', home: { name: 'E' }, away: { name: 'F' }, nextMatchId: '6' },
            { id: '4', home: { name: 'G' }, away: { name: 'H' }, nextMatchId: '6' },
        ],
        [
            { id: '5', home: { name: 'A' }, away: { name: 'D' }, nextMatchId: '7' },
            { id: '6', home: { name: 'F' }, away: { name: 'H' }, nextMatchId: '7' },
        ],
        [
            { id: '7', home: { name: 'A' }, away: { name: 'H' }, nextMatchId: '' }
        ]
    ];

    it('should correctly identify matches in left and right wings', () => {
        const { result } = renderHook(() => useWings(rounds));

        expect(result.current.isLeftWing('1')).toBe(true);
        expect(result.current.isLeftWing('2')).toBe(true);
        expect(result.current.isRightWing('3')).toBe(true);
        expect(result.current.isRightWing('4')).toBe(true);

        expect(result.current.isLeftWing('5')).toBe(true);
        expect(result.current.isRightWing('6')).toBe(true);

    });

    it('should return false for IDs not in the wings', () => {
        const { result } = renderHook(() => useWings(rounds));

        expect(result.current.isLeftWing('7')).toBe(false);
        expect(result.current.isRightWing('7')).toBe(false);
        expect(result.current.isLeftWing('99')).toBe(false);
        expect(result.current.isRightWing('99')).toBe(false);
    });

    it('should handle small rounds gracefully', () => {
        const { result } = renderHook(() => useWings(
            [[{ id: '1', home: { name: 'A' }, away: { name: 'B' }, nextMatchId: '' }]] as Rounds
        ));
        expect(result.current.isLeftWing('1')).toBe(false);
        expect(result.current.isRightWing('1')).toBe(false);
    });
});
