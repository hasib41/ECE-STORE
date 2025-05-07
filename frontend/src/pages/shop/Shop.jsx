import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetchAllMerchandiseQuery } from '../../redux/features/merchandises/merchandisesApi';
import MerchandiseCard from '../merchandises/MerchandiseCard';

const categories = [
  "All Products",
  "Cricket Jersey",
  "Football Jersey",
  "Volleyball Jersey",
  "Fan T-Shirt",
  "Winter Collection"
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [priceRange, setPriceRange] = useState(2000);
  const [sortOrder, setSortOrder] = useState("featured");
  const { data: merchandises = [], isLoading } = useFetchAllMerchandiseQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = [...merchandises];
    
    // Filter by category
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(
        (merchandise) => merchandise.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by price
    filtered = filtered.filter(
      (merchandise) => Number(merchandise.Price || merchandise.price) <= priceRange
    );
    
    // Sort products
    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredProducts(filtered);
  }, [merchandises, selectedCategory, priceRange, sortOrder]);

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Shop Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">ECE Store Products</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Browse our collection of high-quality merchandise featuring exclusive ECE designs.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="font-bold text-lg mb-4 text-gray-900">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${index}`}
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${index}`} className="ml-2 text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>৳0</span>
                  <span>৳{priceRange}</span>
                </div>
              </div>
            </div>
            
            {/* Sort Options */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="md:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((merchandise) => (
                      <MerchandiseCard key={merchandise._id} merchandise={merchandise} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                    <p className="mt-1 text-gray-500">Try adjusting your filters to find products.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          setSelectedCategory("All Products");
                          setPriceRange(2000);
                          setSortOrder("featured");
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;