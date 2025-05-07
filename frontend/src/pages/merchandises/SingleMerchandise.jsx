import React, { useState } from 'react'
import { FiShoppingCart, FiHeart, FiShare2, FiArrowLeft } from "react-icons/fi"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchMerchandiseByIdQuery, useFetchAllMerchandiseQuery } from '../../redux/features/merchandises/merchandisesApi';
import MerchandiseCard from './MerchandiseCard';

const SingleMerchandise = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: merchandise, isLoading, isError } = useFetchMerchandiseByIdQuery(id);
    const { data: allMerchandises = [] } = useFetchAllMerchandiseQuery();
    const dispatch = useDispatch();
    
    // State for selected size and quantity
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    
    // Find related products (same category)
    const relatedProducts = allMerchandises
        .filter(item => item.category === merchandise?.category && item._id !== id)
        .slice(0, 4);

    const handleAddToCart = () => {
        const productToAdd = {
            ...merchandise,
            selectedSize: selectedSize || (merchandise?.availableSizes?.length > 0 ? merchandise.availableSizes[0] : ''),
            quantity
        };
        dispatch(addToCart(productToAdd));
    };

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }
    
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
                <p className="text-gray-600 mb-6">The product you're looking for might be unavailable or doesn't exist.</p>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-primary font-medium hover:underline"
                >
                    <FiArrowLeft className="mr-2" /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="container-custom py-12">
            {/* Breadcrumb navigation */}
            <nav className="flex mb-8 text-sm">
                <ol className="flex items-center space-x-2">
                    <li><Link to="/" className="text-gray-500 hover:text-primary">Home</Link></li>
                    <li className="text-gray-500">/</li>
                    <li><Link to="/shop" className="text-gray-500 hover:text-primary">Shop</Link></li>
                    <li className="text-gray-500">/</li>
                    <li><Link to={`/category/${merchandise.category}`} className="text-gray-500 hover:text-primary">{merchandise.category}</Link></li>
                    <li className="text-gray-500">/</li>
                    <li className="text-gray-900 font-medium truncate">{merchandise.title}</li>
                </ol>
            </nav>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={getImgUrl(merchandise.coverImage)}
                                alt={merchandise.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Optional: Add badges or tags */}
                        <div className="absolute top-4 left-4">
                            {merchandise.isNew && (
                                <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    NEW
                                </span>
                            )}
                        </div>
                        
                        {/* Optional: Add wishlist button */}
                        <button 
                            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            aria-label="Add to wishlist"
                        >
                            <FiHeart className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{merchandise.title}</h1>
                            <div className="flex items-center mb-4">
                                <span className="text-2xl font-bold text-gray-900">৳{merchandise.price}</span>
                                {merchandise.oldPrice && (
                                    <span className="ml-3 text-gray-500 line-through">৳{merchandise.oldPrice}</span>
                                )}
                            </div>
                            <p className="text-gray-600">{merchandise.description}</p>
                        </div>
                        
                        {/* Product Specifications */}
                        <div className="space-y-6 mb-8">
                            {/* Available Sizes */}
                            {merchandise.availableSizes && merchandise.availableSizes.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {merchandise.availableSizes.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-4 py-2 text-sm font-medium rounded-md ${
                                                    selectedSize === size
                                                        ? 'bg-primary text-white'
                                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Sleeve Type */}
                            {merchandise.sleeve && merchandise.sleeve.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-1">Sleeve Type</h3>
                                    <p className="text-gray-700">{merchandise.sleeve.join(', ')}</p>
                                </div>
                            )}
                            
                            {/* Other product details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-1">Category</h3>
                                    <p className="text-gray-700">{merchandise.category}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-1">Year</h3>
                                    <p className="text-gray-700">{merchandise.year}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Quantity and Add to Cart */}
                        <div className="mt-auto">
                            <div className="flex items-center space-x-4 mb-6">
                                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                                <div className="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(-1)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 text-gray-900">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(1)}
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button>
                                
                                <button
                                    className="btn-outline flex items-center justify-center gap-2 py-3"
                                >
                                    <FiShare2 className="w-5 h-5" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Product Tabs */}
                <div className="border-t border-gray-200 px-6 py-4">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`px-4 py-2 text-sm font-medium -mb-px ${
                                activeTab === 'description'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`px-4 py-2 text-sm font-medium -mb-px ${
                                activeTab === 'reviews'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Reviews
                        </button>
                        <button
                            onClick={() => setActiveTab('shipping')}
                            className={`px-4 py-2 text-sm font-medium -mb-px ${
                                activeTab === 'shipping'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Shipping & Returns
                        </button>
                    </div>
                    
                    <div className="py-6">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none">
                                <p>{merchandise.description}</p>
                                <ul className="list-disc pl-5 mt-4">
                                    <li>Premium quality material</li>
                                    <li>Official ECE merchandise</li>
                                    <li>Comfortable fit</li>
                                    <li>Machine washable</li>
                                </ul>
                            </div>
                        )}
                        
                        {activeTab === 'reviews' && (
                            <div>
                                <p className="text-gray-600">No reviews yet. Be the first to review this product.</p>
                            </div>
                        )}
                        
                        {activeTab === 'shipping' && (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">Shipping</h3>
                                    <p className="text-gray-600">
                                        We offer nationwide shipping with delivery within 3-5 business days.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-1">Returns</h3>
                                    <p className="text-gray-600">
                                        Items can be returned within 7 days of delivery. Please contact our support team for return instructions.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((product) => (
                            <MerchandiseCard key={product._id} merchandise={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleMerchandise;