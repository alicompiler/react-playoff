import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

const isLib = process.env.BUILD_LIB === 'true';

export default defineConfig({
    base: isLib ? '/' : '/react-playoff/',
    plugins: [
        react(),
        isLib && dts({
            include: ['src/Lib'],
            insertTypesEntry: true,
            rollupTypes: true,
            tsconfigPath: './tsconfig.lib.json',
        }),
    ].filter(Boolean),
    build: isLib ? {
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
    } : {
        outDir: 'dist-demo',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/SetupTests.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'json-summary'],
        },
    },
});
