import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { LOCATION_PAGES } from '../data/locations';
import { SERVICES_LIST } from '../data/services';
import { FAQS_LIST, UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export function HomePage({ lang, onNavigate }: HomePageProps) {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQS_LIST[0].id);

  const heroWhatsappUrl = buildWhatsAppUrl(UI_COPY.home.heroDefaultWhatsapp[lang]);

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-3">
                {UI_COPY.home.kicker[lang]}
              </p>
              <h1 className="font-display font-extrabold text-[#0F2547] text-[clamp(1.85rem,3.6vw,3.1rem)] leading-[1.15] tracking-tight mb-5">
                {UI_COPY.home.heroH1[lang]}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-7">
                {UI_COPY.home.heroSub[lang]}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">{UI_COPY.cta.callNow[lang]}</span>
                </a>
                <a
                  href={heroWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0F2547] hover:bg-slate-800 text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{UI_COPY.cta.whatsappNow[lang]}</span>
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {lang === 'en'
                  ? 'Independent doorstep service · Open 9:00 AM – 8:00 PM · Call to confirm your area slot'
                  : 'স্বতন্ত্র হোম সার্ভিস · সকাল ৯:০০ – রাত ৮:০০ · এলাকার সময় জানতে কল করুন'}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <ResilientImage
                  imageKey="hero"
                  lang={lang}
                  priority
                  showCaption
                  className="w-full h-full min-h-[240px] lg:min-h-[340px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* 2. 4-Column Highlights Strip below Hero */}
          <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {UI_COPY.home.highlights.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-xs font-medium text-slate-500">{item.label[lang]}</p>
                <p className="text-xl sm:text-2xl font-display font-bold text-[#0F2547] tabular-nums">
                  {item.value[lang]}
                </p>
                <p className="text-xs sm:text-sm text-slate-600">{item.detail[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Services Section */}
      <section className="bg-slate-50 py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F2547] mb-3">
                {UI_COPY.home.servicesHeading[lang]}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {UI_COPY.home.servicesSub[lang]}
              </p>
            </div>
            <a
              href="/services/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/services/');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F2547] hover:text-orange-700 whitespace-nowrap shrink-0"
            >
              <span>{UI_COPY.cta.viewServices[lang]}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES_LIST.map((service, idx) => {
              const isFeatured = idx < 2;
              return (
                <article
                  key={service.id}
                  className={`bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between ${
                    isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs text-slate-500 tabular-nums">
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                      {service.isGodrejRelated && (
                        <span>{lang === 'en' ? 'Independent service' : 'স্বতন্ত্র পরিষেবা'}</span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#0F2547] mb-2">
                      {service.title[lang]}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {service.shortDesc[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <a
                      href={buildWhatsAppUrl(service.whatsappMessage[lang])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-orange-700 hover:text-orange-800 whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{UI_COPY.cta.whatsappService[lang]}</span>
                    </a>
                    <a
                      href="/services/"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/services/');
                      }}
                      className="text-xs font-medium text-slate-500 hover:text-[#0F2547] whitespace-nowrap"
                    >
                      {lang === 'en' ? 'Details' : 'বিস্তারিত'}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="bg-white py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F2547] mb-8 max-w-2xl">
            {UI_COPY.home.whyHeading[lang]}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UI_COPY.home.whyItems.map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-slate-200 bg-slate-50/60">
                <p className="text-xs font-semibold text-orange-700 mb-2 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}.
                </p>
                <h3 className="font-display font-bold text-lg text-[#0F2547] mb-2">
                  {item.title[lang]}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Before & After Gallery Section */}
      <section className="bg-slate-50 py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F2547] mb-3">
              {UI_COPY.home.galleryHeading[lang]}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {UI_COPY.home.gallerySub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
              <BeforeAfterSlider lang={lang} />
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                <ResilientImage
                  imageKey="paintingPrep"
                  lang={lang}
                  showCaption
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                <ResilientImage
                  imageKey="lockRepair"
                  lang={lang}
                  showCaption
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>

          <p className="mt-5 text-xs text-slate-500">{UI_COPY.home.galleryNotice[lang]}</p>
        </div>
      </section>

      {/* 6. Our Working Process */}
      <section className="bg-white py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F2547] mb-8">
            {UI_COPY.home.processHeading[lang]}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {UI_COPY.home.processSteps.map((step) => (
              <div key={step.step} className="p-5 rounded-xl border border-slate-200 bg-white">
                <div className="text-sm font-bold text-orange-700 mb-3 tabular-nums">
                  {lang === 'en' ? `Step ${step.step}` : `ধাপ ${step.step}`}
                </div>
                <h3 className="font-display font-bold text-base text-[#0F2547] mb-2">
                  {step.title[lang]}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Service Areas Section */}
      <section className="bg-slate-50 py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F2547] mb-3">
                {UI_COPY.home.areasHeading[lang]}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {UI_COPY.home.areasSub[lang]}
              </p>
            </div>
            <a
              href="/service-areas/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/service-areas/');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F2547] hover:text-orange-700 whitespace-nowrap shrink-0"
            >
              <span>{UI_COPY.cta.checkArea[lang]}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {LOCATION_PAGES.map((loc) => (
              <a
                key={loc.slug}
                href={`/${loc.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/${loc.slug}/`);
                }}
                className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#0F2547] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-semibold text-[#0F2547] truncate">
                    {loc.areaName[lang]}
                  </span>
                </div>
                <ArrowRight
                  className="w-4 h-4 text-slate-400 group-hover:text-[#0F2547] shrink-0 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Customer Feedback Section (Transparent Illustrative Samples) */}
      <section className="bg-white py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F2547] mb-3">
              {UI_COPY.home.reviewsHeading[lang]}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {UI_COPY.home.reviewsSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UI_COPY.home.reviewsList.map((rev, idx) => (
              <blockquote
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
              >
                <p className="text-sm text-slate-700 leading-relaxed mb-5">{rev.quote[lang]}</p>
                <footer className="pt-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-[#0F2547]">{rev.name[lang]}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{rev.context[lang]}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="bg-slate-50 py-14 sm:py-18 border-b border-slate-200">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0F2547] mb-8">
            {UI_COPY.home.faqHeading[lang]}
          </h2>

          <div className="space-y-3">
            {FAQS_LIST.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-display font-semibold text-sm sm:text-base text-[#0F2547]">
                      {faq.question[lang]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer[lang]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Final Conversion CTA */}
      <section className="bg-[#0F2547] text-white py-14 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                {UI_COPY.home.finalCtaHeading[lang]}
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                {UI_COPY.home.finalCtaSub[lang]}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-orange-400" aria-hidden="true" />
                  {lang === 'en' ? '10+ Years Experience' : '১০+ বছরের অভিজ্ঞতা'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-orange-400" aria-hidden="true" />
                  {lang === 'en' ? '100% Doorstep Service' : 'সম্পূর্ণ হোম সার্ভিস'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-orange-400" aria-hidden="true" />
                  {lang === 'en' ? '9 AM – 8 PM Daily' : 'প্রতিদিন সকাল ৯ – রাত ৮'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base font-semibold transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{UI_COPY.cta.callNow[lang]}</span>
              </a>
              <a
                href={heroWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-[#0F2547] text-sm sm:text-base font-semibold transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{UI_COPY.cta.whatsappNow[lang]}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
