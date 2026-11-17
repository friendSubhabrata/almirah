import { useState } from 'react';
import { SITE_IMAGES } from '../config/images';
import { Language } from '../types/i18n';

interface ResilientImageProps {
  imageKey: keyof typeof SITE_IMAGES;
  lang: Language;
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
}

export function ResilientImage({
  imageKey,
  lang,
  className = 'w-full h-full object-cover',
  priority = false,
  showCaption = false,
}: ResilientImageProps) {
  const asset = SITE_IMAGES[imageKey];
  const [failed, setFailed] = useState(false);

  return (
    <figure className="relative w-full h-full overflow-hidden bg-slate-100">
      {!failed ? (
        <img
          src={asset.src}
          alt={asset.alt[lang]}
          width={asset.width}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={className}
        />
      ) : (
        <div
          className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
          role="img"
          aria-label={asset.alt[lang]}
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="w-12 h-12 mb-3 text-orange-400"
            aria-hidden="true"
          >
            <rect x="10" y="6" width="28" height="34" rx="2" stroke="currentColor" strokeWidth="2.4" />
            <line x1="24" y1="6" x2="24" y2="40" stroke="currentColor" strokeWidth="2" />
            <rect x="19.5" y="20" width="2" height="6" rx="1" fill="currentColor" />
            <rect x="26.5" y="20" width="2" height="6" rx="1" fill="currentColor" />
          </svg>
          <p className="text-sm font-semibold text-white">{asset.caption[lang]}</p>
        </div>
      )}
      {showCaption && (
        <figcaption className="px-3 py-2 text-xs text-slate-600 bg-slate-50 border-t border-slate-200">
          {asset.caption[lang]}
        </figcaption>
      )}
    </figure>
  );
}
