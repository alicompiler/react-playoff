import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DefaultMatch } from '../DefaultMatch';
import type { Match } from '../../Types';

describe('DefaultMatch', () => {
    const mockMatch: Match = {
        id: '1',
        home: { name: 'Team A' },
        away: { name: 'Team B' },
        nextMatchId: '3',
        score: [{ home: '1', away: '0' }]
    };

    it('renders team names and scores', () => {
        render(
            <DefaultMatch
                match={mockMatch}
                selectedTeam={null}
                setSelectedTeamName={() => { }}
            />
        );

        expect(screen.getByText(/Team A/)).toBeInTheDocument();
        expect(screen.getByText(/Team B/)).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();


    });

    it('calls setSelectedTeamName when a team is clicked', () => {
        const setSelectedTeamName = vi.fn();
        render(
            <DefaultMatch
                match={mockMatch}
                selectedTeam={null}
                setSelectedTeamName={setSelectedTeamName}
            />
        );

        fireEvent.click(screen.getByLabelText(/Select Team A/));
        expect(setSelectedTeamName).toHaveBeenCalledWith('Team A');
    });

    it('calls setSelectedTeamName when the away team is clicked', () => {
        const setSelectedTeamName = vi.fn();
        render(
            <DefaultMatch
                match={mockMatch}
                selectedTeam={null}
                setSelectedTeamName={setSelectedTeamName}
            />
        );

        fireEvent.click(screen.getByLabelText(/Select Team B/));
        expect(setSelectedTeamName).toHaveBeenCalledWith('Team B');
    });

    it('calls setSelectedTeamName with null when the already selected team is clicked', () => {
        const setSelectedTeamName = vi.fn();
        render(
            <DefaultMatch
                match={mockMatch}
                selectedTeam="Team A"
                setSelectedTeamName={setSelectedTeamName}
            />
        );

        fireEvent.click(screen.getByLabelText(/Select Team A/));
        expect(setSelectedTeamName).toHaveBeenCalledWith(null);
    });

    it('applies selected class when team is selected', () => {
        render(
            <DefaultMatch
                match={mockMatch}
                selectedTeam="Team A"
                setSelectedTeamName={() => { }}
            />
        );

        const homeButton = screen.getByLabelText(/Select Team A/);
        expect(homeButton.className).toContain('__playoff-team-selected');
    });

    it('renders - when the score is not set', () => {
        const matchWithoutScore: Match = {
            id: '1',
            home: { name: 'Team A' },
            away: { name: 'Team B' },
            nextMatchId: '3',
        };
        render(
            <DefaultMatch
                match={matchWithoutScore}
                selectedTeam={null}
                setSelectedTeamName={() => { }}
            />
        );
        expect(screen.getAllByText('-')).toHaveLength(2);
    });

    it('set __playoff-team-selected classname when the away team get selected', () => {
        const setSelectedTeamName = vi.fn();
        render(
            <DefaultMatch
                match={mockMatch}
                selectedTeam="Team B"
                setSelectedTeamName={setSelectedTeamName}
            />
        );

        const awayButton = screen.getByLabelText(/Select Team B/);
        expect(awayButton.className).toContain('__playoff-team-selected');
    });
});
