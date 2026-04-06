import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => changeLanguage('zh')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'zh'
            ? 'bg-white text-rose-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-rose-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
