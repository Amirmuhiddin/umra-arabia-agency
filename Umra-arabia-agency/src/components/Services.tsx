import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { Plane, Hotel, Map, Headphones } from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Plane,
      title: t('services.flights.title'),
      description: t('services.flights.description')
    },
    {
      icon: Hotel,
      title: t('services.accommodation.title'),
      description: t('services.accommodation.description')
    },
    {
      icon: Map,
      title: t('services.tours.title'),
      description: t('services.tours.description')
    },
    {
      icon: Headphones,
      title: t('services.support.title'),
      description: t('services.support.description')
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1B4D3E] mb-4">{t('services.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 bg-[#F5E6D3] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-[#1B4D3E] w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <service.icon className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;