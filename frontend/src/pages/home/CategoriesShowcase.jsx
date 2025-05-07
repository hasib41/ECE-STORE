import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesShowcase = () => {
  const categories = [
    {
      id: 1,
      name: 'Cricket Jerseys',
      image: '/images/Cricket Jersey -2024.jpg',
      description: 'Official ECE cricket jerseys for all seasons',
      link: '/shop?category=cricket+jersey'
    },
    {
      id: 2,
      name: 'Football Jerseys',
      image: '/images/Football Jersey -2024.jpg',
      description: 'Support your ECE football team with our jerseys',
      link: '/shop?category=football+jersey'
    },
    {
      id: 3,
      name: 'Fan T-Shirts',
      image: '/images/Fan t-shirt -2025.jpg',
      description: 'Casual tees for ECE supporters and fans',
      link: '/shop?category=fan+t-shirt'
    },
    {
      id: 4,
      name: 'Winter Collection',
      image: '/images/Hoodie -2024.jpg',
      description: 'Stay warm with ECE hoodies and sweaters',
      link: '/shop?category=winter+collection'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our collections designed specifically for ECE students, alumni and supporters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              to={category.link} 
              key={category.id}
              className="group block bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-primary font-medium">
                  Shop Now
                  <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;