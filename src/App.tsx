import { useEffect, useState } from 'react';
import { getLocationBySlug } from './data/locations';
import { UI_COPY } from './data/translations';
import { Language, PageRoute } from './types/i18n';
import { FloatingConversionBar } from './components/FloatingConversionBar';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SeoHead } from './components/SeoHead';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { LocationPage } from './pages/LocationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ServicesPage } from './pages/ServicesPage';

const LANG_STORAGE_KEY = 'kac_lang';

function normalizePathname(raw: string): string {
  const clean = raw.split('?')[0].split('#')[0] || '/';
  if (clean === '/' || clean === '/index.html') return '/';
  const withoutIndex = clean.replace(/\/index\.html$/, '');
  return withoutIndex.endsWith('/') ? withoutIndex : `${withoutIndex}/`;
}

function resolveRoute(pathname: string): PageRoute {
  const normalized = normalizePathname(pathname);
  if (normalized === '/') return { type: 'home' };
  if (normalized === '/services/') return { type: 'services' };
  if (normalized === '/about/') return { type: 'about' };
  if (normalized === '/service-areas/') return { type: 'service-areas' };
  if (normalized === '/contact/') return { type: 'contact' };

  const slug = normalized.replace(/^\/|\/$/g, '');
  if (getLocationBySlug(slug)) {
    return { type: 'location', slug };
  }

  return { type: 'not-found' };
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang === 'bn' || urlLang === 'en') return urlLang;
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'bn' || saved === 'en') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'en';
}

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePathname(window.location.pathname) : '/'
  );

  const route = resolveRoute(currentPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleLang = (next: Language) => {
    setLang(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // Ignore storage access errors
    }
  };

  const handleNavigate = (targetPath: string) => {
    const normalized = normalizePathname(targetPath);
    if (normalized !== currentPath) {
      window.history.pushState({}, '', normalized);
      setCurrentPath(normalized);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeWhatsappText =
    route.type === 'location'
      ? getLocationBySlug(route.slug)?.whatsappMessage[lang]
      : UI_COPY.home.heroDefaultWhatsapp[lang];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <SeoHead route={route} lang={lang} currentPath={currentPath} />

      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {route.type === 'home' && <HomePage lang={lang} onNavigate={handleNavigate} />}
        {route.type === 'services' && <ServicesPage lang={lang} onNavigate={handleNavigate} />}
        {route.type === 'about' && <AboutPage lang={lang} onNavigate={handleNavigate} />}
        {route.type === 'service-areas' && (
          <ServiceAreasPage lang={lang} onNavigate={handleNavigate} />
        )}
        {route.type === 'contact' && <ContactPage lang={lang} onNavigate={handleNavigate} />}
        {route.type === 'location' && (
          <LocationPage slug={route.slug} lang={lang} onNavigate={handleNavigate} />
        )}
        {route.type === 'not-found' && <NotFoundPage lang={lang} onNavigate={handleNavigate} />}
      </main>

      <Footer lang={lang} onNavigate={handleNavigate} />
      <FloatingConversionBar lang={lang} whatsappText={activeWhatsappText} />
    </div>
  );
}
