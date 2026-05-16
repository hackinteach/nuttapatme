import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

/**
 * Inject a <link rel="preload"> for the Inter Latin font into every
 * built index.html. The font is on the LCP critical chain (HTML -> CSS
 * -> font-face -> font), and preloading it lets the browser kick off
 * the fetch in parallel with the CSS instead of waiting for the CSS
 * to be parsed. Worth roughly 200-400ms LCP on mobile.
 *
 * Filename is hash-suffixed per build; we discover the real name from
 * the build manifest at HTML-emit time so this stays in sync.
 */
function preloadCriticalFont(): Plugin {
  return {
    name: 'preload-critical-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle;
        if (!bundle) return html;

        const interLatin = Object.keys(bundle).find((k) =>
          /inter-latin-wght-normal-.*\.woff2$/.test(k),
        );
        if (!interLatin) return html;

        const tag =
          `    <link rel="preload" href="/${interLatin}" ` +
          `as="font" type="font/woff2" crossorigin>\n`;
        return html.replace('</head>', `${tag}  </head>`);
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadCriticalFont()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hire: resolve(__dirname, 'hire/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
      },
      output: {
        // Stable, descriptive filenames. CSS lives in one bundle named
        // `styles-[hash].css` regardless of which JS chunk pulls it in.
        assetFileNames: (info) => {
          const name = info.names?.[0] ?? info.name ?? '';
          if (name.endsWith('.css')) return 'assets/styles-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
        // Put all node_modules into a single `vendor` chunk so it gets a
        // stable, descriptive filename instead of being named after the
        // largest app-side importer (e.g. `CookieBanner-….js`).
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
})
