import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RoundColumn } from '../RoundColumn';
import { PlayOffContext } from '../../Provider/PlayOffContext';
import type { PlayOffContextType } from '../../Provider/PlayOffContext';
import type { Match } from '../../Types';

const mockContextBase: Partial<PlayOffContextType> = {
    setMatchRef: vi.fn(),
    renderMatch: (match) => <div data-testid="match">{match.id}</div>,
    setSelectedTeamName: vi.fn(),
    selectedTeamName: null,
};

const wrapper = ({ children, context }: { children: React.ReactNode; context: PlayOffContextType }) => (
    <PlayOffContext.Provider value={context}>{children}</PlayOffContext.Provider>
);

describe('RoundColumn', () => {
    const round: Match[] = [
        { id: '1', home: { name: 'A' }, away: { name: 'B' }, nextMatchId: '3' },
        { id: '2', home: { name: 'C' }, away: { name: 'D' }, nextMatchId: '3' },
    ];

    it('renders all matches in the round', () => {
        render(
            <RoundColumn round={round} />,
            { wrapper: ({ children }) => wrapper({ children, context: mockContextBase as PlayOffContextType }) }
        );

        const matches = screen.getAllByTestId('match');
        expect(matches).toHaveLength(2);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('uses roundTitle for aria-label if available', () => {
        const roundWithTitle: Match[] = [
            { id: '1', home: { name: 'A' }, away: { name: 'B' }, nextMatchId: '3', metadata: { roundTitle: 'Finals' } },
        ];

        render(
            <RoundColumn round={roundWithTitle} />,
            { wrapper: ({ children }) => wrapper({ children, context: mockContextBase as PlayOffContextType }) }
        );

        expect(screen.getByLabelText('Round Finals')).toBeInTheDocument();
    });
});
