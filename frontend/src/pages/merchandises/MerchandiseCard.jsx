import React, { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const MerchandiseCard = ({ merchandise }) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e, product) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        dispatch(addToCart(product));
    };

    return (
        <div 
            className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Category Badge */}
            {merchandise?.category && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
                        {merchandise.category}
                    </span>
                </div>
            )}
            
            {/* Product Image with Hover Effect */}
            <Link to={`/merchandises/${merchandise._id}`} className="block overflow-hidden relative">
                <div className="relative pb-[125%] overflow-hidden"> {/* Fixed aspect ratio */}
                    <img
                        src={getImgUrl(merchandise?.coverImage)}
                        alt={merchandise?.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                        onError={(e) => {
                            console.error('Image failed to load:', merchandise?.coverImage);
                            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                        }}
                    />
                </div>
                
                {/* Quick Action Buttons (Appear on Hover) */}
                <div className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button 
                        onClick={(e) => handleAddToCart(e, merchandise)}
                        className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        title="Add to cart"
                    >
                        <FiShoppingCart className="w-4 h-4" />
                    </button>
                    <Link 
                        to={`/merchandises/${merchandise._id}`}
                        className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        title="View details"
                    >
                        <FiEye className="w-4 h-4" />
                    </Link>
                </div>
            </Link>
            
            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <Link to={`/merchandises/${merchandise._id}`}>
                        <h3 className="text-lg font-medium hover:text-primary transition-colors mb-1 line-clamp-2">
                            {merchandise?.title}
                        </h3>
                    </Link>
                    
                    {/* Optional small description */}
                    {merchandise?.shortDescription && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {merchandise.shortDescription}
                        </p>
                    )}
                </div>
                
                <div className="mt-auto pt-3 flex items-center justify-between">
                    <p className="font-bold text-lg text-gray-900">৳{merchandise?.Price || merchandise?.price}</p>
                    <button
                        onClick={(e) => handleAddToCart(e, merchandise)}
                        className="bg-primary text-white rounded-full p-2 hover:bg-primary-dark transition-colors"
                        aria-label="Add to cart"
                    >
                        <FiShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MerchandiseCard;