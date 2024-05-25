import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        dev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      },
    }),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/process.env.VITE_API_URL/g, process.env.VITE_API_URL);
      }
    }
  ],
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
    },
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        dir: 'public/build',
        entryFileNames: 'bundle.js',
        format: 'iife',
        name: 'app'
      }
    }
  },
  server: {
    open: true,  // Automatically open the app in the browser
    port: 3000,  // Specify the port
  },
});
