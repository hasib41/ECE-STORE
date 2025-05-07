
import React from 'react';
import bannerImg from "../../assets/ChampionBanner.jpg";
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={bannerImg} 
          alt="ECE Champion Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/30 mix-blend-multiply" />
      </div>
      
      {/* Content Container */}
      <div className="relative max-w-screen-xl mx-auto px-4 py-24 sm:py-32 lg:py-40 flex flex-col items-start justify-center">
        <div className="max-w-xl">
          {/* Optional badge */}
          <span className="inline-block bg-primary/90 text-white text-sm px-3 py-1 rounded-full font-medium mb-4">
            ECE Official Store
          </span>
          
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="block">We Will</span>
            <span className="block text-primary">Rock You</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-lg">
            Welcome to the Official Merchandise Store of the Prestigious Electronics & Communication Engineering Discipline of Khulna University.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg transition-colors duration-300">
              Shop Now
            </Link>
            <Link to="/about" className="inline-block bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 px-8 py-3 rounded-lg transition-colors duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Optional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 animate-bounce hidden sm:flex">
        <span className="text-sm mb-1">Scroll Down</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Banner;