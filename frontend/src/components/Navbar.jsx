import { Link } from "react-router-dom";
import {  HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png"
import ecelogo from "../assets/ECE_Logo.jpg"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
]

const Navbar = () => {

    const  [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);
   
    const {currentUser, logout} = useAuth()
    
    const handleLogOut = () => {
        logout()
    }

    const token = localStorage.getItem('token');
  
    return (
    <header className="shadow-sm sticky top-0 bg-white z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        <nav className="relative flex items-center justify-between w-full">
          {/* Logo - Left side */}
          <div className="flex items-center">
            <Link to="/">
              <img 
                src={ecelogo} 
                alt="ECE Store Logo"
                className="w-16 h-16 object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
          
          {/* Navigation Links - Visible on medium screens and up */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            <Link to="/" className="font-medium text-gray-800 hover:text-primary transition-colors">Home</Link>
            <Link to="/shop" className="font-medium text-gray-800 hover:text-primary transition-colors">Shop</Link>
            <Link to="/about" className="font-medium text-gray-800 hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="font-medium text-gray-800 hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Search input - Centered on larger screens */}
          <div className="relative mx-4 flex-grow max-w-sm hidden sm:block">
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search products..."
                className="bg-gray-100 w-full py-2 pl-9 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right side - User and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Icon (Mobile Only) */}
            <button className="sm:hidden text-gray-700 hover:text-primary transition-colors">
              <IoSearchOutline className="w-5 h-5" />
            </button>
            
            {/* User Account */}
            <div className="relative">
              {currentUser ? (
                <>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <img 
                      src={avatarImg} 
                      alt="User Profile" 
                      className={`w-8 h-8 rounded-full ${currentUser ? 'ring-2 ring-primary' : ''}`} 
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-lg overflow-hidden z-40 border border-gray-200 transform origin-top-right transition-all">
                      <div className="p-3 border-b border-gray-200">
                        <p className="font-medium text-gray-900">{currentUser.displayName || 'User'}</p>
                        <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
                      </div>
                      <ul className="py-1">
                        {navigation.map((item) => (
                          <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                            <Link to={item.href} className="block px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <button
                            onClick={handleLogOut}
                            className="block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 text-red-600"
                          >
                            Sign Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : token ? (
                <Link to="/dashboard" className="text-primary font-medium hover:text-primary-dark">Dashboard</Link>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">
                  <HiOutlineUser className="w-6 h-6" />
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <div className="bg-primary hover:bg-primary-dark p-1.5 sm:px-4 sm:py-1.5 flex items-center rounded-full transition-colors">
                <HiOutlineShoppingCart className="w-5 h-5 text-white" />
                <span className="hidden sm:inline text-sm font-medium text-white sm:ml-1.5">
                  Cart
                </span>
              </div>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
          
        </nav>
      </div>
    </header>
  )
}

export default Navbar;