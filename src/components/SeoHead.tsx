import { useEffect } from 'react';
import { SITE_CONFIG, getCanonicalBase } from '../config/site';
import { FAQS_LIST, UI_COPY } from '../data/translations';
import { getLocationBySlug } from '../data/locations';
import { Language, PageRoute } from '../types/i18n';

interface SeoHeadProps {
  route: PageRoute;
  lang: Language;
  currentPath: string;
}

function setMetaTag(selector: string, attrName: 'name' | 'property', attrVal: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SeoHead({ route, lang, currentPath }: SeoHeadProps) {
  useEffect(() => {
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';

    const base = getCanonicalBase();
    const normalizedPath = currentPath === '/' ? '/' : currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
    const canonicalUrl = `${base}${normalizedPath}`;

    let title = UI_COPY.meta.homeTitle[lang];
    let description = UI_COPY.meta.homeDesc[lang];
    let areaServedList = [
      'Kolkata',
      'Salt Lake',
      'New Town',
      'Dum Dum',
      'Garia',
      'New Alipore',
      'Bhabanipur',
      'Madhyamgram',
      'Barasat',
      'Howrah',
      'Barrackpore',
    ];

    const breadcrumbItems: Array<{ name: string; item: string }> = [
      { name: UI_COPY.nav.home[lang], item: `${base}/` },
    ];

    if (route.type === 'services') {
      title = UI_COPY.meta.servicesTitle[lang];
      description = UI_COPY.meta.servicesDesc[lang];
      breadcrumbItems.push({ name: UI_COPY.nav.services[lang], item: `${base}/services/` });
    } else if (route.type === 'about') {
      title = UI_COPY.meta.aboutTitle[lang];
      description = UI_COPY.meta.aboutDesc[lang];
      breadcrumbItems.push({ name: UI_COPY.nav.about[lang], item: `${base}/about/` });
    } else if (route.type === 'service-areas') {
      title = UI_COPY.meta.areasTitle[lang];
      description = UI_COPY.meta.areasDesc[lang];
      breadcrumbItems.push({ name: UI_COPY.nav.areas[lang], item: `${base}/service-areas/` });
    } else if (route.type === 'contact') {
      title = UI_COPY.meta.contactTitle[lang];
      description = UI_COPY.meta.contactDesc[lang];
      breadcrumbItems.push({ name: UI_COPY.nav.contact[lang], item: `${base}/contact/` });
    } else if (route.type === 'location') {
      const loc = getLocationBySlug(route.slug);
      if (loc) {
        title = loc.seoTitle[lang];
        description = loc.seoDescription[lang];
        areaServedList = [loc.areaName.en, 'Kolkata'];
        breadcrumbItems.push({ name: UI_COPY.nav.areas[lang], item: `${base}/service-areas/` });
        breadcrumbItems.push({ name: loc.areaName[lang], item: canonicalUrl });
      }
    } else if (route.type === 'not-found') {
      title = lang === 'en' ? 'Page Not Found | Kolkata Almirah Care' : 'পাতা পাওয়া যায়নি | কলকাতা আলমারি কেয়ার';
      description =
        lang === 'en'
          ? 'The requested page could not be found on Kolkata Almirah Care.'
          : 'আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।';
    }

    document.title = title;
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // Optional Google Search Console verification tag from config
    if (SITE_CONFIG.googleSearchConsoleCode) {
      setMetaTag(
        'meta[name="google-site-verification"]',
        'name',
        'google-site-verification',
        SITE_CONFIG.googleSearchConsoleCode
      );
    }

    // Structured Data (JSON-LD) without fabricated address, coordinates, ratings, or priceRange
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: `${base}/`,
        name: SITE_CONFIG.businessName,
        inLanguage: lang === 'bn' ? 'bn-IN' : 'en-IN',
      },
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': `${base}/#business`,
        name: SITE_CONFIG.businessName,
        url: `${base}/`,
        telephone: '+91-7003821400',
        description:
          'Independent doorstep steel and Godrej almirah painting and repairing service across Kolkata and nearby areas with 10+ years of experience.',
        areaServed: areaServedList.map((city) => ({
          '@type': 'City',
          name: city,
        })),
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '09:00',
            closes: '20:00',
          },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-7003821400',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Bengali'],
        },
      },
      {
        '@type': 'Service',
        serviceType: 'Steel and Godrej Almirah Painting and Repairing at Home',
        provider: {
          '@id': `${base}/#business`,
        },
        areaServed: areaServedList.map((city) => ({
          '@type': 'City',
          name: city,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.item,
        })),
      },
    ];

    if (route.type === 'home') {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: FAQS_LIST.map((faq) => ({
          '@type': 'Question',
          name: faq.question[lang],
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer[lang],
          },
        })),
      });
    }

    const ldJson = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    let ldScript = document.getElementById('kac-structured-data') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'kac-structured-data';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(ldJson);
  }, [route, lang, currentPath]);

  return null;
}
