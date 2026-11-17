export type Language = 'en' | 'bn';

export interface LocalizedText {
  en: string;
  bn: string;
}

export type PageRoute =
  | { type: 'home' }
  | { type: 'services' }
  | { type: 'about' }
  | { type: 'service-areas' }
  | { type: 'contact' }
  | { type: 'location'; slug: string }
  | { type: 'not-found' };

export interface ServiceItem {
  id: string;
  imageKey: 'hero' | 'beforeRust' | 'afterPainted' | 'paintingPrep' | 'lockRepair';
  isGodrejRelated?: boolean;
  title: LocalizedText;
  shortDesc: LocalizedText;
  fullDesc: LocalizedText;
  benefits: {
    en: string[];
    bn: string[];
  };
  whatsappMessage: LocalizedText;
}

export interface LocationPageData {
  slug: string;
  areaName: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  h1: LocalizedText;
  intro: LocalizedText;
  localContextHeading: LocalizedText;
  localContextParagraphs: {
    en: string[];
    bn: string[];
  };
  commonIssuesHeading: LocalizedText;
  commonIssues: {
    en: string[];
    bn: string[];
  };
  nearbyZones: LocalizedText;
  whatsappMessage: LocalizedText;
  featuredServices: string[];
}

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}
