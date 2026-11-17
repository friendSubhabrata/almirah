import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { LOCATION_PAGES } from '../data/locations';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';
import { BrandMark } from './BrandMark';

interface FooterProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export function Footer({ lang, onNavigate }: FooterProps) {
  const quickLinks = [
    { path: '/', label: UI_COPY.nav.home[lang] },
    { path: '/services/', label: UI_COPY.nav.services[lang] },
    { path: '/service-areas/', label: UI_COPY.nav.areas[lang] },
    { path: '/about/', label: UI_COPY.nav.about[lang] },
    { path: '/contact/', label: UI_COPY.nav.contact[lang] },
  ];

  const featuredAreas = LOCATION_PAGES.slice(0, 8);

  return (
    <footer className="bg-[#0F2547] text-slate-200 pb-20 md:pb-0">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Contact */}
          <div>
            <div className="flex items-center gap-2.5 text-white font-display font-bold text-lg mb-3">
              <BrandMark className="w-8 h-8 shrink-0" />
              <span>{lang === 'en' ? SITE_CONFIG.businessName : SITE_CONFIG.businessNameBn}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              {lang === 'en'
                ? '10+ years of experience providing doorstep steel and Godrej almirah painting and repairing across Kolkata and nearby areas.'
                : 'কলকাতা ও পার্শ্ববর্তী এলাকায় ১০ বছরেরও বেশি অভিজ্ঞতার সঙ্গে বাড়িতে গিয়ে স্টিল ও গোদরেজ আলমারি রং ও মেরামতির পরিষেবা।'}
            </p>
            <div className="space-y-2.5 text-sm">
              <a
                href={SITE_CONFIG.phoneHref}
                className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-orange-400 shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsAppUrl(UI_COPY.home.heroDefaultWhatsapp[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-orange-400 shrink-0" aria-hidden="true" />
                <span>WhatsApp: {SITE_CONFIG.phoneRaw}</span>
              </a>
              <div className="flex items-start gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{lang === 'en' ? SITE_CONFIG.workingHoursEn : SITE_CONFIG.workingHoursBn}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{lang === 'en' ? SITE_CONFIG.primaryLocationEn : SITE_CONFIG.primaryLocationBn}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              {lang === 'en' ? 'Quick Navigation' : 'গুরুত্বপূর্ণ লিংক'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    className="text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 & 4: Location Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-4">
              {lang === 'en' ? 'Doorstep Service Areas in Kolkata' : 'কলকাতায় আমাদের পরিষেবা এলাকা'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {featuredAreas.map((loc) => (
                <a
                  key={loc.slug}
                  href={`/${loc.slug}/`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/${loc.slug}/`);
                  }}
                  className="text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  {loc.areaName[lang]}
                </a>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="/service-areas/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/service-areas/');
                }}
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline underline-offset-4"
              >
                {lang === 'en' ? 'View all 12 Kolkata service areas →' : 'সব ১২টি পরিষেবা এলাকা দেখুন →'}
              </a>
            </div>
          </div>
        </div>

        {/* Independent Service Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-700/70 space-y-3 text-xs text-slate-400">
          <p>{UI_COPY.disclaimer[lang]}</p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p>
              © {new Date().getFullYear()} {SITE_CONFIG.businessName}.{' '}
              {lang === 'en' ? 'Doorstep Home Service in Kolkata.' : 'কলকাতায় বাড়িতে গিয়ে আলমারি পরিষেবা।'}
            </p>
            {SITE_CONFIG.googleBusinessProfileUrl && (
              <a
                href={SITE_CONFIG.googleBusinessProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white underline underline-offset-4"
              >
                {lang === 'en' ? 'Google Business Profile' : 'গুগল বিজনেস প্রোফাইল'}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
