import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { WingsLayout } from '../WingLayout';
import { PlayOffContext, type PlayOffContextType } from '../../Provider/PlayOffContext';
import type { Match } from '../../Types';
import { useWings } from '../../Hooks/UseWings';

vi.mock('../../Hooks/UseWings', () => ({
    useWings: vi.fn(),
}));

const mockContextBase: Partial<PlayOffContextType> = {
    setMatchRef: vi.fn(),
    renderMatch: (match) => <div data-testid="match">{match.id}</div>,
    setSelectedTeamName: vi.fn(),
    selectedTeamName: null,
};

const wrapper = ({ children, context }: { children: React.ReactNode; context: PlayOffContextType }) => (
    <PlayOffContext.Provider value={context}>{children}</PlayOffContext.Provider>
);

describe('WingsLayout', () => {
    it('renders rounds split into left wing, final, and right wing', () => {
        const rounds: Match[][] = [
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

        (useWings as Mock).mockReturnValue({
            isLeftWing: (id: string) => ['1', '2', '5'].includes(id),
            isRightWing: (id: string) => ['3', '4', '6'].includes(id),
        });

        render(<WingsLayout />, {
            wrapper: ({ children }) => wrapper({ children, context: { ...mockContextBase, rounds } as PlayOffContextType }),
        });

        const matches = screen.getAllByTestId('match');
        expect(matches).toHaveLength(7);

        expect(screen.getByText('7')).toBeInTheDocument();

        ['1', '2', '3', '4', '5', '6', '7'].forEach(id => {
            expect(screen.getByText(id)).toBeInTheDocument();
        });
    });
});
