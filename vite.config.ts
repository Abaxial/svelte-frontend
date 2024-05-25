import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';
import path from 'path';

// Determine the environment and load the appropriate .env file
const mode = process.env.NODE_ENV || 'development';
const envFile = mode === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        dev: mode === 'development',
      },
    }),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/process.env.VITE_API_URL/g, JSON.stringify(process.env.VITE_API_URL));
      }
    }
  ],
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: '[name].js',
        format: 'iife',
        name: 'app',
        dir: 'public/build/'
      }
    }
  },
  server: {
    open: true,
    port: 8080,
  },
});
