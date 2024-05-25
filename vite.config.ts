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
    outDir: 'dist', // Ensure this is your intended build output directory
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: '[name].js',
        format: 'iife',
        name: 'app',
        dir: 'dist'
      }
    }
  },
  publicDir: 'public', // Ensure this is the directory for your static assets
  server: {
    open: true,
    port: 8080,
  },
});
