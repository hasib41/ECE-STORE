import React from 'react';
import { FiTruck, FiCheckCircle, FiRefreshCw, FiShield } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FiTruck className="w-10 h-10" />,
      title: 'Fast Delivery',
      description: 'Free shipping across KU campus and quick nationwide delivery'
    },
    {
      id: 2,
      icon: <FiCheckCircle className="w-10 h-10" />,
      title: 'Premium Quality',
      description: 'Durable materials that withstand daily use and last longer'
    },
    {
      id: 3,
      icon: <FiRefreshCw className="w-10 h-10" />,
      title: 'Easy Returns',
      description: '7-day return policy for all unworn and unwashed items'
    },
    {
      id: 4,
      icon: <FiShield className="w-10 h-10" />,
      title: 'Secure Payments',
      description: 'Multiple payment options with encrypted transactions'
    }
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
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