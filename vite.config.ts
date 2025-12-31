import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { loadEnv, type ConfigEnv } from 'vite';
import { defineConfig } from 'vitest/config';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig((configEnv: ConfigEnv) => {
  const { mode } = configEnv;
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      vanillaExtractPlugin(),
      mode === 'analyze'
        ? visualizer({
            filename: 'dist/stats.html',
            template: 'treemap',
            gzipSize: true,
            brotliSize: true,
            open: true
          })
        : undefined
    ].filter(Boolean),
    resolve: {
      alias: {
  '@': resolve(__dirname, './src')
      }
    },
    define: {
      __APP_ENV__: env.APP_ENV
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly' as const
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        },
        sass: {
          api: 'modern-compiler'
        }
      }
    },
    build: {
      sourcemap: mode !== 'production'
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      css: true
    }
  };
});
