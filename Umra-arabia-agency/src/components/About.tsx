import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import { Users, Star, Clock, MapPin } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Users,
      value: '15K+',
      label: 'Happy Pilgrims'
    },
    {
      icon: Star,
      value: '4.9',
      label: 'Rating'
    },
    {
      icon: Clock,
      value: '12+',
      label: 'Years Experience'
    },
    {
      icon: MapPin,
      value: '50+',
      label: 'Sacred Sites'
    }
  ];

  return (
    <section ref={ref} id="about" className="py-20 bg-[#F5E6D3]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1B4D3E] mb-4">{t('about.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('about.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&q=80&w=1000"
              alt="About Us"
              className="rounded-2xl shadow-xl hover-scale"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-[#1B4D3E]">{t('about.mission')}</h3>
            <p className="text-gray-600">{t('about.description')}</p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-[#1B4D3E] w-12 h-12 rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1B4D3E] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;