import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    return {
        plugins: [react(), tsconfigPaths()],
        base: env.VITE_SOCIAL_SPHERE_BASE_PATH || '/',
        resolve: {
            alias: {
                css: path.resolve(__dirname, 'src/assets/css'),
                staticImages: path.resolve(__dirname, 'src/assets/images'),
            },
        },
    };
});
