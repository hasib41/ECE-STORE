import React, { useState } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiPackage, FiSettings, FiPieChart, FiHelpCircle, FiMessageSquare, FiMail } from 'react-icons/fi';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Mock FAQ data
  const faqCategories = [
    { id: 'all', name: 'All Articles', icon: <FiHelpCircle /> },
    { id: 'products', name: 'Products', icon: <FiPackage /> },
    { id: 'orders', name: 'Orders', icon: <FiShoppingCart /> },
    { id: 'account', name: 'Account', icon: <FiUser /> },
    { id: 'reports', name: 'Reports', icon: <FiPieChart /> },
    { id: 'settings', name: 'Settings', icon: <FiSettings /> },
  ];

  const faqs = [
    {
      id: 1,
      category: 'products',
      question: 'How do I add a new product?',
      answer: `To add a new product, follow these steps:
1. Navigate to "Products" in the sidebar
2. Click the "Add Product" button
3. Fill in all required product details
4. Upload product images
5. Click "Save" to publish the product`
    },
    {
      id: 2,
      category: 'products',
      question: 'How do I edit an existing product?',
      answer: `To edit an existing product:
1. Go to "Products" in the sidebar
2. Find the product you want to edit in the list
3. Click the "Edit" button (pencil icon)
4. Make your changes
5. Click "Save" to update the product`
    },
    {
      id: 3,
      category: 'orders',
      question: 'How do I process a new order?',
      answer: `When a new order comes in:
1. Go to the "Orders" section
2. Click on the order to view details
3. Verify the order information
4. Update the order status to "Processing"
5. Print shipping labels and packing slips if needed
6. Once shipped, update the status to "Shipped"`
    },
    {
      id: 4,
      category: 'orders',
      question: 'Can I cancel an order?',
      answer: `Yes, you can cancel an order that hasn't been shipped yet:
1. Navigate to the "Orders" section
2. Find and open the order
3. Click the "Cancel Order" button
4. Select a reason for cancellation
5. Confirm the cancellation
Note: This will automatically notify the customer and process any refund if payment was taken.`
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I change my password?',
      answer: `To change your admin password:
1. Click on your profile icon in the top right
2. Select "Settings" from the dropdown menu
3. Go to the "Security" tab
4. Enter your current password
5. Enter and confirm your new password
6. Click "Save Changes"`
    },
    {
      id: 6,
      category: 'account',
      question: 'Can I add another admin user?',
      answer: `To add another admin user:
1. Go to "Settings" in the sidebar
2. Select the "Users & Permissions" tab
3. Click "Add New User"
4. Enter their details and select appropriate permissions
5. Click "Create User"
6. They will receive an email with login instructions`
    },
    {
      id: 7,
      category: 'reports',
      question: 'How do I view sales reports?',
      answer: `To access sales reports:
1. Click on "Reports" in the sidebar
2. Select "Sales Reports" from the options
3. Choose your desired date range
4. Select any additional filters or grouping options
5. Click "Generate Report"
6. You can export the report in CSV or PDF format`
    },
    {
      id: 8,
      category: 'settings',
      question: 'How do I update store information?',
      answer: `To update your store information:
1. Go to "Settings" in the sidebar
2. Select the "General" tab
3. Update your store name, contact information, and other details
4. Click "Save Changes"
This information is used across various parts of your store, including receipts and customer communications.`
    }
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Hero Section */}
      <div className="bg-purple-700 p-6 md:p-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">How can we help you?</h1>
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help..."
              className="block w-full pl-10 pr-4 py-3 border border-purple-800 rounded-lg bg-purple-800 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 p-6 bg-gray-50 border-r border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Help Topics</h2>
          <nav className="space-y-1">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  activeCategory === category.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </nav>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Need More Help?</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                <FiMessageSquare className="mr-2 h-5 w-5" />
                Contact Support
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg hover:bg-purple-200">
                <FiMail className="mr-2 h-5 w-5" />
                Email Us
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {activeCategory === 'all' ? 'Frequently Asked Questions' : `${faqCategories.find(c => c.id === activeCategory)?.name} Help`}
          </h2>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10">
              <FiHelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-8 p-6 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-medium text-purple-900 mb-2">Can't find what you're looking for?</h3>
            <p className="text-purple-700 mb-4">Our support team is here to help. Reach out to us with any questions.</p>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                <FiMessageSquare className="mr-2 h-5 w-5" />
                Live Chat
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-purple-700 border border-purple-300 bg-white rounded-lg hover:bg-purple-50">
                <FiMail className="mr-2 h-5 w-5" />
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;