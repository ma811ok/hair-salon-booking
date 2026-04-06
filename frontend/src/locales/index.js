import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh.json';
import en from './en.json';

const resources = {
  zh: { translation: zh },
  en: { translation: en }
};

// Get saved language or default to Chinese
const savedLanguage = localStorage.getItem('language') || 'zh';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
