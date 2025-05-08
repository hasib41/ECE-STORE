import React from 'react';
import bannerImg from "../../assets/ChampionBanner.jpg";
import eceLogo from "../../assets/ECE_LOGO.jpg";
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative bg-gray-900 min-h-[70vh] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>
        <img 
          src={bannerImg} 
          alt="ECE Banner"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative w-full max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <img src={eceLogo} alt="ECE Logo" className="w-8 h-8 rounded-full mr-2" />
          <span className="text-primary font-bold">ECE Official Store</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          We Will Rock You
        </h1>
        
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
        Welcome to the Official Merchandise Store of the Prestigious Electronics & Communication Engineering Discipline of Khulna University.
        </p>
        
        {/* Action buttons */}
        <div className="flex gap-4 justify-center">
          <Link to="/shop" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90">
            Shop Now
          </Link>
          <Link to="/about" className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;