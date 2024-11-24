{/* Previous imports remain the same */}

interface ContentData {
  hero: {
    title: {
      uz: string;
      ru: string;
      en: string;
    };
    image: string;
  };
  about: {
    title: {
      uz: string;
      ru: string;
      en: string;
    };
    description: {
      uz: string;
      ru: string;
      en: string;
    };
    image: string;
    stats: Array<{
      value: string;
      label: {
        uz: string;
        ru: string;
        en: string;
      };
    }>;
  };
  services: {
    title: {
      uz: string;
      ru: string;
      en: string;
    };
    subtitle: {
      uz: string;
      ru: string;
      en: string;
    };
    items: Array<{
      title: {
        uz: string;
        ru: string;
        en: string;
      };
      description: {
        uz: string;
        ru: string;
        en: string;
      };
    }>;
  };
  contact: {
    phone: string;
    email: string;
    address: {
      uz: string;
      ru: string;
      en: string;
    };
    hours: {
      uz: string;
      ru: string;
      en: string;
    };
    mapLocation: {
      lat: string;
      lng: string;
      zoom: string;
    };
  };
}

const ContentPage = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'services' | 'contact'>('hero');
  const [content, setContent] = useState<ContentData>({
    hero: {
      title: { uz: '', ru: '', en: '' },
      image: ''
    },
    about: {
      title: { uz: '', ru: '', en: '' },
      description: { uz: '', ru: '', en: '' },
      image: '',
      stats: []
    },
    services: {
      title: { uz: '', ru: '', en: '' },
      subtitle: { uz: '', ru: '', en: '' },
      items: []
    },
    contact: {
      phone: '',
      email: '',
      address: { uz: '', ru: '', en: '' },
      hours: { uz: '', ru: '', en: '' },
      mapLocation: {
        lat: '21.422483',
        lng: '39.826206',
        zoom: '15'
      }
    }
  });
  
  // ... previous code remains the same until the return statement

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-3 mb-8">
        <Layout className="w-6 h-6 text-[#20392B]" />
        <h1 className="text-2xl font-bold text-[#20392B]">Content Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b">
          <nav className="flex">
            {['hero', 'about', 'services', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-[#20392B] border-b-2 border-[#C6A869]'
                    : 'text-gray-500 hover:text-[#20392B]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* ... previous tab content remains the same ... */}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#20392B]">Contact Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={content.contact.phone}
                  onChange={(e) => setContent({
                    ...content,
                    contact: { ...content.contact, phone: e.target.value }
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={content.contact.email}
                  onChange={(e) => setContent({
                    ...content,
                    contact: { ...content.contact, email: e.target.value }
                  })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                />
              </div>

              {['uz', 'ru', 'en'].map((lang) => (
                <div key={lang}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address ({lang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={content.contact.address[lang as keyof typeof content.contact.address]}
                    onChange={(e) => setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        address: {
                          ...content.contact.address,
                          [lang]: e.target.value
                        }
                      }
                    })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                  />
                </div>
              ))}

              {['uz', 'ru', 'en'].map((lang) => (
                <div key={lang}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours ({lang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={content.contact.hours[lang as keyof typeof content.contact.hours]}
                    onChange={(e) => setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        hours: {
                          ...content.contact.hours,
                          [lang]: e.target.value
                        }
                      }
                    })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                  />
                </div>
              ))}

              <div className="space-y-4">
                <h3 className="text-md font-medium text-[#20392B]">Map Location</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input
                      type="text"
                      value={content.contact.mapLocation.lat}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          mapLocation: {
                            ...content.contact.mapLocation,
                            lat: e.target.value
                          }
                        }
                      })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="text"
                      value={content.contact.mapLocation.lng}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          mapLocation: {
                            ...content.contact.mapLocation,
                            lng: e.target.value
                          }
                        }
                      })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zoom Level</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={content.contact.mapLocation.zoom}
                      onChange={(e) => setContent({
                        ...content,
                        contact: {
                          ...content.contact,
                          mapLocation: {
                            ...content.contact.mapLocation,
                            zoom: e.target.value
                          }
                        }
                      })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#C6A869] focus:ring focus:ring-[#C6A869] focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4 h-[300px] rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.4731651884295!2d${content.contact.mapLocation.lng}!3d${content.contact.mapLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI1JzIxLjAiTiAzOcKwNDknMzQuMyJF!5e0!3m2!1sen!2s!4v1645000000000!5m2!1sen!2s`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-[#20392B] text-[#C6A869] rounded-md hover:bg-[#254332] transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentPage;