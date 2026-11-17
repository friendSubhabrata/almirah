interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'w-8 h-8' }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="10" fill="#0F2547" />
      <rect x="11" y="8" width="26" height="30" rx="2" stroke="#FFFFFF" strokeWidth="2.4" />
      <line x1="24" y1="8" x2="24" y2="38" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="19" y="20" width="2.2" height="6" rx="1.1" fill="#F97316" />
      <rect x="26.8" y="20" width="2.2" height="6" rx="1.1" fill="#F97316" />
      <path d="M15 38v3.5M33 38v3.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
