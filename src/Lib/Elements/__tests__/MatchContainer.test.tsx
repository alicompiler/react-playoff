import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MatchContainer } from '../MatchContainer';
import type { Match } from '../../Types';

describe('MatchContainer', () => {
    const mockMatch: Match = {
        id: '1',
        home: { name: 'Team A' },
        away: { name: 'Team B' },
        nextMatchId: '3'
    };

    const mockRenderMatch = vi.fn((match) => (
        <div data-testid="match-content">{match.home.name} vs {match.away.name}</div>
    ));

    it('renders the custom match content', () => {
        render(
            <MatchContainer
                match={mockMatch}
                renderMatch={mockRenderMatch}
                selectedTeamName={null}
                setSelectedTeamName={() => { }}
                setMatchRef={() => { }}
            />
        );

        expect(screen.getByTestId('match-content')).toBeInTheDocument();
        expect(screen.getByText(/Team A vs Team B/)).toBeInTheDocument();
    });

    it('calls setMatchRef on mount', () => {
        const setMatchRef = vi.fn();
        render(
            <MatchContainer
                match={mockMatch}
                renderMatch={mockRenderMatch}
                selectedTeamName={null}
                setSelectedTeamName={() => { }}
                setMatchRef={setMatchRef}
            />
        );

        expect(setMatchRef).toHaveBeenCalledWith('1', expect.any(HTMLElement));
    });

    it('clears selection when clicking the container', () => {
        const setSelectedTeamName = vi.fn();
        render(
            <MatchContainer
                match={mockMatch}
                renderMatch={mockRenderMatch}
                selectedTeamName="Team A"
                setSelectedTeamName={setSelectedTeamName}
                setMatchRef={() => { }}
            />
        );

        fireEvent.click(screen.getByRole('button'));
        expect(setSelectedTeamName).toHaveBeenCalledWith(null);
    });

    it('clears selection on Enter or Space key down', () => {
        const setSelectedTeamName = vi.fn();
        render(
            <MatchContainer
                match={mockMatch}
                renderMatch={mockRenderMatch}
                selectedTeamName="Team A"
                setSelectedTeamName={setSelectedTeamName}
                setMatchRef={() => { }}
            />
        );

        const container = screen.getByRole('button');

        fireEvent.keyDown(container, { key: 'Enter' });
        expect(setSelectedTeamName).toHaveBeenCalledWith(null);

        fireEvent.keyDown(container, { key: ' ' });
        expect(setSelectedTeamName).toHaveBeenCalledWith(null);
    });
});
