import { ArrowRight, Check, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { LOCATION_PAGES, getLocationBySlug } from '../data/locations';
import { SERVICES_LIST } from '../data/services';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';

interface LocationPageProps {
  slug: string;
  lang: Language;
  onNavigate: (path: string) => void;
}

export function LocationPage({ slug, lang, onNavigate }: LocationPageProps) {
  const loc = getLocationBySlug(slug);
  if (!loc) return null;

  const featuredServices = SERVICES_LIST.filter((s) => loc.featuredServices.includes(s.id));
  const otherLocations = LOCATION_PAGES.filter((l) => l.slug !== loc.slug).slice(0, 6);
  const whatsappHref = buildWhatsAppUrl(loc.whatsappMessage[lang]);

  return (
    <div className="bg-white py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Breadcrumbs
          lang={lang}
          onNavigate={onNavigate}
          items={[
            { label: UI_COPY.nav.home[lang], href: '/' },
            { label: UI_COPY.nav.areas[lang], href: '/service-areas/' },
            { label: loc.areaName[lang] },
          ]}
        />

        {/* Hero Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pb-12 border-b border-slate-200">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-3">
              {lang === 'en'
                ? `Doorstep Home Service in ${loc.areaName.en} · 10+ Years Experience`
                : `${loc.areaName.bn}-এ বাড়িতে গিয়ে পরিষেবা · ১০+ বছরের অভিজ্ঞতা`}
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2547] leading-tight mb-4">
              {loc.h1[lang]}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-6">{loc.intro[lang]}</p>

            <div className="flex flex-wrap gap-3 mb-5">
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{UI_COPY.cta.callNow[lang]}</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0F2547] hover:bg-slate-800 text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{UI_COPY.cta.whatsappNow[lang]}</span>
              </a>
            </div>

            <p className="text-xs text-slate-500">
              {lang === 'en'
                ? `Home service availability in ${loc.areaName.en} can be confirmed directly by telephone or WhatsApp (9:00 AM – 8:00 PM). We operate on-site at your home.`
                : `${loc.areaName.bn}-এ হোম সার্ভিস পাওয়ার সময় ফোন বা হোয়াটসঅ্যাপে (সকাল ৯টা – রাত ৮টা) সরাসরি নিশ্চিত করা যায়।`}
            </p>
          </div>

          <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <ResilientImage
              imageKey="afterPainted"
              lang={lang}
              showCaption
              className="w-full h-full min-h-[240px] object-cover"
            />
          </div>
        </div>

        {/* Local Context & Common Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 border-b border-slate-200">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display font-bold text-2xl text-[#0F2547]">
              {loc.localContextHeading[lang]}
            </h2>
            {loc.localContextParagraphs[lang].map((p, idx) => (
              <p key={idx} className="text-base text-slate-600 leading-relaxed">
                {p}
              </p>
            ))}

            <div className="pt-4">
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold text-[#0F2547]">
                    {lang === 'en' ? 'Nearby Pockets Covered: ' : 'নিকটবর্তী অঞ্চলসমূহ: '}
                  </span>
                  <span>{loc.nearbyZones[lang]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 h-full">
              <h2 className="font-display font-bold text-lg text-[#0F2547] mb-4">
                {loc.commonIssuesHeading[lang]}
              </h2>
              <ul className="space-y-3 mb-6">
                {loc.commonIssues[lang].map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 pt-4 border-t border-slate-200">
                {UI_COPY.disclaimer[lang]}
              </p>
            </div>
          </div>
        </div>

        {/* Relevant Services */}
        <div className="py-12 border-b border-slate-200">
          <h2 className="font-display font-bold text-2xl text-[#0F2547] mb-6">
            {lang === 'en'
              ? `Popular Doorstep Services in ${loc.areaName.en}`
              : `${loc.areaName.bn}-এ জনপ্রিয় আলমারি পরিষেবা`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F2547] mb-2">
                    {service.title[lang]}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc[lang]}
                  </p>
                </div>
                <a
                  href={buildWhatsAppUrl(service.whatsappMessage[lang])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-700 hover:text-orange-800"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{UI_COPY.cta.whatsappService[lang]}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Service Areas */}
        <div className="pt-12">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="font-display font-bold text-xl text-[#0F2547]">
              {lang === 'en' ? 'Other Kolkata Service Areas' : 'কলকাতার অন্যান্য পরিষেবা এলাকা'}
            </h2>
            <a
              href="/service-areas/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/service-areas/');
              }}
              className="text-sm font-semibold text-orange-700 hover:text-orange-800 whitespace-nowrap"
            >
              {lang === 'en' ? 'View all areas' : 'সব এলাকা দেখুন'}
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {otherLocations.map((other) => (
              <a
                key={other.slug}
                href={`/${other.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/${other.slug}/`);
                }}
                className="flex items-center justify-between gap-2 p-4 rounded-xl border border-slate-200 hover:border-[#0F2547] bg-slate-50 transition-colors"
              >
                <span className="text-sm font-semibold text-[#0F2547]">{other.areaName[lang]}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
