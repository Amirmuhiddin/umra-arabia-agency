import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';
import LanguageSwitch from './LanguageSwitch';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 py-2">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'packages', 'about', 'services', 'contact'].map((item, index) => (
              <a
                key={item}
                href={`#${item}`}
                className={`text-lg font-medium transition-colors duration-300 animate-fade-up stagger-${index + 1} ${
                  isScrolled ? 'text-[#1B4D3E] hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                {t(`nav.${item}`)}
              </a>
            ))}
          </div>

          {/* Language Switch and Phone Icon */}
          <div className="hidden md:flex items-center space-x-6">
            <LanguageSwitch isScrolled={isScrolled} />
            <a
              href="tel:+998331619999"
              className="golden-gradient w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition-all duration-300 transform hover:scale-110 shadow-lg animate-fade-up"
              title="+99833 161 9999"
            >
              <Phone className="w-5 h-5 text-[#1B4D3E]" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitch isScrolled={isScrolled} />
            <a
              href="tel:+998331619999"
              className="golden-gradient w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-all duration-300 shadow-md"
              title="+99833 161 9999"
            >
              <Phone className="w-4 h-4 text-[#1B4D3E]" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${
                isScrolled ? 'text-[#1B4D3E]' : 'text-white'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {['home', 'packages', 'about', 'services', 'contact'].map((item, index) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-medium text-[#1B4D3E] hover:text-[#D4AF37] transition-colors animate-fade-left stagger-${index + 1}`}
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;