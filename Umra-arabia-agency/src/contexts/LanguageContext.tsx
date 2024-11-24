import React, { createContext, useContext, useState } from 'react';

type Language = 'uz' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  uz: {
    'nav.home': 'Asosiy',
    'nav.packages': 'Paketlar',
    'nav.about': 'Biz haqimizda',
    'nav.services': 'Xizmatlar',
    'nav.contact': 'Aloqa',
    
    'hero.title': 'Saudiya Arabistonining Go\'zalligini Kashf Eting',
    'hero.subtitle': 'Bizning premium sayohat paketlarimiz bilan ma\'naviy sayohatlar va madaniy sarguzashtlarni his eting',
    'hero.search.destination': 'Paketni tanlang',
    'hero.search.button': 'Paketlarni qidirish',
    
    'packages.title': 'Paketlar',
    'packages.subtitle': 'Saudiya Arabistonining go\'zalligi va ma\'naviyatini bizning maxsus sayohat paketlarimiz bilan his eting',
    'packages.umrah': 'Umra Paketi',
    'packages.historical': 'Tarixiy Sayohat',
    'packages.luxury': 'Hashamatli Cho\'l Tajribasi',
    'packages.duration.tenDays': '10 kun',
    'packages.duration.sevenDays': '7 kun',
    'packages.duration.fiveDays': '5 kun',
    'packages.includes.hotel': 'Mehmonxona',
    'packages.includes.flights': 'Parvozlar',
    'packages.includes.transport': 'Transport',
    'packages.includes.guide': 'Gid',
    
    'why.title': 'Nega Bizni Tanlaysiz',
    'why.experts.title': 'Professional Xizmat',
    'why.experts.desc': 'Tajribali va malakali mutaxassislar',
    'why.service.title': 'Yuqori Sifat',
    'why.service.desc': 'Premium darajadagi xizmatlar',
    'why.support.title': 'To\'liq Qo\'llab-quvvatlash',
    'why.support.desc': '24/7 mijozlar xizmati',
    'why.experience.title': 'Boy Tajriba',
    'why.experience.desc': '12 yillik tajriba',

    'about.title': 'Biz haqimizda',
    'about.subtitle': 'Ma\'naviy sayohatlar va madaniy tajribalar bo\'yicha ishonchli hamkoringiz',
    'about.mission': 'Bizning vazifamiz',
    'about.description': 'Biz har bir mijozga yuqori sifatli xizmat ko\'rsatish va ularning sayohatini unutilmas qilishga intilamiz. Bizning professional jamoamiz sizning har qanday savolingizga javob berishga va barcha ehtiyojlaringizni qondirishga tayyor.',

    'services.title': 'Bizning xizmatlarimiz',
    'services.subtitle': 'Sizning sayohatingizni mukammal qilish uchun barcha zarur xizmatlar',
    'services.flights.title': 'Parvozlar',
    'services.flights.description': 'Qulay va ishonchli parvozlar',
    'services.accommodation.title': 'Turar joy',
    'services.accommodation.description': '5 yulduzli mehmonxonalarda joylashuv',
    'services.tours.title': 'Ekskursiyalar',
    'services.tours.description': 'Professional gidlar bilan sayohatlar',
    'services.support.title': 'Qo\'llab-quvvatlash',
    'services.support.description': '24/7 mijozlarni qo\'llab-quvvatlash',

    'contact.title': 'Biz bilan bog\'laning',
    'contact.subtitle': 'Savollaringiz bormi? Biz bilan bog\'laning',
    'contact.phone.title': 'Telefon raqamlar',
    'contact.instagram.title': 'Instagram sahifamiz',
    'contact.address.title': 'Manzil',
    'contact.address.content': 'Toshkent shahri, Yunusobod tumani, Amir Temur ko\'chasi, 108-uy',
    'contact.hours.title': 'Ish vaqti',
    'contact.hours.content': 'Dushanba - Shanba: 09:00 - 18:00',
    'contact.map.google': 'Google Xarita',
    'contact.map.yandex': 'Yandex Xarita'
  },
  ru: {
    'nav.home': 'Главная',
    'nav.packages': 'Пакеты',
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.contact': 'Контакты',
    
    'hero.title': 'Откройте для себя красоту Саудовской Аравии',
    'hero.subtitle': 'Испытайте духовные путешествия и культурные приключения с нашими премиальными туристическими пакетами',
    'hero.search.destination': 'Выберите пакет',
    'hero.search.button': 'Поиск пакетов',
    
    'packages.title': 'Пакеты',
    'packages.subtitle': 'Почувствуйте красоту и духовность Саудовской Аравии с нашими специально подобранными туристическими пакетами',
    'packages.umrah': 'Пакет Умра',
    'packages.historical': 'Исторический Тур',
    'packages.luxury': 'Люкс Пустынный Опыт',
    'packages.duration.tenDays': '10 дней',
    'packages.duration.sevenDays': '7 дней',
    'packages.duration.fiveDays': '5 дней',
    'packages.includes.hotel': 'Отель',
    'packages.includes.flights': 'Перелеты',
    'packages.includes.transport': 'Транспорт',
    'packages.includes.guide': 'Гид',

    'why.title': 'Почему выбирают нас',
    'why.experts.title': 'Профессиональный Сервис',
    'why.experts.desc': 'Опытные и квалифицированные специалисты',
    'why.service.title': 'Высокое Качество',
    'why.service.desc': 'Премиальный уровень услуг',
    'why.support.title': 'Полная Поддержка',
    'why.support.desc': 'Поддержка клиентов 24/7',
    'why.experience.title': 'Богатый Опыт',
    'why.experience.desc': '12 лет опыта',

    'about.title': 'О нас',
    'about.subtitle': 'Ваш надежный партнер в духовных путешествиях и культурном опыте',
    'about.mission': 'Наша миссия',
    'about.description': 'Мы стремимся предоставить каждому клиенту высококачественный сервис и сделать их путешествие незабываемым. Наша профессиональная команда готова ответить на любые ваши вопросы и удовлетворить все ваши потребности.',

    'services.title': 'Наши услуги',
    'services.subtitle': 'Все необходимые услуги для вашего идеального путешествия',
    'services.flights.title': 'Перелеты',
    'services.flights.description': 'Удобные и надежные перелеты',
    'services.accommodation.title': 'Проживание',
    'services.accommodation.description': 'Размещение в 5-звездочных отелях',
    'services.tours.title': 'Экскурсии',
    'services.tours.description': 'Туры с профессиональными гидами',
    'services.support.title': 'Поддержка',
    'services.support.description': 'Поддержка клиентов 24/7',

    'contact.title': 'Свяжитесь с нами',
    'contact.subtitle': 'Есть вопросы? Свяжитесь с нами',
    'contact.phone.title': 'Телефоны',
    'contact.instagram.title': 'Наш Instagram',
    'contact.address.title': 'Адрес',
    'contact.address.content': 'г. Ташкент, Юнусабадский район, улица Амира Темура, 108',
    'contact.hours.title': 'Режим работы',
    'contact.hours.content': 'Понедельник - Суббота: 09:00 - 18:00',
    'contact.map.google': 'Google Карта',
    'contact.map.yandex': 'Яндекс Карта'
  },
  en: {
    'nav.home': 'Home',
    'nav.packages': 'Packages',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    
    'hero.title': 'Discover the Beauty of Saudi Arabia',
    'hero.subtitle': 'Experience spiritual journeys and cultural adventures with our premium travel packages',
    'hero.search.destination': 'Select Package',
    'hero.search.button': 'Search Packages',
    
    'packages.title': 'Packages',
    'packages.subtitle': 'Experience the beauty and spirituality of Saudi Arabia with our carefully curated travel packages',
    'packages.umrah': 'Umrah Package',
    'packages.historical': 'Historical Tour',
    'packages.luxury': 'Luxury Desert Experience',
    'packages.duration.tenDays': '10 days',
    'packages.duration.sevenDays': '7 days',
    'packages.duration.fiveDays': '5 days',
    'packages.includes.hotel': 'Hotel',
    'packages.includes.flights': 'Flights',
    'packages.includes.transport': 'Transport',
    'packages.includes.guide': 'Guide',

    'why.title': 'Why Choose Us',
    'why.experts.title': 'Professional Service',
    'why.experts.desc': 'Experienced and qualified specialists',
    'why.service.title': 'High Quality',
    'why.service.desc': 'Premium level services',
    'why.support.title': 'Full Support',
    'why.support.desc': '24/7 customer support',
    'why.experience.title': 'Rich Experience',
    'why.experience.desc': '12 years of experience',

    'about.title': 'About Us',
    'about.subtitle': 'Your trusted partner in spiritual journeys and cultural experiences',
    'about.mission': 'Our Mission',
    'about.description': 'We strive to provide each client with high-quality service and make their journey unforgettable. Our professional team is ready to answer any of your questions and meet all your needs.',

    'services.title': 'Our Services',
    'services.subtitle': 'All necessary services for your perfect journey',
    'services.flights.title': 'Flights',
    'services.flights.description': 'Convenient and reliable flights',
    'services.accommodation.title': 'Accommodation',
    'services.accommodation.description': '5-star hotel accommodations',
    'services.tours.title': 'Tours',
    'services.tours.description': 'Tours with professional guides',
    'services.support.title': 'Support',
    'services.support.description': '24/7 customer support',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions? Get in touch with us',
    'contact.phone.title': 'Phone Numbers',
    'contact.instagram.title': 'Our Instagram',
    'contact.address.title': 'Address',
    'contact.address.content': '108 Amir Temur Street, Yunusabad District, Tashkent',
    'contact.hours.title': 'Working Hours',
    'contact.hours.content': 'Monday - Saturday: 09:00 - 18:00',
    'contact.map.google': 'Google Map',
    'contact.map.yandex': 'Yandex Map'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uz');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.uz] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};