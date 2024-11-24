import React from 'react';
import { Clock, Check } from 'lucide-react';

interface PackageCardProps {
  title: string;
  price: string;
  duration: string;
  includes: string[];
  image: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ title, price, duration, includes, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 border border-[#C6A869]/20">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-[#20392B] text-[#C6A869] px-4 py-1 rounded-full">
          ${price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#20392B] mb-2">{title}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="w-5 h-5 mr-2" />
          {duration}
        </div>
        <div className="space-y-2">
          {includes.map((item, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <Check className="w-5 h-5 text-[#20392B] mr-2" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;