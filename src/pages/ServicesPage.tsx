import { Check, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { SERVICES_LIST } from '../data/services';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';

interface ServicesPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export function ServicesPage({ lang, onNavigate }: ServicesPageProps) {
  return (
    <div className="bg-slate-50 py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Breadcrumbs
          lang={lang}
          onNavigate={onNavigate}
          items={[
            { label: UI_COPY.nav.home[lang], href: '/' },
            { label: UI_COPY.nav.services[lang] },
          ]}
        />

        <div className="max-w-3xl mb-10">
          <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-2">
            {lang === 'en'
              ? 'Doorstep Home Services · Kolkata & Nearby Areas'
              : 'বাড়িতে গিয়ে পরিষেবা · কলকাতা ও পার্শ্ববর্তী এলাকা'}
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2547] mb-4">
            {lang === 'en'
              ? 'Steel & Godrej Almirah Painting and Repairing Services'
              : 'স্টিল ও গোদরেজ আলমারি রং ও মেরামতির সম্পূর্ণ পরিষেবা'}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            {lang === 'en'
              ? 'Every service listed below is carried out at your home by experienced craftsmen. Call or message us on WhatsApp with photos of your almirah for an estimate and slot confirmation.'
              : 'নিচের প্রতিটি পরিষেবা অভিজ্ঞ কারিগরদের মাধ্যমে আপনার বাড়িতে গিয়েই সম্পন্ন করা হয়। খরচের ধারণা ও ভিজিটের সময়ের জন্য কল বা হোয়াটসঅ্যাপে আলমারির ছবি পাঠান।'}
          </p>
        </div>

        <div className="space-y-8">
          {SERVICES_LIST.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <div className="lg:col-span-4 bg-slate-100">
                <ResilientImage
                  imageKey={service.imageKey}
                  lang={lang}
                  showCaption
                  className="w-full h-full min-h-[220px] object-cover"
                />
              </div>

              <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2 tabular-nums">
                    <span>{lang === 'en' ? `Service ${String(index + 1).padStart(2, '0')}` : `পরিষেবা ${String(index + 1).padStart(2, '0')}`}</span>
                    <span>·</span>
                    <span>{lang === 'en' ? 'Doorstep Home Service' : 'হোম সার্ভিস'}</span>
                    {service.isGodrejRelated && (
                      <>
                        <span>·</span>
                        <span>{lang === 'en' ? 'Independent service (not affiliated with Godrej)' : 'স্বতন্ত্র পরিষেবা'}</span>
                      </>
                    )}
                  </div>

                  <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F2547] mb-3">
                    {service.title[lang]}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                    {service.fullDesc[lang]}
                  </p>

                  <h3 className="text-xs font-semibold text-[#0F2547] mb-2.5">
                    {lang === 'en' ? 'Customer Benefits' : 'গ্রাহকদের সুবিধা'}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {service.benefits[lang].map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <a
                    href={buildWhatsAppUrl(service.whatsappMessage[lang])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{UI_COPY.cta.whatsappService[lang]}</span>
                  </a>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:border-[#0F2547] text-[#0F2547] text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="tabular-nums">{UI_COPY.cta.callNow[lang]}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-600">
          {UI_COPY.disclaimer[lang]}
        </div>
      </div>
    </div>
  );
}
