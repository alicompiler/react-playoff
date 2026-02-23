import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { Connectors } from '../Connectors';
import { PlayOffContext } from '../../Provider/PlayOffContext';
import type { PlayOffContextType } from '../../Provider/PlayOffContext';
import { useMatchPositions } from '../../Hooks/UseMatchPositions';

vi.mock('../../Hooks/UseMatchPositions', () => ({
    useMatchPositions: vi.fn(),
}));

const mockContextBase: Partial<PlayOffContextType> = {
    rounds: [],
};

const wrapper = ({ children, context }: { children: React.ReactNode; context: any }) => (
    <PlayOffContext.Provider value={context}>{children}</PlayOffContext.Provider>
);

describe('Connectors', () => {
    it('renders Paths for matches that have both current and next positions', () => {
        const rounds = [
            [
                { id: '1', home: { name: 'A' }, away: { name: 'B' }, nextMatchId: '3' },
            ],
            [
                { id: '3', home: { name: 'A' }, away: { name: 'C' }, nextMatchId: '' },
            ]
        ];

        const matchPositions = {
            '1': { id: '1', x: 0, y: 0, width: 100, height: 50 },
            '3': { id: '3', x: 200, y: 0, width: 100, height: 50 },
        };

        (useMatchPositions as Mock).mockReturnValue({ matchPositions });

        const { container } = render(
            <Connectors />,
            { wrapper: ({ children }) => wrapper({ children, context: { ...mockContextBase, rounds } }) }
        );

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        const path = container.querySelector('path');
        expect(path).toBeInTheDocument();
    });

    it('does not render Path if position is missing', () => {
        const rounds = [
            [
                { id: '1', home: { name: 'A' }, away: { name: 'B' }, nextMatchId: '3' },
            ]
        ];

        const matchPositions = {
            '1': { id: '1', x: 0, y: 0, width: 100, height: 50 },
            // Missing position for '3'
        };

        (useMatchPositions as Mock).mockReturnValue({ matchPositions });

        const { container } = render(
            <Connectors />,
            { wrapper: ({ children }) => wrapper({ children, context: { ...mockContextBase, rounds } }) }
        );

        const path = container.querySelector('path');
        expect(path).not.toBeInTheDocument();
    });
});
