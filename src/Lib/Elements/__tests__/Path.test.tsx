import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Path } from '../Path';
import { PlayOffContext } from '../../Provider/PlayOffContext';
import type { PlayOffContextType } from '../../Provider/PlayOffContext';
import type { Match, MatchPosition } from '../../Types';

const mockContextBase: Partial<PlayOffContextType> = {
    selectedTeamName: null,
    rounds: [],
};

const wrapper = ({ children, context }: { children: React.ReactNode; context: PlayOffContextType }) => (
    <svg>
        <PlayOffContext.Provider value={context}>{children}</PlayOffContext.Provider>
    </svg>
);

describe('Path', () => {
    const matchPosition: MatchPosition = { id: '1', x: 100, y: 100, width: 200, height: 100 };
    const nextMatchPosition: MatchPosition = { id: '3', x: 400, y: 300, width: 200, height: 100 };
    const match: Match = { id: '1', home: { name: 'A' }, away: { name: 'B' }, nextMatchId: '3' };

    it('generates a path string for straight connection', () => {
        const straightNextPos = { ...nextMatchPosition, y: 100 };
        const { container } = render(
            <Path matchPosition={matchPosition} nextMatchPosition={straightNextPos} match={match} />,
            { wrapper: ({ children }) => wrapper({ children, context: mockContextBase as PlayOffContextType }) }
        );

        const path = container.querySelector('path');
        expect(path?.getAttribute('d')).toContain('M 100 150 L 600 150');
    });

    it('generates a curved path string for offset connection', () => {
        const { container } = render(
            <Path matchPosition={matchPosition} nextMatchPosition={nextMatchPosition} match={match} />,
            { wrapper: ({ children }) => wrapper({ children, context: mockContextBase as PlayOffContextType }) }
        );

        const path = container.querySelector('path');
        const d = path?.getAttribute('d');
        expect(d).toContain('Q');
        expect(d).toContain('M 100 150');
        expect(d).toContain('L 600 350');
    });

    it('highlights the path if team is in both current and next match', () => {
        const nextMatch: Match = { id: '3', home: { name: 'A' }, away: { name: 'C' }, nextMatchId: '' };
        const context = {
            ...mockContextBase,
            selectedTeamName: 'A',
            rounds: [[match], [nextMatch]],
        };

        const { container } = render(
            <Path matchPosition={matchPosition} nextMatchPosition={nextMatchPosition} match={match} />,
            { wrapper: ({ children }) => wrapper({ children, context: context as PlayOffContextType }) }
        );

        const path = container.querySelector('path');
        expect(path).toHaveClass('__playoff-path--highlighted');
    });

    it('does not highlight if team is only in current match', () => {
        const nextMatch: Match = { id: '3', home: { name: 'X' }, away: { name: 'C' }, nextMatchId: '' };
        const context = {
            ...mockContextBase,
            selectedTeamName: 'A',
            rounds: [[match], [nextMatch]],
        };

        const { container } = render(
            <Path matchPosition={matchPosition} nextMatchPosition={nextMatchPosition} match={match} />,
            { wrapper: ({ children }) => wrapper({ children, context: context as PlayOffContextType }) }
        );

        const path = container.querySelector('path');
        expect(path).not.toHaveClass('__playoff-path--highlighted');
    });
});
