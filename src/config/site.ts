/**
 * Central configuration for Kolkata Almirah Care.
 * Update SITE_DOMAIN when connecting your paid custom domain on GitHub Pages.
 */
export const SITE_CONFIG = {
  businessName: 'Kolkata Almirah Care',
  businessNameBn: 'কলকাতা আলমারি কেয়ার',
  // Configurable canonical domain (no trailing slash). Replace with your real custom domain.
  siteDomain: 'https://kolkataalmirahcare.in',
  phoneRaw: '7003821400',
  phoneDisplay: '+91 7003821400',
  phoneHref: 'tel:+917003821400',
  whatsappNumber: '917003821400',
  workingHoursEn: 'Every day, 9:00 AM – 8:00 PM',
  workingHoursBn: 'প্রতিদিন সকাল ৯:০০ – রাত ৮:০০',
  workingHoursNoteEn: 'Please call or WhatsApp to confirm doorstep slot availability.',
  workingHoursNoteBn: 'হোম সার্ভিসের সময় নিশ্চিত করতে কল বা হোয়াটসঅ্যাপ করুন।',
  primaryLocationEn: 'Kolkata, West Bengal, India',
  primaryLocationBn: 'কলকাতা, পশ্চিমবঙ্গ, ভারত',
  // Google Tools Integration placeholders (leave empty until real IDs are ready)
  ga4MeasurementId: '',
  googleSearchConsoleCode: '',
  // Optional: Add your verified Google Business Profile / Google Maps share URL when live
  googleBusinessProfileUrl: '',
} as const;

export function getCanonicalBase(): string {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // When deployed on a custom domain, runtime origin matches; fallback to configured siteDomain
    if (!window.location.hostname.includes('run.app')) {
      return window.location.origin;
    }
  }
  return SITE_CONFIG.siteDomain;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
