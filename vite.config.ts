import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src/Lib'],
            insertTypesEntry: true,
            rollupTypes: true,
            tsconfigPath: './tsconfig.lib.json',
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/Lib/index.ts'),
            name: 'ReactPlayoff',
            fileName: 'react-playoff',
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/SetupTests.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
    },
});
