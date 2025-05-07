import React from 'react';
import { Link } from 'react-router-dom';

const AboutDepartment = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Our ECE Legacy
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The ECE Department at Khulna University, established in 1991
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Content Column */}
          <div>
            <p className="text-gray-700 mb-6">
              The Department of ECE at Khulna University is one of the leading engineering departments in Bangladesh. Since 1991, we've been committed to excellence in education and research.
            </p>
            <p className="text-gray-700 mb-6">
              Our students receive hands-on training in modern technologies, telecommunications, and computing through well-equipped laboratories and experienced faculty members.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <span className="block text-2xl font-bold text-primary mb-1">30+</span>
                <span className="text-gray-700">Years of Excellence</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <span className="block text-2xl font-bold text-primary mb-1">1000+</span>
                <span className="text-gray-700">Alumni Network</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <span className="block text-2xl font-bold text-primary mb-1">25+</span>
                <span className="text-gray-700">Faculty Members</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                <span className="block text-2xl font-bold text-primary mb-1">12+</span>
                <span className="text-gray-700">Research Labs</span>
              </div>
            </div>
            
            <Link 
              to="/about" 
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Learn More About ECE
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDepartment;