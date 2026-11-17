import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export function AboutPage({ lang, onNavigate }: AboutPageProps) {
  return (
    <div className="bg-white py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Breadcrumbs
          lang={lang}
          onNavigate={onNavigate}
          items={[
            { label: UI_COPY.nav.home[lang], href: '/' },
            { label: UI_COPY.nav.about[lang] },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-14">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-3">
              {UI_COPY.about.kicker[lang]}
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2547] leading-tight mb-5">
              {UI_COPY.about.h1[lang]}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              {UI_COPY.about.intro[lang]}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{UI_COPY.cta.callNow[lang]}</span>
              </a>
              <a
                href={buildWhatsAppUrl(UI_COPY.home.heroDefaultWhatsapp[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0F2547] hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{UI_COPY.cta.whatsappNow[lang]}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <ResilientImage
              imageKey="paintingPrep"
              lang={lang}
              showCaption
              className="w-full h-full min-h-[260px] object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {UI_COPY.about.pillars.map((pillar, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-slate-200 bg-slate-50">
              <p className="text-xs font-semibold text-orange-700 mb-2 tabular-nums">
                {String(idx + 1).padStart(2, '0')}.
              </p>
              <h2 className="font-display font-bold text-lg text-[#0F2547] mb-2">
                {pillar.title[lang]}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc[lang]}</p>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-[#0F2547] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-2">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{lang === 'en' ? 'Kolkata & Surrounding Areas' : 'কলকাতা ও পার্শ্ববর্তী এলাকা'}</span>
            </div>
            <p className="text-base sm:text-lg font-display font-bold mb-1">
              {lang === 'en'
                ? 'Want to check doorstep availability in your locality?'
                : 'আপনার এলাকায় হোম সার্ভিস পাওয়া যাবে কি না জানতে চান?'}
            </p>
            <p className="text-sm text-slate-300">
              {UI_COPY.disclaimer[lang]}
            </p>
          </div>
          <a
            href="/service-areas/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/service-areas/');
            }}
            className="px-5 py-3 rounded-lg bg-white text-[#0F2547] hover:bg-slate-100 text-sm font-semibold whitespace-nowrap shrink-0"
          >
            {UI_COPY.cta.checkArea[lang]}
          </a>
        </div>
      </div>
    </div>
  );
}
