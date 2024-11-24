import React from 'react';
import { Award, Users, Clock, Globe, Heart, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import PackageCard from '../components/PackageCard';

const HomePage = () => {
  const { t } = useLanguage();

  const packages = [
    {
      title: t('packages.umrah'),
      price: "1300",
      duration: t('packages.duration.tenDays'),
      includes: [t('packages.includes.hotel'), t('packages.includes.flights'), t('packages.includes.transport'), t('packages.includes.guide')],
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: t('packages.historical'),
      price: "1600",
      duration: t('packages.duration.sevenDays'),
      includes: [t('packages.includes.hotel'), t('packages.includes.guide'), t('packages.includes.transport'), t('packages.includes.guide')],
      image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: t('packages.luxury'),
      price: "2500",
      duration: t('packages.duration.fiveDays'),
      includes: [t('packages.includes.hotel'), t('packages.includes.guide'), t('packages.includes.transport'), t('packages.includes.guide')],
      image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: t('why.experts.title'),
      description: t('why.experts.desc')
    },
    {
      icon: Heart,
      title: t('why.service.title'),
      description: t('why.service.desc')
    },
    {
      icon: Star,
      title: t('why.support.title'),
      description: t('why.support.desc')
    },
    {
      icon: Globe,
      title: t('why.experience.title'),
      description: t('why.experience.desc')
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      
      <section id="packages" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#20392B] mb-4">{t('packages.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('packages.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      <section className="islamic-pattern py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#D4AF37] mb-16">{t('why.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-6 bg-white/90 rounded-xl hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-[#20392B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#20392B]">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default HomePage;