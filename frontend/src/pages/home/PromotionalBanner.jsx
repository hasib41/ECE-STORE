import React from 'react';
import { Link } from 'react-router-dom';

const PromotionalBanner = () => {
  // Calculate end date for the promotion (7 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  
  return (
    <section className="bg-gray-900 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Left Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block bg-yellow-500 text-blue-900 text-sm px-4 py-1.5 rounded-full font-bold mb-4 animate-pulse">
                LIMITED TIME OFFER • ENDS SOON
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                <span className="text-yellow-300">20% OFF</span> on New Arrivals
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Use code <span className="font-bold text-white bg-blue-800 px-3 py-1 rounded-md mx-1">ECE20</span> at checkout and get 20% off on all new season merchandise. Hurry, offer ends {endDate.toLocaleDateString()}!
              </p>
              
              {/* Countdown timer display */}
              <div className="grid grid-cols-4 gap-2 mb-6 max-w-xs">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-2xl font-bold text-white">07</div>
                  <div className="text-xs text-white/70">DAYS</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-xs text-white/70">HOURS</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-2xl font-bold text-white">45</div>
                  <div className="text-xs text-white/70">MINS</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-2xl font-bold text-white">20</div>
                  <div className="text-xs text-white/70">SECS</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-block bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold px-8 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  SHOP NOW
                </Link>
                <Link
                  to="/shop?category=new+arrivals"
                  className="inline-block bg-transparent hover:bg-white/10 text-white border border-white/50 font-medium px-6 py-3.5 rounded-lg transition-colors duration-300"
                >
                  View Collection
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r md:from-black/30 md:to-transparent z-10"></div>
              <img
                src="/images/Cricket Jersey -2025.jpg"
                alt="New Arrivals"
                className="w-full h-full object-cover"
              />
              
              {/* Price badges - updated with more attention-grabbing design */}
              <div className="absolute top-8 right-8 bg-white rounded-lg py-2 px-4 shadow-lg z-20 transform rotate-3 border-2 border-yellow-500">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500 text-sm line-through">৳1999</span>
                  <span className="text-primary text-xl font-bold">৳1599</span>
                </div>
              </div>
              
              {/* Added sale badge */}
              <div className="absolute top-24 right-12 bg-yellow-500 text-blue-900 font-bold py-6 px-3 rounded-full shadow-lg z-20 transform rotate-12 text-xl flex items-center justify-center h-16 w-16">
                SALE!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;