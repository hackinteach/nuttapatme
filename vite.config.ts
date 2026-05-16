import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hire: resolve(__dirname, 'hire/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
      },
      output: {
        // Stable, descriptive filenames. CSS lives in one bundle named
        // `styles-[hash].css` regardless of which JS chunk pulls it in —
        // otherwise Rollup picks the name from the largest importer, which
        // surfaced misleading names like `CookieBanner-….css` in network
        // logs even though that file contains the whole site stylesheet.
        assetFileNames: (info) => {
          const name = info.names?.[0] ?? info.name ?? '';
          if (name.endsWith('.css')) return 'assets/styles-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
