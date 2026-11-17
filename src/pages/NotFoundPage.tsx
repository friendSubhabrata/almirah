import { Home, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';

interface NotFoundPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export function NotFoundPage({ lang, onNavigate }: NotFoundPageProps) {
  return (
    <div className="bg-slate-50 py-20 px-4 sm:px-6">
      <div className="max-w-[600px] mx-auto bg-white border border-slate-200 rounded-xl p-8 sm:p-10">
        <p className="text-xs font-semibold text-orange-700 mb-2">404 · Page Not Found</p>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F2547] mb-3">
          {lang === 'en' ? 'We could not find that page' : 'আপনার খোঁজা পাতাটি পাওয়া যায়নি'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          {lang === 'en'
            ? 'The link may have changed or the web address may be mistyped. Return to our home page or call us directly for doorstep almirah painting and repairing in Kolkata.'
            : 'লিঙ্কটি পরিবর্তিত হতে পারে বা ভুল ঠিকানা লেখা হয়েছে। হোম পেজে ফিরে যান অথবা সরাসরি কল করুন।'}
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F2547] hover:bg-slate-800 text-white text-sm font-semibold"
          >
            <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{lang === 'en' ? 'Back to Home' : 'হোম পেজে যান'}</span>
          </a>
          <a
            href={SITE_CONFIG.phoneHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">{UI_COPY.cta.callNow[lang]}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
