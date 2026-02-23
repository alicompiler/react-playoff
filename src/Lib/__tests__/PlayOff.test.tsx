import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlayOff } from '../PlayOff';
import type { Rounds } from '../Types';

describe('PlayOff Integration', () => {
    const mockRounds: Rounds = [
        [
            {
                id: '1',
                home: { name: 'Team A' },
                away: { name: 'Team B' },
                score: [{ home: '1', away: '0' }],
                nextMatchId: '3'
            },
            {
                id: '2',
                home: { name: 'Team C' },
                away: { name: 'Team D' },
                score: [{ home: '0', away: '2' }],
                nextMatchId: '3'
            }
        ],
        [
            {
                id: '3',
                home: { name: 'Team A' },
                away: { name: 'Team D' },
                score: [{ home: '2', away: '1' }],
                nextMatchId: '__final__'
            }
        ]
    ];

    it('renders the tournament bracket with matches', () => {
        render(<PlayOff rounds={mockRounds} layout="tree" />);

        expect(screen.getAllByText('Team A').length).toBeGreaterThan(0);
        expect(screen.getByText('Team B')).toBeInTheDocument();
        expect(screen.getByText('Team C')).toBeInTheDocument();
        expect(screen.getAllByText('Team D').length).toBeGreaterThan(0);
    });

    it('renders TreeLayout when layout is set to "tree"', () => {
        const { container } = render(<PlayOff rounds={mockRounds} layout="tree" />);
        expect(container.querySelector('.__playoff-layout-tree')).toBeInTheDocument();
    });

    it('renders WingsLayout when layout is set to "wings"', () => {
        const { container } = render(<PlayOff rounds={mockRounds} layout="wings" />);
        expect(container.querySelector('.__playoff-layout-wings')).toBeInTheDocument();
    });

    it('toggles connectors based on renderPaths prop', () => {
        const { container: withPaths } = render(<PlayOff rounds={mockRounds} layout="tree" renderPaths={true} />);
        expect(withPaths.querySelector('.__playoff-connectors')).toBeInTheDocument();

        const { container: withoutPaths } = render(<PlayOff rounds={mockRounds} layout="tree" renderPaths={false} />);
        expect(withoutPaths.querySelector('.__playoff-connectors')).not.toBeInTheDocument();
    });

    it('handles team selection correctly through integrated components', () => {
        render(<PlayOff rounds={mockRounds} layout="tree" />);

        const teamButtons = screen.getAllByLabelText(/Select Team A/);
        expect(teamButtons.length).toBe(2);

        fireEvent.click(teamButtons[0]);

        teamButtons.forEach(btn => {
            expect(btn.className).toContain('__playoff-team-selected');
        });
    });

    it('clears selection when clicking on the root container', () => {
        const { container } = render(<PlayOff rounds={mockRounds} layout="tree" />);

        const teamA = screen.getAllByLabelText(/Select Team A/)[0];
        fireEvent.click(teamA);
        expect(teamA.className).toContain('__playoff-team-selected');

        const root = container.firstChild as HTMLElement;
        fireEvent.click(root);

        expect(teamA.className).not.toContain('__playoff-team-selected');
    });

    it('clears selection when pressing the Escape key', () => {
        const { container } = render(<PlayOff rounds={mockRounds} layout="tree" />);

        const teamA = screen.getAllByLabelText(/Select Team A/)[0];
        fireEvent.click(teamA);
        expect(teamA.className).toContain('__playoff-team-selected');

        fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'Escape' });

        expect(teamA.className).not.toContain('__playoff-team-selected');
    });
});
