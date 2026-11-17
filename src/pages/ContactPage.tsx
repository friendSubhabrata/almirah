import { FormEvent, useState } from 'react';
import { Check, Clock, Copy, Home, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { SERVICES_LIST } from '../data/services';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ContactPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export function ContactPage({ lang, onNavigate }: ContactPageProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES_LIST[0].id);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [preparedMessage, setPreparedMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedArea = area.trim();
    const digits = phone.replace(/\D/g, '');

    if (!trimmedName || !trimmedArea) {
      setError(
        lang === 'en'
          ? 'Please enter your name and Kolkata locality.'
          : 'অনুগ্রহ করে আপনার নাম ও এলাকার নাম লিখুন।'
      );
      return;
    }

    if (phone.trim() && digits.length < 10) {
      setError(
        lang === 'en'
          ? 'Please enter a valid 10-digit mobile number or leave it blank if contacting directly on WhatsApp.'
          : 'সঠিক ১০ সংখ্যার মোবাইল নম্বর দিন অথবা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।'
      );
      return;
    }

    setError('');
    const serviceObj = SERVICES_LIST.find((s) => s.id === selectedService) || SERVICES_LIST[0];
    const serviceLabel = serviceObj.title[lang];

    const message =
      lang === 'en'
        ? `Hello Kolkata Almirah Care,\nName: ${trimmedName}\nLocality: ${trimmedArea}${
            digits ? `\nMobile: ${digits}` : ''
          }\nService Needed: ${serviceLabel}${
            notes.trim() ? `\nDetails: ${notes.trim()}` : ''
          }\nPlease let me know doorstep visit availability.`
        : `নমস্কার কলকাতা আলমারি কেয়ার,\nনাম: ${trimmedName}\nএলাকা: ${trimmedArea}${
            digits ? `\nমোবাইল: ${digits}` : ''
          }\nপ্রয়োজনীয় পরিষেবা: ${serviceLabel}${
            notes.trim() ? `\nবিবরণ: ${notes.trim()}` : ''
          }\nবাড়িতে এসে দেখার সময় জানালে উপকৃত হব।`;

    setPreparedMessage(message);
    setCopied(false);

    const url = buildWhatsAppUrl(message);
    const popup = window.open(url, '_blank', 'noopener,noreferrer');
    if (!popup) {
      // Fallback preview already rendered cleanly below if iframe/popup blocks external window
    }
  };

  const handleCopy = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-slate-50 py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Breadcrumbs
          lang={lang}
          onNavigate={onNavigate}
          items={[
            { label: UI_COPY.nav.home[lang], href: '/' },
            { label: UI_COPY.nav.contact[lang] },
          ]}
        />

        <div className="max-w-2xl mb-10">
          <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-2">
            {UI_COPY.contact.kicker[lang]}
          </p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2547] mb-3">
            {UI_COPY.contact.h1[lang]}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">{UI_COPY.contact.sub[lang]}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="font-display font-bold text-xl text-[#0F2547] mb-1">
                {lang === 'en' ? SITE_CONFIG.businessName : SITE_CONFIG.businessNameBn}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'en'
                  ? '10+ Years of Experience · Independent Service Provider'
                  : '১০+ বছরের অভিজ্ঞতা · স্বতন্ত্র হোম সার্ভিস'}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-orange-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-slate-500">{UI_COPY.contact.infoLabels.phone[lang]}</p>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="font-semibold text-[#0F2547] hover:text-orange-700 text-base tabular-nums"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-orange-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-slate-500">{UI_COPY.contact.infoLabels.whatsapp[lang]}</p>
                  <a
                    href={buildWhatsAppUrl(UI_COPY.home.heroDefaultWhatsapp[lang])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#0F2547] hover:text-orange-700 text-base tabular-nums"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-slate-500">{UI_COPY.contact.infoLabels.hours[lang]}</p>
                  <p className="font-semibold text-[#0F2547]">
                    {lang === 'en' ? SITE_CONFIG.workingHoursEn : SITE_CONFIG.workingHoursBn}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'en' ? SITE_CONFIG.workingHoursNoteEn : SITE_CONFIG.workingHoursNoteBn}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Home className="w-4 h-4 text-orange-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-slate-500">
                    {UI_COPY.contact.infoLabels.serviceType[lang]}
                  </p>
                  <p className="font-semibold text-[#0F2547]">
                    {UI_COPY.contact.infoLabels.serviceTypeVal[lang]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-slate-500">
                    {UI_COPY.contact.infoLabels.location[lang]}
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {UI_COPY.contact.infoLabels.locationVal[lang]}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
              {UI_COPY.disclaimer[lang]}
            </div>
          </div>

          {/* Pre-filled WhatsApp Enquiry Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl text-[#0F2547] mb-2">
              {UI_COPY.contact.form.heading[lang]}
            </h2>
            <p className="text-sm text-slate-600 mb-6">{UI_COPY.contact.form.desc[lang]}</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="kac-name" className="block text-xs font-semibold text-[#0F2547] mb-1.5">
                    {UI_COPY.contact.form.nameLabel[lang]} *
                  </label>
                  <input
                    id="kac-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={UI_COPY.contact.form.namePlaceholder[lang]}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:border-[#0F2547] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="kac-phone" className="block text-xs font-semibold text-[#0F2547] mb-1.5">
                    {UI_COPY.contact.form.phoneLabel[lang]}
                  </label>
                  <input
                    id="kac-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={UI_COPY.contact.form.phonePlaceholder[lang]}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:border-[#0F2547] focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="kac-area" className="block text-xs font-semibold text-[#0F2547] mb-1.5">
                    {UI_COPY.contact.form.areaLabel[lang]} *
                  </label>
                  <input
                    id="kac-area"
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder={UI_COPY.contact.form.areaPlaceholder[lang]}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:border-[#0F2547] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="kac-service" className="block text-xs font-semibold text-[#0F2547] mb-1.5">
                    {UI_COPY.contact.form.serviceLabel[lang]}
                  </label>
                  <select
                    id="kac-service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:border-[#0F2547] focus:outline-none"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="kac-notes" className="block text-xs font-semibold text-[#0F2547] mb-1.5">
                  {UI_COPY.contact.form.notesLabel[lang]}
                </label>
                <textarea
                  id="kac-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={UI_COPY.contact.form.notesPlaceholder[lang]}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 focus:border-[#0F2547] focus:outline-none"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{UI_COPY.contact.form.submitBtn[lang]}</span>
              </button>
            </form>

            {preparedMessage && (
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-xs font-semibold text-[#0F2547]">
                  {UI_COPY.contact.form.previewHeading[lang]}
                </p>
                <pre className="whitespace-pre-wrap text-xs text-slate-700 font-sans bg-white p-3 rounded-lg border border-slate-200">
                  {preparedMessage}
                </pre>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={buildWhatsAppUrl(preparedMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{UI_COPY.contact.form.openWhatsappBtn[lang]}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 bg-white text-[#0F2547] text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                        <span>{UI_COPY.contact.form.copiedBtn[lang]}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{UI_COPY.contact.form.copyBtn[lang]}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
