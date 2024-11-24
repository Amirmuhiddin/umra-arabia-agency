import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="block">
      <img 
        src={logoImage}
        alt="Umra Arabia Agency" 
        className="h-16 w-auto object-contain hover-scale transition-transform duration-300"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      />
    </Link>
  );
};

export default Logo;