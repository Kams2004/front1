import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // Automatically detects language preference

// Import translation files
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import adminTranslationEN from './locales/en/admin.json'; // Corrected import path
import adminTranslationFR from './locales/fr/admin.json'; // Corrected import path

// Define resources
const resources = {
  en: {
    translation: translationEN,
    admin: adminTranslationEN, // Include admin translations
  },
  fr: {
    translation: translationFR,
    admin: adminTranslationFR, // Include admin translations
  },
};

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
