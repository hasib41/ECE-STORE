import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiViewGridAdd, HiHome } from "react-icons/hi";
import { MdOutlineManageHistory, MdDashboard, MdNotifications, MdInsights, MdSettings } from "react-icons/md";
import { FiShoppingCart, FiLogOut, FiUser, FiSettings, FiMenu, FiMessageSquare, FiHelpCircle } from "react-icons/fi";
import Loading from '../../components/Loading';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  // Check current route for active navigation
  const isActive = (path) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }
    return path !== "/dashboard" && location.pathname.startsWith(path);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Navigation items
  const navItems = [
    { path: "/dashboard", icon: <MdDashboard className="h-5 w-5" />, label: "Dashboard" },
    { path: "/dashboard/manage-merchandise", icon: <MdOutlineManageHistory className="h-5 w-5" />, label: "Products" },
    { path: "/dashboard/add-new-merchandise", icon: <HiViewGridAdd className="h-5 w-5" />, label: "Add Product" },
    { path: "/dashboard/total-orders", icon: <FiShoppingCart className="h-5 w-5" />, label: "Orders" },
  ];
  
  // Secondary nav items
  const secondaryNavItems = [
    { path: "/dashboard/settings", icon: <MdSettings className="h-5 w-5" />, label: "Settings" },
    { path: "/dashboard/help", icon: <FiHelpCircle className="h-5 w-5" />, label: "Help" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    // Reset search
    setSearchQuery('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-md border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <HiHome className="h-7 w-7 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-purple-600">ECE Store</span>
          </Link>
        </div>
        
        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          {/* Main Navigation */}
          <div className="mb-8">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Main
            </p>
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-purple-100 text-purple-700 shadow-sm"
                      : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  <span className={`${isActive(item.path) ? "text-purple-700" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span className="ml-3 font-medium text-sm">{item.label}</span>
                  {isActive(item.path) && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-purple-600"></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Secondary Navigation */}
          <div>
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Support
            </p>
            <nav className="mt-4 space-y-1">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  <span className={`${isActive(item.path) ? "text-purple-700" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span className="ml-3 font-medium text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Store Stats */}
        <div className="p-4 mx-4 mb-6 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-purple-700">Visit Store</span>
            <Link to="/" className="text-purple-700 hover:text-purple-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
          <Link to="/" className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
            <HiHome className="w-4 h-4 mr-2" />
            Go to Store
          </Link>
        </div>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <FiLogOut className="h-5 w-5 text-gray-500" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 z-20 m-4">
        <button
          className="p-2 bg-white rounded-lg shadow-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center">
                <HiHome className="h-7 w-7 text-purple-600" />
                <span className="ml-2 text-xl font-bold text-purple-600">ECE Store</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </form>
            
            {/* Mobile main navigation */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">
                Main
              </p>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-purple-100 text-purple-700 shadow-sm"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    <span className={`${isActive(item.path) ? "text-purple-700" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    <span className="ml-3 font-medium text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Mobile secondary navigation */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">
                Support
              </p>
              <nav className="space-y-1">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    <span className={`${isActive(item.path) ? "text-purple-700" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    <span className="ml-3 font-medium text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Mobile Store Button */}
            <div className="p-3 mb-6 bg-purple-50 rounded-lg">
              <Link to="/" className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                <HiHome className="w-4 h-4 mr-2" />
                Go to Store
              </Link>
            </div>
            
            {/* Mobile logout */}
            <div className="pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <FiLogOut className="h-5 w-5 text-gray-500" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-800 md:text-2xl">
                {navItems.find(item => isActive(item.path))?.label || secondaryNavItems.find(item => isActive(item.path))?.label || "Dashboard"}
              </h1>
              
              {/* Desktop search */}
              <div className="hidden md:block ml-6 flex-1 max-w-lg">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products, orders, or users..."
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 ${
                        isSearchFocused 
                          ? "border-purple-500 ring-2 ring-purple-200" 
                          : "border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      }`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className={`h-5 w-5 ${isSearchFocused ? "text-purple-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                    {searchQuery && (
                      <button 
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchQuery('')}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Help button */}
              <Link to="/dashboard/help" className="hidden md:block p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <FiHelpCircle className="h-6 w-6" />
              </Link>
              
              {/* Notification button */}
              <div className="relative">
                <button className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <MdNotifications className="h-6 w-6" />
                  {notificationsCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold text-center">
                      {notificationsCount}
                    </span>
                  )}
                </button>
              </div>
              
              {/* User menu */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium shadow-sm border border-purple-300">
                    A
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
                  <svg className="hidden md:block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-sm text-gray-500 truncate">admin@ece-store.com</p>
                    </div>
                    
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiUser className="mr-3 h-4 w-4 text-gray-500" />
                      Your Profile
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiSettings className="mr-3 h-4 w-4 text-gray-500" />
                      Settings
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FiMessageSquare className="mr-3 h-4 w-4 text-gray-500" />
                      Messages
                    </button>
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <FiLogOut className="mr-3 h-4 w-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;