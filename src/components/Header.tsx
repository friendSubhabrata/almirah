import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';
import { BrandMark } from './BrandMark';

interface HeaderProps {
  lang: Language;
  onToggleLang: (next: Language) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Header({ lang, onToggleLang, currentPath, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: UI_COPY.nav.home[lang] },
    { path: '/services/', label: UI_COPY.nav.services[lang] },
    { path: '/service-areas/', label: UI_COPY.nav.areas[lang] },
    { path: '/about/', label: UI_COPY.nav.about[lang] },
    { path: '/contact/', label: UI_COPY.nav.contact[lang] },
  ];

  const isActive = (itemPath: string) => {
    if (itemPath === '/') return currentPath === '/';
    return currentPath.startsWith(itemPath.replace(/\/$/, ''));
  };

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single-line Brand Zone */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="flex items-center gap-2.5 text-[#0F2547] font-display font-bold text-base sm:text-lg tracking-tight whitespace-nowrap shrink-0"
        >
          <BrandMark className="w-8 h-8 shrink-0" />
          <span>{lang === 'en' ? SITE_CONFIG.businessName : SITE_CONFIG.businessNameBn}</span>
        </a>

        {/* Zone 2: Concise single-line Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600" aria-label="Primary">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.path);
                }}
                className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                  active
                    ? 'text-[#0F2547] border-orange-600 font-semibold'
                    : 'border-transparent hover:text-[#0F2547] hover:border-slate-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher & Primary Call Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5"
            role="group"
            aria-label={lang === 'en' ? 'Language selector' : 'ভাষা নির্বাচন'}
          >
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'en' ? 'bg-[#0F2547] text-white' : 'text-slate-600 hover:text-[#0F2547]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('bn')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'bn' ? 'bg-[#0F2547] text-white' : 'text-slate-600 hover:text-[#0F2547]'
              }`}
            >
              বাংলা
            </button>
          </div>

          <a
            href={SITE_CONFIG.phoneHref}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">{UI_COPY.cta.callNow[lang]}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-[#0F2547] hover:bg-slate-50 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={lang === 'en' ? 'Toggle navigation menu' : 'মেনু খুলুন বা বন্ধ করুন'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.path);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active ? 'bg-slate-100 text-[#0F2547] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
