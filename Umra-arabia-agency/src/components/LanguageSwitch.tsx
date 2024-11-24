import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitchProps {
  isScrolled?: boolean;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ isScrolled = true }) => {
  const { language, setLanguage } = useLanguage();

  const buttonClass = (lang: string) => `
    px-3 py-1.5 rounded-lg font-medium transition-all duration-300
    ${language === lang
      ? 'golden-gradient text-[#1B4D3E] shadow-lg'
      : isScrolled
        ? 'text-[#1B4D3E] hover:text-[#D4AF37]'
        : 'text-white hover:text-[#D4AF37]'
    }
  `;

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setLanguage('uz')} className={buttonClass('uz')}>
        UZ
      </button>
      <button onClick={() => setLanguage('ru')} className={buttonClass('ru')}>
        RU
      </button>
      <button onClick={() => setLanguage('en')} className={buttonClass('en')}>
        EN
      </button>
    </div>
  );
};

export default LanguageSwitch;