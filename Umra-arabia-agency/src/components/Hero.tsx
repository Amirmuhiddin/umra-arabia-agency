import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleSearch = () => {
    if (selectedPackage) {
      const packagesSection = document.getElementById('packages');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen pt-20">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&q=80&w=2000"
            alt="Masjid Al Haram"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>
        </motion.div>
      </div>

      <div className="relative z-10 px-4 py-32 md:py-48 max-w-7xl mx-auto text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-shadow leading-tight"
        >
          {t('hero.title')}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-12 max-w-2xl text-shadow"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-effect rounded-2xl p-8 max-w-4xl backdrop-blur-md border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              <select 
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23D4AF37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="" disabled>{t('hero.search.destination')}</option>
                <option value="umrah" className="text-gray-900">{t('packages.umrah')}</option>
                <option value="historical" className="text-gray-900">{t('packages.historical')}</option>
                <option value="luxury" className="text-gray-900">{t('packages.luxury')}</option>
              </select>
            </div>
            
            <button 
              onClick={handleSearch}
              disabled={!selectedPackage}
              className={`golden-gradient text-[#1B4D3E] py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${!selectedPackage && 'opacity-50 cursor-not-allowed'}`}
            >
              {t('hero.search.button')}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F5E6D3] to-transparent"></div>
    </div>
  );
};

export default Hero;