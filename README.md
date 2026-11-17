# Kolkata Almirah Care

Bilingual (English & Bengali), mobile-first static business website for **Kolkata Almirah Care** — doorstep steel and Godrej almirah painting and repairing across Kolkata and nearby suburbs.

> **Important Business Notice:** Kolkata Almirah Care is an independent home-service provider. It is not affiliated with, partnered with, or authorized by Godrej.

---

## Project Folder Structure

```text
├── .github/workflows/
│   └── deploy.yml                  # Automated GitHub Pages static deployment workflow
├── public/
│   ├── 404.html                    # Custom bilingual 404 page for GitHub Pages
│   ├── CNAME.example               # Template CNAME file for custom domain
│   ├── favicon.svg                 # Brand SVG favicon
│   ├── logo.svg                    # Standalone brand SVG logo
│   ├── robots.txt                  # Search engine crawl directives
│   └── sitemap.xml                 # XML sitemap covering all 17 routes
├── src/
│   ├── assets/images/              # Local generated sample images (replace with real photos)
│   ├── components/
│   │   ├── BeforeAfterSlider.tsx   # Interactive before/after comparison slider
│   │   ├── BrandMark.tsx           # Inline SVG logo mark
│   │   ├── Breadcrumbs.tsx         # Accessible breadcrumb navigation
│   │   ├── FloatingConversionBar.tsx # Sticky mobile Call/WhatsApp bar & desktop WhatsApp button
│   │   ├── Footer.tsx              # Footer with links, area shortcuts & disclaimer
│   │   ├── Header.tsx              # Header with logo, navigation & EN/বাংলা switcher
│   │   ├── ResilientImage.tsx      # Image component with fallback & dimensions
│   │   └── SeoHead.tsx             # Per-route titles, meta descriptions, canonical & JSON-LD
│   ├── config/
│   │   ├── images.ts               # Central manifest for easy photo replacement
│   │   └── site.ts                 # Configurable domain, phone, WhatsApp, GA4 & GSC IDs
│   ├── data/
│   │   ├── locations.ts            # 12 unique Kolkata & suburban location pages (EN & BN)
│   │   ├── services.ts             # 8 confirmed doorstep services (EN & BN)
│   │   └── translations.ts         # Bilingual UI copy, FAQs, About & Contact copy
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LocationPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── ServiceAreasPage.tsx
│   │   └── ServicesPage.tsx
│   ├── types/i18n.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── metadata.json
├── package.json
└── vite.config.ts                  # Generates static route HTML directories in dist/
```

---

## Before Publishing Checklist

1. **Confirm Working Hours**: Currently listed as *Every day, 9:00 AM – 8:00 PM*. Confirm weekly closing days (if any) with the business owner and update `src/config/site.ts` and `src/components/SeoHead.tsx`.
2. **Replace Sample Photos**: Replace the illustrative images in `src/assets/images/` with real workshop/completed almirah photographs (`.webp` or `.jpg`) and update `src/config/images.ts` (`isIllustrative: false` and real captions).
3. **Set Your Custom Domain**:
   - Update `siteDomain` in `src/config/site.ts`.
   - Update `domain` in `vite.config.ts`.
   - Update `<loc>` URLs in `public/sitemap.xml` and `Sitemap:` URL in `public/robots.txt`.
   - Update canonical & `og:url` in `index.html`.
   - Rename `public/CNAME.example` to `public/CNAME` containing only your custom domain (e.g., `kolkataalmirahcare.in`).

---

## GitHub Pages Deployment Guide (Free Static Hosting + Custom Domain)

### 1. Create a GitHub Repository
1. Log in to GitHub and click **New repository**.
2. Name it (for example, `kolkata-almirah-care`) and keep it **Public** (required for free GitHub Pages on standard accounts).

### 2. Upload Files to GitHub
Push this entire project to the `main` branch:
```bash
git init
git add .
git commit -m "Initial commit: Kolkata Almirah Care website"
git branch -M main
git remote add origin https://github.com/<your-username>/kolkata-almirah-care.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Open your repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` workflow will automatically run `npm run build` (generating `dist/` with static HTML files for all 17 routes, `sitemap.xml`, `robots.txt`, and `404.html`) and publish your site.

### 4. Connect a Paid Custom Domain
1. Ensure `public/CNAME` contains your exact domain (e.g., `kolkataalmirahcare.in` or `www.kolkataalmirahcare.in`).
2. In GitHub → **Settings** → **Pages** → **Custom domain**, enter your domain and click **Save**.

### 5. Configure DNS Records at Your Domain Registrar
For an apex domain (`yourdomain.in`), add these four `A` records pointing to GitHub Pages:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

For `www.yourdomain.in`, add a `CNAME` record:
- **Host / Name**: `www`
- **Target / Value**: `<your-username>.github.io`

### 6. Enable HTTPS
Wait for DNS propagation (usually 15 minutes to a few hours), then return to **Settings → Pages** and check **Enforce HTTPS**.

### 7. Google Tools Integration (Search Console, Analytics 4 & Business Profile)
- **Google Search Console**:
  1. Add your custom domain property in Google Search Console.
  2. Copy the HTML verification meta tag into `index.html` (replacing the commented `google-site-verification` tag) and rebuild.
  3. Open **Sitemaps** in Search Console and submit `https://yourdomain.in/sitemap.xml`.
- **Google Analytics 4 (GA4)**:
  1. Create a GA4 property and copy your `G-XXXXXXXXXX` measurement ID.
  2. Uncomment the GA4 script block in `index.html` and insert your real ID.
- **Google Business Profile**:
  1. Set up your service-area Google Business Profile (hide street address if operating strictly as a doorstep home service).
  2. Paste your Google Maps / Business Profile share URL into `googleBusinessProfileUrl` inside `src/config/site.ts`.
