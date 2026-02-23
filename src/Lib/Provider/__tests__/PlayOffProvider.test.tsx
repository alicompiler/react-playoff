import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlayOffProvider } from '../PlayOffProvider';
import { usePlayOffContext } from '../PlayOffContext';
import type { Rounds } from '../../Types';

const TestComponent = () => {
    const {
        layout,
        selectedTeamName,
        setSelectedTeamName,
        position,
        setPosition,
        zoom,
        setZoom,
        setMatchRef,
        matchRefs
    } = usePlayOffContext();

    const [, forceUpdate] = React.useReducer(x => x + 1, 0);

    return (
        <div>
            <div data-testid="layout">{layout}</div>
            <div data-testid="selected-team">{selectedTeamName ?? 'none'}</div>
            <div data-testid="position">{position.x},{position.y}</div>
            <div data-testid="zoom">{zoom}</div>
            <div data-testid="match-ref-count">{Object.keys(matchRefs.current).length}</div>
            <button onClick={() => setSelectedTeamName('Team Alpha')}>Select Alpha</button>
            <button onClick={() => setPosition({ x: 10, y: 20 })}>Set Position</button>
            <button onClick={() => setZoom(1.5)}>Set Zoom</button>
            <button onClick={() => { setMatchRef('m1', { id: 'm1' } as any); forceUpdate(); }}>Add Ref</button>
        </div>
    );

};

describe('PlayOffProvider', () => {
    const mockRounds: Rounds = [];
    const mockRenderMatch = () => <div />;

    it('initializes and provides values to consumers', () => {
        render(
            <PlayOffProvider
                rounds={mockRounds}
                layout="wings"
                renderMatch={mockRenderMatch}
            >
                <TestComponent />
            </PlayOffProvider>
        );

        expect(screen.getByTestId('layout').textContent).toBe('wings');
        expect(screen.getByTestId('selected-team').textContent).toBe('none');
        expect(screen.getByTestId('position').textContent).toBe('0,0');
        expect(screen.getByTestId('zoom').textContent).toBe('1');
    });

    it('updates state components correctly', () => {
        render(
            <PlayOffProvider
                rounds={mockRounds}
                layout="tree"
                renderMatch={mockRenderMatch}
            >
                <TestComponent />
            </PlayOffProvider>
        );

        act(() => {
            screen.getByText('Select Alpha').click();
        });
        expect(screen.getByTestId('selected-team').textContent).toBe('Team Alpha');

        act(() => {
            screen.getByText('Set Position').click();
        });
        expect(screen.getByTestId('position').textContent).toBe('10,20');

        act(() => {
            screen.getByText('Set Zoom').click();
        });
        expect(screen.getByTestId('zoom').textContent).toBe('1.5');
    });

    it('manages match references correctly', () => {
        render(
            <PlayOffProvider
                rounds={mockRounds}
                layout="tree"
                renderMatch={mockRenderMatch}
            >
                <TestComponent />
            </PlayOffProvider>
        );

        expect(screen.getByTestId('match-ref-count').textContent).toBe('0');

        act(() => {
            screen.getByText('Add Ref').click();
        });
        expect(screen.getByTestId('match-ref-count').textContent).toBe('1');
    });
});
