/**
 * Central image manifest.
 * Currently uses local illustrative sample images stored in /src/assets/images/.
 * To replace any photo with your real workshop or completed almirah photo,
 * place your optimized .webp or .jpg file in /src/assets/images/ and update its src path below.
 */
export interface SiteImageAsset {
  id: string;
  src: string;
  width: number;
  height: number;
  isIllustrative: boolean;
  alt: {
    en: string;
    bn: string;
  };
  caption: {
    en: string;
    bn: string;
  };
}

export const SITE_IMAGES: Record<
  'hero' | 'beforeRust' | 'afterPainted' | 'paintingPrep' | 'lockRepair',
  SiteImageAsset
> = {
  hero: {
    id: 'hero',
    src: '/src/assets/images/hero_steel_almirah_1794928311605.jpg',
    width: 1280,
    height: 720,
    isIllustrative: true,
    alt: {
      en: 'Illustrative sample of a freshly repainted steel almirah in a bright Kolkata bedroom',
      bn: 'কলকাতার শোবার ঘরে নতুন রং করা স্টিল আলমারির নমুনা ছবি',
    },
    caption: {
      en: 'Illustrative sample visual — Satin slate finish steel almirah',
      bn: 'নমুনা ছবি — স্যাটিন স্লেট ফিনিশ স্টিল আলমারি',
    },
  },
  beforeRust: {
    id: 'beforeRust',
    src: '/src/assets/images/before_rusted_almirah_1794928311940.jpg',
    width: 1024,
    height: 768,
    isIllustrative: true,
    alt: {
      en: 'Illustrative sample of an old steel almirah with peeling paint and bottom rust patches before restoration',
      bn: 'মেরামতি ও রং করার আগের মরচে ধরা পুরনো স্টিল আলমারির নমুনা ছবি',
    },
    caption: {
      en: 'Before (Illustrative sample): Faded paint and surface rust on lower panel',
      bn: 'আগের অবস্থা (নমুনা ছবি): পুরনো উঠে যাওয়া রং ও নিচের অংশে মরচে',
    },
  },
  afterPainted: {
    id: 'afterPainted',
    src: '/src/assets/images/after_painted_almirah_1794928312568.jpg',
    width: 1024,
    height: 768,
    isIllustrative: true,
    alt: {
      en: 'Illustrative sample of a restored two-tone steel almirah with aligned doors and polished handle',
      bn: 'রং ও মেরামতির পর নতুনের মতো স্টিল আলমারির নমুনা ছবি',
    },
    caption: {
      en: 'After (Illustrative sample): Rust-treated, primed, and smooth two-tone finish',
      bn: 'পরের অবস্থা (নমুনা ছবি): মরচে পরিষ্কার করে প্রাইমার ও মসৃণ রং করা আলমারি',
    },
  },
  paintingPrep: {
    id: 'paintingPrep',
    src: '/src/assets/images/doorstep_painting_prep_1794928312522.jpg',
    width: 1024,
    height: 768,
    isIllustrative: true,
    alt: {
      en: 'Illustrative sample showing doorstep sanding and anti-rust priming of a steel almirah door over a protective drop cloth',
      bn: 'বাড়িতে মেঝেতে কাপড় বিছিয়ে আলমারির পাল্লা ঘষে প্রাইমার লাগানোর নমুনা ছবি',
    },
    caption: {
      en: 'Illustrative sample: Surface sanding and anti-rust priming at home',
      bn: 'নমুনা ছবি: বাড়িতেই ঘষা-মাজা ও অ্যান্টি-রাস্ট প্রাইমারের কাজ',
    },
  },
  lockRepair: {
    id: 'lockRepair',
    src: '/src/assets/images/almirah_lock_hinge_repair_1794928313140.jpg',
    width: 1024,
    height: 768,
    isIllustrative: true,
    alt: {
      en: 'Illustrative sample of technician hands aligning steel almirah hinges and servicing the lock mechanism',
      bn: 'আলমারির কবজা ঠিক করা ও তালা মেরামতির নমুনা ছবি',
    },
    caption: {
      en: 'Illustrative sample: Hinge alignment and lock servicing at customer home',
      bn: 'নমুনা ছবি: বাড়িতে গিয়ে কবজা সেটিং ও তালা মেরামতির কাজ',
    },
  },
};
