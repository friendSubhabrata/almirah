import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

interface StaticRouteMeta {
  route: string;
  title: string;
  description: string;
}

const STATIC_ROUTES_SEO: StaticRouteMeta[] = [
  {
    route: 'services',
    title: 'Almirah Painting & Repairing Services in Kolkata | Kolkata Almirah Care',
    description:
      'Doorstep steel almirah painting, Godrej almirah repairing, rust removal, hinge alignment, and lock repair across Kolkata. Call 7003821400.',
  },
  {
    route: 'about',
    title: 'About Kolkata Almirah Care | 10+ Years Doorstep Almirah Experts',
    description:
      'Independent home-service specialists with 10+ years of experience in steel and Godrej almirah painting and repairing across Kolkata and suburbs.',
  },
  {
    route: 'service-areas',
    title: 'Service Areas in Kolkata & Suburbs | Kolkata Almirah Care',
    description:
      'Doorstep almirah painting and repair across Kolkata, Salt Lake, New Town, Dum Dum, Garia, New Alipore, Bhabanipur, Howrah, Barasat, and Barrackpore.',
  },
  {
    route: 'contact',
    title: 'Contact Kolkata Almirah Care | Call or WhatsApp 7003821400',
    description:
      'Book doorstep steel or Godrej almirah painting and repair in Kolkata. Call or WhatsApp 7003821400 between 9:00 AM and 8:00 PM.',
  },
  {
    route: 'steel-almirah-painting-kolkata',
    title: 'Steel Almirah Painting in Kolkata | Doorstep Home Service',
    description:
      'Doorstep steel almirah painting in Kolkata with rust removal, anti-rust primer, and smooth enamel finish. 10+ years experience. Call 7003821400.',
  },
  {
    route: 'godrej-almirah-repair-kolkata',
    title: 'Godrej Almirah Repair in Kolkata | Independent Home Service',
    description:
      'Independent doorstep repair and painting for Godrej steel almirahs in Kolkata. Locks, central rods, hinges, and rust repair. Call 7003821400.',
  },
  {
    route: 'almirah-painting-salt-lake',
    title: 'Almirah Painting in Salt Lake (Bidhannagar) | Home Service',
    description:
      'Doorstep steel and Godrej almirah painting and repairing in Salt Lake Sector I–V and residential blocks. Call or WhatsApp 7003821400.',
  },
  {
    route: 'almirah-painting-dum-dum',
    title: 'Almirah Painting & Repairing in Dum Dum | Doorstep Service',
    description:
      'Steel and Godrej almirah painting, lock repair, and hinge alignment in Dum Dum, Nagerbazar, and Sinthee. Home service only. Call 7003821400.',
  },
  {
    route: 'almirah-painting-garia',
    title: 'Steel Almirah Painting in Garia | Kolkata Almirah Care',
    description:
      'Home-visit steel and Godrej almirah painting and repairing in Garia, Patuli, and Narendrapur. 10+ years experience. Call 7003821400.',
  },
  {
    route: 'almirah-painting-new-alipore',
    title: 'Almirah Painting & Godrej Repair in New Alipore | Home Service',
    description:
      'Doorstep steel and Godrej almirah painting, polishing touch-ups, and lock repair in New Alipore, Kolkata. Call or WhatsApp 7003821400.',
  },
  {
    route: 'almirah-painting-bhabanipur',
    title: 'Almirah Painting & Repair in Bhabanipur | Doorstep Service',
    description:
      'Expert doorstep repair and repainting for vintage steel and Godrej almirahs in Bhabanipur, Hazra, and Kalighat. Call 7003821400.',
  },
  {
    route: 'almirah-painting-new-town',
    title: 'Almirah Painting in New Town Kolkata | Doorstep Home Service',
    description:
      'Doorstep steel and Godrej almirah painting and repair in New Town Action Areas I, II, and III. Clean apartment-friendly service. Call 7003821400.',
  },
  {
    route: 'almirah-painting-madhyamgram',
    title: 'Almirah Painting in Madhyamgram | Doorstep Steel Almirah Care',
    description:
      'Steel and Godrej almirah painting, rust removal, and repairing at your home in Madhyamgram, Jessore Road & Chowmatha. Call 7003821400.',
  },
  {
    route: 'almirah-painting-barasat',
    title: 'Almirah Painting in Barasat | Steel & Godrej Home Service',
    description:
      'Reliable doorstep steel and Godrej almirah painting and repairing in Barasat, Colony More, and Champadali. Call or WhatsApp 7003821400.',
  },
  {
    route: 'almirah-painting-howrah',
    title: 'Almirah Painting & Repair in Howrah | Doorstep Home Service',
    description:
      'Doorstep steel and Godrej almirah painting, rust removal, and lock repair in Howrah (Shibpur, Salkia, Liluah, Santragachi). Call 7003821400.',
  },
  {
    route: 'almirah-painting-barrackpore',
    title: 'Almirah Painting & Repair in Barrackpore | Doorstep Service',
    description:
      'Doorstep steel and Godrej almirah painting and repairing across Barrackpore, Titagarh, and Khardah. 10+ years experience. Call 7003821400.',
  },
];

function escapeHtmlAttr(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }

          // Generate static route directories (e.g. dist/steel-almirah-painting-kolkata/index.html)
          // for GitHub Pages compatibility and per-route static SEO tags.
          const indexHtmlPath = path.resolve(distDir, 'index.html');
          if (fs.existsSync(indexHtmlPath)) {
            const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
            const domain = 'https://kolkataalmirahcare.in';

            for (const item of STATIC_ROUTES_SEO) {
              const routeDir = path.resolve(distDir, item.route);
              fs.mkdirSync(routeDir, { recursive: true });
              const canonical = `${domain}/${item.route}/`;
              const safeTitle = escapeHtmlAttr(item.title);
              const safeDesc = escapeHtmlAttr(item.description);

              const routeHtml = baseHtml
                .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
                .replace(
                  /<meta\s+name="description"[\s\S]*?content="[\s\S]*?"\s*\/?>/,
                  `<meta name="description" content="${safeDesc}" />`
                )
                .replace(
                  /<link rel="canonical" href="[\s\S]*?"\s*\/?>/,
                  `<link rel="canonical" href="${canonical}" />`
                )
                .replace(
                  /<meta property="og:title" content="[\s\S]*?"\s*\/?>/,
                  `<meta property="og:title" content="${safeTitle}" />`
                )
                .replace(
                  /<meta[\s\S]*?property="og:description"[\s\S]*?content="[\s\S]*?"\s*\/?>/,
                  `<meta property="og:description" content="${safeDesc}" />`
                )
                .replace(
                  /<meta property="og:url" content="[\s\S]*?"\s*\/?>/,
                  `<meta property="og:url" content="${canonical}" />`
                )
                .replace(
                  /<meta name="twitter:title" content="[\s\S]*?"\s*\/?>/,
                  `<meta name="twitter:title" content="${safeTitle}" />`
                )
                .replace(
                  /<meta[\s\S]*?name="twitter:description"[\s\S]*?content="[\s\S]*?"\s*\/?>/,
                  `<meta name="twitter:description" content="${safeDesc}" />`
                );

              fs.writeFileSync(path.resolve(routeDir, 'index.html'), routeHtml, 'utf-8');
            }
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
