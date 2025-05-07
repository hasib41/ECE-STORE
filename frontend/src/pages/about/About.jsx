import React from 'react';
import { Link } from 'react-router-dom';
import eceImg from '../../assets/ECE_Logo.jpg'; // Make sure this path is correct

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-primary py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About ECE Store</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            The official merchandise store for Electronics & Communication Engineering Discipline of Khulna University
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src={eceImg} 
              alt="ECE Logo" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              The ECE Store was established in 2023 as the official merchandise provider for the Electronics & Communication Engineering Discipline of Khulna University. We started with a simple mission: to create high-quality, stylish merchandise that represents the pride and unity of our discipline.
            </p>
            <p className="text-gray-700 mb-4">
              What began as a small initiative by passionate students has grown into a full-fledged store offering a wide range of products, from jerseys and t-shirts to winter wear and accessories. Each item is carefully designed to reflect the spirit and excellence of ECE.
            </p>
            <p className="text-gray-700">
              Today, the ECE Store serves not only current students but also alumni, faculty, and supporters who want to showcase their connection to our prestigious discipline.
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Quality</h3>
              <p className="text-gray-700">
                We are committed to providing merchandise of the highest quality. From the fabrics we choose to the printing techniques we use, every detail matters.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Education</h3>
              <p className="text-gray-700">
                A portion of our proceeds supports educational initiatives within the ECE discipline, helping to fund workshops, competitions, and learning resources.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-primary mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Community</h3>
              <p className="text-gray-700">
                We aim to foster a sense of belonging among all ECE members. Our products are designed to strengthen the bond within our community and create lasting connections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
              {/* Replace with actual image */}
              <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Ashraful Islam</h3>
            <p className="text-primary">Founder & CEO</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
              {/* Replace with actual image */}
              <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Zarin Zeba</h3>
            <p className="text-primary">Head of Design</p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
              {/* Replace with actual image */}
              <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Mehedi Hasan</h3>
            <p className="text-primary">Operations Manager</p>
          </div>
          
          {/* Team Member 4 */}
          <div className="text-center">
            <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
              {/* Replace with actual image */}
              <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Arefin Khan</h3>
            <p className="text-primary">Customer Support</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Represent ECE?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Browse our collection of premium merchandise designed exclusively for the ECE community.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-white hover:bg-gray-100 text-primary font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;