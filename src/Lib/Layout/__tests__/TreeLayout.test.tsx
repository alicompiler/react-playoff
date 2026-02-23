import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TreeLayout } from '../TreeLayout';
import { PlayOffContext, type PlayOffContextType } from '../../Provider/PlayOffContext';
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

describe('TreeLayout', () => {
    it('renders all rounds and matches in a tree structure', () => {
        const rounds: Match[][] = [
            [
                { id: '1', home: { name: 'A' }, away: { name: 'B' }, nextMatchId: '3' },
                { id: '2', home: { name: 'C' }, away: { name: 'D' }, nextMatchId: '3' },
            ],
            [
                { id: '3', home: { name: 'A' }, away: { name: 'C' }, nextMatchId: '' },
            ],
        ];

        render(<TreeLayout />, {
            wrapper: ({ children }) => wrapper({ children, context: { ...mockContextBase, rounds } as PlayOffContextType }),
        });

        const matches = screen.getAllByTestId('match');
        expect(matches).toHaveLength(3);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });
});
