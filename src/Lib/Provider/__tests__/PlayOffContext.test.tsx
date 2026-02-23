import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { usePlayOffContext } from '../PlayOffContext';
import { PlayOffProvider } from '../PlayOffProvider';


describe('usePlayOffContext', () => {
    it('throws error when used outside of PlayOffProvider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => renderHook(() => usePlayOffContext())).toThrow('usePlayOffContext must be used within a PlayOffProvider');

        consoleSpy.mockRestore();
    });

    it('returns context value when used within PlayOffProvider', () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <PlayOffProvider
                rounds={[]}
                layout="tree"
                renderMatch={() => <div />}
            >
                {children}
            </PlayOffProvider>
        );

        const { result } = renderHook(() => usePlayOffContext(), { wrapper });

        expect(result.current.layout).toBe('tree');
        expect(result.current.rounds).toEqual([]);
        expect(result.current.selectedTeamName).toBeNull();
    });
});
