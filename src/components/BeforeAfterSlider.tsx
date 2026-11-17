import { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { SITE_IMAGES } from '../config/images';
import { Language } from '../types/i18n';

interface BeforeAfterSliderProps {
  lang: Language;
}

export function BeforeAfterSlider({ lang }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [beforeFailed, setBeforeFailed] = useState(false);
  const [afterFailed, setAfterFailed] = useState(false);

  const beforeImg = SITE_IMAGES.beforeRust;
  const afterImg = SITE_IMAGES.afterPainted;

  const beforeLabel = lang === 'en' ? 'Before (Sample)' : 'আগে (নমুনা)';
  const afterLabel = lang === 'en' ? 'After (Sample)' : 'পরে (নমুনা)';
  const sliderAria =
    lang === 'en'
      ? 'Compare rusted steel almirah before painting with restored almirah after painting'
      : 'রং করার আগে ও পরের স্টিল আলমারির তুলনা করুন';

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 select-none">
        {/* After Layer (Full Base) */}
        {!afterFailed ? (
          <img
            src={afterImg.src}
            alt={afterImg.alt[lang]}
            width={afterImg.width}
            height={afterImg.height}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setAfterFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-white text-sm">
            {afterLabel}
          </div>
        )}

        {/* Before Layer (Clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          {!beforeFailed ? (
            <img
              src={beforeImg.src}
              alt={beforeImg.alt[lang]}
              width={beforeImg.width}
              height={beforeImg.height}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setBeforeFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white text-sm">
              {beforeLabel}
            </div>
          )}
        </div>

        {/* Scrim labels */}
        <span className="pointer-events-none absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-900/80 text-white text-xs font-semibold">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 px-2.5 py-1 rounded bg-orange-600/90 text-white text-xs font-semibold">
          {afterLabel}
        </span>

        {/* Divider line & handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-sm"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#0F2547] text-[#0F2547] flex items-center justify-center shadow-md">
            <MoveHorizontal className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>

        {/* Accessible Range Slider Overlay */}
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={sliderAria}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <span>
          {lang === 'en'
            ? 'Drag or use arrow keys on the slider to compare'
            : 'তুলনা দেখতে স্লাইডারটি ডানে-বাঁয়ে সরান'}
        </span>
        <span className="tabular-nums font-medium text-[#0F2547]">
          {beforeLabel}: {position}% · {afterLabel}: {100 - position}%
        </span>
      </div>
    </div>
  );
}
