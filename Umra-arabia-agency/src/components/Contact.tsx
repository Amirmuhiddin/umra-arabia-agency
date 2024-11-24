import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, MapPin, Clock, Map, Instagram } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeMap, setActiveMap] = useState<'google' | 'yandex'>('google');

  const coordinates = {
    lat: 41.327798,
    lng: 69.213057
  };

  const contactInfo = [
    { 
      icon: Phone, 
      title: t('contact.phone.title'), 
      content: (
        <div className="space-y-2">
          <a href="tel:+998331619999" className="block hover:text-[#D4AF37] transition-colors">
            +99833 161 9999
          </a>
          <a href="tel:+998884019999" className="block hover:text-[#D4AF37] transition-colors">
            +99888 401 9999
          </a>
        </div>
      )
    },
    { 
      icon: Instagram, 
      title: t('contact.instagram.title'), 
      content: (
        <a 
          href="https://www.instagram.com/umra_arabia_agency/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-[#D4AF37] transition-colors"
        >
          @umra_arabia_agency
        </a>
      )
    },
    { 
      icon: MapPin, 
      title: t('contact.address.title'), 
      content: t('contact.address.content')
    },
    { 
      icon: Clock, 
      title: t('contact.hours.title'), 
      content: t('contact.hours.content')
    },
  ];

  return (
    <section id="contact" className="py-20 bg-[#F5E6D3]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1B4D3E] mb-4">{t('contact.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setActiveMap('google')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeMap === 'google'
                      ? 'bg-[#1B4D3E] text-[#D4AF37]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Map className="w-5 h-5" />
                  {t('contact.map.google')}
                </button>
                <button
                  onClick={() => setActiveMap('yandex')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeMap === 'yandex'
                      ? 'bg-[#1B4D3E] text-[#D4AF37]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Map className="w-5 h-5" />
                  {t('contact.map.yandex')}
                </button>
              </div>

              <div className="w-full h-[500px] rounded-xl overflow-hidden">
                {activeMap === 'google' ? (
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5576067746897!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE5JzQwLjEiTiA2OcKwMTInNDcuMCJF!5e0!3m2!1sen!2s!4v1645000000000!5m2!1sen!2s`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="hover:opacity-95 transition-opacity"
                  />
                ) : (
                  <iframe
                    src={`https://yandex.com/map-widget/v1/-/${coordinates.lng},${coordinates.lat}?z=16&l=map`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-[#1B4D3E] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1B4D3E] mb-2">{info.title}</h3>
                  <div className="text-gray-600">{info.content}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;