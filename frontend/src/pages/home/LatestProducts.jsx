import React, { useState, useRef, useEffect } from 'react';
import MerchandiseCard from '../Merchandises/MerchandiseCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useFetchAllMerchandiseQuery } from '../../redux/features/merchandises/merchandisesApi';

const categories = [
  "Choose Product Type",
  "Cricket Jersey",
  "Football Jersey",
  "Volleyball Jersey",
  "Fan T-Shirt",
  "Winter Collection"
];

const LatestProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose Product Type");
  const { data: merchandises = [], isLoading } = useFetchAllMerchandiseQuery();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filteredMerchandises =
    selectedCategory === "Choose Product Type"
      ? merchandises
      : merchandises.filter(
          (merchandise) =>
            merchandise.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-screen-xl mx-auto px-4'>
        {/* Section Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Featured Products</h2>
            <p className='text-gray-600 max-w-lg'>
              Explore our top quality merchandise created exclusively for ECE members and supporters
            </p>
          </div>
          <Link to="/shop" className='inline-flex items-center text-primary font-medium hover:underline mt-4 sm:mt-0'>
            View All Products <FiChevronRight className="ml-1" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className='mb-8 flex flex-wrap gap-2'>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                ${selectedCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            >
              {category === "Choose Product Type" ? "All Products" : category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Products Slider */}
            {filteredMerchandises.length > 0 ? (
              <div className="relative">
                {/* Navigation Arrows */}
                <div className="absolute inset-y-0 left-0 z-10 flex items-center">
                  <button
                    ref={prevRef}
                    className="bg-white rounded-full shadow-md p-3 hover:bg-gray-100 transition-colors -ml-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Previous slide"
                  >
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>

                <div className="absolute inset-y-0 right-0 z-10 flex items-center">
                  <button
                    ref={nextRef}
                    className="bg-white rounded-full shadow-md p-3 hover:bg-gray-100 transition-colors -mr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    aria-label="Next slide"
                  >
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <Swiper
                  loop={filteredMerchandises.length > 4}
                  slidesPerView={1}
                  spaceBetween={24}
                  onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    540: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  modules={[Navigation, Pagination, Autoplay]}
                  className="pb-12" // Space for pagination bullets
                >
                  {filteredMerchandises.map((merchandise, index) => (
                    <SwiperSlide key={merchandise._id || index}>
                      <MerchandiseCard merchandise={merchandise} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">We couldn't find any products in this category.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedCategory("Choose Product Type")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LatestProducts;