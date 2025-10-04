import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {} // Will be loaded from public/locales/en.json
  },
  pt: {
    translation: {} // Will be loaded from public/locales/pt.json
  }
};

// Load translations
const loadTranslations = async () => {
  try {
    const [enData, ptData] = await Promise.all([
      fetch('/locales/en.json').then(res => res.json()),
      fetch('/locales/pt.json').then(res => res.json())
    ]);
    
    resources.en.translation = enData;
    resources.pt.translation = ptData;
  } catch (error) {
    console.error('[LocalizationService] Failed to load translations:', error);
  }
};

export const initLocalization = async () => {
  await loadTranslations();
  
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: localStorage.getItem('language') || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
  
  return i18n;
};

export const changeLanguage = (lang: 'en' | 'pt') => {
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
};

export default i18n;
