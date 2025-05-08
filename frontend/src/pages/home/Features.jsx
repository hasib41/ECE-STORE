import React from 'react';
import { FiTruck, FiCheckCircle, FiShield, FiHeadphones } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FiTruck className="w-12 h-12" />,
      title: 'Fast Delivery',
      description: 'Free same-day delivery across KU campus and expedited nationwide shipping with real-time tracking.'
    },
    {
      id: 2,
      icon: <FiCheckCircle className="w-12 h-12" />,
      title: 'Premium Quality',
      description: 'Crafted from high-grade materials that guarantee durability, comfort, and long-lasting performance.'
    },
    {
      id: 3,
      icon: <FiShield className="w-12 h-12" />,
      title: 'Secure Payments',
      description: 'Encrypted transactions across multiple payment options including card, mobile banking, and cash on delivery.'
    },
    {
      id: 4,
      icon: <FiHeadphones className="w-12 h-12" />,
      title: '24/7 Support',
      description: 'Dedicated customer service team available round the clock to assist with any queries or concerns.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ECE Store?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We're committed to providing the best shopping experience with services that make your life easier.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-primary hover:-translate-y-1"
            >
              <div className="text-primary mb-5 bg-primary/10 p-4 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;