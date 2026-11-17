import { ChevronRight } from 'lucide-react';
import { Language } from '../types/i18n';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  lang: Language;
}

export function Breadcrumbs({ items, onNavigate, lang }: BreadcrumbsProps) {
  return (
    <nav
      aria-label={lang === 'en' ? 'Breadcrumb' : 'ব্রেডক্রাম্ব'}
      className="text-xs sm:text-sm text-slate-600 mb-6"
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />}
              {isLast || !item.href ? (
                <span className="font-medium text-[#0F2547]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.href!);
                  }}
                  className="hover:text-[#0F2547] underline-offset-4 hover:underline transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
