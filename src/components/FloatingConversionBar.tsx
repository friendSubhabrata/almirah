import { MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { UI_COPY } from '../data/translations';
import { Language } from '../types/i18n';

interface FloatingConversionBarProps {
  lang: Language;
  whatsappText?: string;
}

export function FloatingConversionBar({ lang, whatsappText }: FloatingConversionBarProps) {
  const message = whatsappText || UI_COPY.home.heroDefaultWhatsapp[lang];
  const whatsappUrl = buildWhatsAppUrl(message);

  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 px-4 py-3 rounded-full bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
        aria-label={UI_COPY.cta.whatsappNow[lang]}
      >
        <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="whitespace-nowrap">{UI_COPY.cta.whatsappNow[lang]}</span>
      </a>

      {/* Mobile Compact Sticky Conversion Bar (52px height, well under 15% mobile viewport cap) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-[52px] bg-white border-t border-slate-200 grid grid-cols-2">
        <a
          href={SITE_CONFIG.phoneHref}
          className="flex items-center justify-center gap-2 bg-[#0F2547] text-white text-sm font-semibold active:bg-slate-900"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{UI_COPY.cta.callShort[lang]}</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-orange-600 text-white text-sm font-semibold active:bg-orange-700"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{UI_COPY.cta.whatsappShort[lang]}</span>
        </a>
      </div>
    </>
  );
}
