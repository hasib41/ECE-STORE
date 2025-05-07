import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Farhan Ahmed',
      role: 'ECE 2019 Batch',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      quote: 'The quality of the ECE jerseys is exceptional! I still wear mine from university days, and the print hasn\'t faded a bit. It\'s a proud reminder of my time at the department.',
      rating: 5
    },
    {
      id: 2,
      name: 'Nusrat Jahan',
      role: 'ECE 2020 Batch',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      quote: 'I ordered the fan t-shirt as a gift for my brother who\'s currently studying at ECE. He absolutely loves it and wears it all the time. The delivery was quick too!',
      rating: 5
    },
    {
      id: 3,
      name: 'Mahmud Hasan',
      role: 'ECE 2018 Batch',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'The hoodies are perfect for winter! Comfortable, warm, and represent our department with style. Everyone asks me where I got it from.',
      rating: 4
    },
    {
      id: 4,
      name: 'Raisa Khan',
      role: 'ECE 2021 Batch',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'I bought the cricket jersey to support our team during inter-department matches. The material is breathable and comfortable, perfect for cheering from the sidelines!',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from ECE students and alumni who've experienced our products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 relative">
                <FaQuoteLeft className="text-primary/20 text-4xl absolute -top-2 -left-2" />
                <p className="text-gray-700 relative z-10 pt-3 pl-3">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700 text-lg italic max-w-2xl mx-auto">
            "Our ECE store is dedicated to providing high-quality merchandise that represents the pride and spirit of our department. We're committed to customer satisfaction and creating products that last."
          </p>
          <p className="font-medium text-gray-900 mt-3">- ECE Store Team</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;