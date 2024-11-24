import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, location, text, image }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-scale">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover mr-4 hover-scale" />
        <div className="animate-fade-left stagger-1">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-gray-600 text-sm">{location}</p>
        </div>
      </div>
      <div className="flex mb-4 animate-fade-left stagger-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600 animate-fade-up stagger-3">{text}</p>
    </div>
  );
};

export default TestimonialCard;