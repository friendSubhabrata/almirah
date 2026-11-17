import { ArrowRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { LOCATION_PAGES } from '../data/locations';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ServiceAreasPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export function ServiceAreasPage({ lang, onNavigate }: ServiceAreasPageProps) {
  return (
    <div className="bg-slate-50 py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Breadcrumbs
          lang={lang}
          onNavigate={onNavigate}
          items={[
            { label: UI_COPY.nav.home[lang], href: '/' },
            { label: UI_COPY.nav.areas[lang] },
          ]}
        />

        <div className="max-w-3xl mb-10">
          <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-2">
            {lang === 'en'
              ? 'Doorstep Service Coverage · No Physical Branch Needed'
              : 'হোম সার্ভিস এলাকা · সরাসরি বাড়িতে গিয়ে কাজ'}
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2547] mb-4">
            {lang === 'en'
              ? 'Almirah Painting & Repairing Service Areas in Kolkata'
              : 'কলকাতা ও পার্শ্ববর্তী যেসব এলাকায় আলমারি রং ও মেরামতির পরিষেবা পাবেন'}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            {lang === 'en'
              ? 'We operate purely as a mobile doorstep home-service team across Kolkata, Howrah, North 24 Parganas, and South Kolkata suburbs. Select any locality below to read local service details, or call 7003821400 to confirm availability in your neighbourhood.'
              : 'আমরা সম্পূর্ণভাবে বাড়িতে গিয়ে পরিষেবা প্রদান করি। নিচের তালিকা থেকে আপনার এলাকা নির্বাচন করে বিস্তারিত পড়ুন অথবা আপনার পাড়ায় ভিজিটের সময় জানতে 7003821400 নম্বরে কল করুন।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {LOCATION_PAGES.map((loc) => (
            <a
              key={loc.slug}
              href={`/${loc.slug}/`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/${loc.slug}/`);
              }}
              className="group bg-white border border-slate-200 hover:border-[#0F2547] rounded-xl p-6 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-orange-700 text-xs font-semibold mb-2">
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{lang === 'en' ? 'Doorstep Home Service' : 'বাড়িতে গিয়ে পরিষেবা'}</span>
                </div>
                <h2 className="font-display font-bold text-xl text-[#0F2547] mb-2">
                  {loc.areaName[lang]}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {loc.intro[lang]}
                </p>
                <p className="text-xs text-slate-500 mb-4">{loc.nearbyZones[lang]}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-[#0F2547] group-hover:text-orange-700">
                <span>{lang === 'en' ? 'View local details' : 'এলাকার বিস্তারিত দেখুন'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>

        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-xl text-[#0F2547] mb-1">
              {lang === 'en'
                ? 'Located in a nearby Kolkata suburb not listed above?'
                : 'আপনার এলাকা তালিকায় না থাকলে বা পার্শ্ববর্তী এলাকায় হলে'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'en'
                ? 'Call or message us on WhatsApp with your pin code or landmark to confirm doorstep visit availability.'
                : 'আপনার ঠিকানা বা নিকটবর্তী ল্যান্ডমার্ক জানিয়ে ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">{UI_COPY.cta.callNow[lang]}</span>
            </a>
            <a
              href={buildWhatsAppUrl(UI_COPY.home.heroDefaultWhatsapp[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F2547] hover:bg-slate-800 text-white text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{UI_COPY.cta.whatsappNow[lang]}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
