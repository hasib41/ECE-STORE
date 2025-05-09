import React, { useState, useEffect } from 'react';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../../redux/features/orders/ordersApi';
import Loading from '../../../components/Loading';
import { FiSearch, FiFilter, FiEye, FiEdit, FiChevronLeft, FiChevronRight, FiDownload, FiRefreshCw, FiShoppingCart } from 'react-icons/fi';
import { MdLocalShipping, MdShoppingBag, MdPendingActions, MdOutlineCancel } from 'react-icons/md';
import { TbPackage } from 'react-icons/tb';
import getBaseUrl from '../../../utils/baseURL';

const TotalOrders = () => {
  const { data: orders, isLoading, isError, error, refetch } = useGetAllOrdersQuery();
  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(8);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);

  useEffect(() => {
    if (error?.status === 'PARSING_ERROR') {
      console.error('Parsing error detected - likely receiving HTML instead of JSON');
      console.error('Error details:', error);
    }
    
    // Debug orders data - specifically transaction IDs
    if (orders && orders.length > 0) {
      console.log('Total orders loaded:', orders.length);
      
      // Debug date filtering
      if (dateFilter !== 'all') {
        console.log(`Date filter active: ${dateFilter}`);
        const today = new Date();
        
        // Calculate date filter boundaries
        const startOfToday = new Date(today);
        startOfToday.setHours(0, 0, 0, 0);
        
        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999);
        
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        console.log('Date filter boundaries:');
        console.log('- Current time:', today.toISOString());
        console.log('- Start of today:', startOfToday.toISOString());
        console.log('- End of today:', endOfToday.toISOString());
        console.log('- Start of week:', startOfWeek.toISOString());
        console.log('- Start of month:', startOfMonth.toISOString());
        
        // Count orders matching date filter
        const ordersMatchingDateFilter = orders.filter(order => {
          const orderDate = new Date(order.createdAt);
          if (dateFilter === 'today') {
            return orderDate >= startOfToday && orderDate <= endOfToday;
          } else if (dateFilter === 'week') {
            return orderDate >= startOfWeek;
          } else if (dateFilter === 'month') {
            return orderDate >= startOfMonth;
          }
          return true;
        });
        
        console.log(`Orders matching "${dateFilter}" filter: ${ordersMatchingDateFilter.length} out of ${orders.length}`);
        
        // Sample a few orders to verify date filtering
        const sampleSize = Math.min(5, orders.length);
        console.log(`Sample of ${sampleSize} orders with their dates:`);
        orders.slice(0, sampleSize).forEach(order => {
          const orderDate = new Date(order.createdAt);
          console.log(`Order ${order._id} - created: ${orderDate.toISOString()}`);
        });
      }
      
      const mobileOrders = orders.filter(o => o.paymentMethod === 'Mobile Banking');
      if (mobileOrders.length > 0) {
        console.log('Mobile banking orders:', mobileOrders.length);
        console.log('Transaction ID inspection:');
        mobileOrders.forEach(order => {
          console.log(`Order ${order._id} - transactionId:`, order.transactionId);
          console.log(`Order has transactionId property:`, 'transactionId' in order);
          console.log(`Transaction ID type:`, typeof order.transactionId);
          console.log(`Transaction ID value is null:`, order.transactionId === null);
          console.log(`Transaction ID is empty string:`, order.transactionId === '');
          console.log(`Transaction ID is undefined:`, order.transactionId === undefined);
          console.log(`Order fields:`, Object.keys(order));
        });
      }
    }
  }, [orders, isLoading, isError, error, dateFilter]);

  // Filter orders based on search term and filters
  const filteredOrders = orders ? orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    let matchesDate = true;
    if (order.createdAt && dateFilter !== 'all') {
      const orderDate = new Date(order.createdAt);
      const today = new Date();
      
      // Reset today's time to midnight
      const startOfToday = new Date(today);
      startOfToday.setHours(0, 0, 0, 0);
      
      // Calculate end of today
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);
      
      // Calculate start of this week (Sunday)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      
      // Calculate start of this month
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      if (dateFilter === 'today') {
        // Order date must be between start and end of today
        matchesDate = orderDate >= startOfToday && orderDate <= endOfToday;
      } else if (dateFilter === 'week') {
        // Order date must be between start of week and now
        matchesDate = orderDate >= startOfWeek;
      } else if (dateFilter === 'month') {
        // Order date must be between start of month and now
        matchesDate = orderDate >= startOfMonth;
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  }) : [];

  // Calculate order statistics
  const orderStats = orders ? {
    total: orders.length,
    pending: orders.filter(order => order.status === 'pending').length,
    processing: orders.filter(order => order.status === 'processing').length,
    shipped: orders.filter(order => order.status === 'shipped').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length,
  } : { total: 0, pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Handle viewing order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsEditing(false);
  };

  // Handle editing order status
  const handleEditStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status || 'pending');
    setIsEditing(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsEditing(false);
    setNewStatus('');
  };
  
  // Save order status changes
  const saveOrderStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    
    try {
      await updateOrderStatus({
        id: selectedOrder._id,
        status: newStatus
      }).unwrap();
      
      // Use a more modern notification instead of alert (would normally use a toast library)
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md transition-all z-50';
      notification.innerHTML = 'Order status updated successfully';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 3000);
      
      handleCloseModal();
      refetch(); // Refresh the orders list
    } catch (error) {
      console.error('Failed to update order status:', error);
      
      // Error notification
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md transition-all z-50';
      notification.innerHTML = 'Failed to update order status';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 3000);
    }
  };

  // Order status options
  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <MdPendingActions className="w-5 h-5 text-yellow-600" />;
      case 'processing':
        return <TbPackage className="w-5 h-5 text-orange-600" />;
      case 'shipped':
        return <MdLocalShipping className="w-5 h-5 text-blue-600" />;
      case 'delivered':
        return <MdShoppingBag className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <MdOutlineCancel className="w-5 h-5 text-red-600" />;
      default:
        return <MdPendingActions className="w-5 h-5 text-gray-600" />;
    }
  };

  // Main render
  return (
    <div className="space-y-6">
      {/* Order Summary */}
      {isSummaryVisible && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
            <button 
              onClick={() => setIsSummaryVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Total Orders */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <FiShoppingCart className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500">Total Orders</p>
                  <p className="text-xl font-semibold text-gray-800">{orderStats.total}</p>
                </div>
              </div>
            </div>
            
            {/* Pending Orders */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <MdPendingActions className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500">Pending</p>
                  <p className="text-xl font-semibold text-gray-800">{orderStats.pending}</p>
                </div>
              </div>
            </div>
            
            {/* Processing Orders */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <TbPackage className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500">Processing</p>
                  <p className="text-xl font-semibold text-gray-800">{orderStats.processing}</p>
                </div>
              </div>
            </div>
            
            {/* Shipped Orders */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MdLocalShipping className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500">Shipped</p>
                  <p className="text-xl font-semibold text-gray-800">{orderStats.shipped}</p>
                </div>
              </div>
            </div>
            
            {/* Delivered Orders */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <MdShoppingBag className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500">Delivered</p>
                  <p className="text-xl font-semibold text-gray-800">{orderStats.delivered}</p>
                </div>
              </div>
            </div>
            
            {/* Cancelled Orders */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <MdOutlineCancel className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-500">Cancelled</p>
                  <p className="text-xl font-semibold text-gray-800">{orderStats.cancelled}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Header with actions */}
        <div className="border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800 mr-3">Orders</h2>
            {!isSummaryVisible && (
              <button 
                onClick={() => setIsSummaryVisible(true)} 
                className="text-xs text-purple-600 hover:text-purple-800"
              >
                Show Summary
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => refetch()} 
              className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <FiRefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </button>
            
            <button className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <FiDownload className="w-4 h-4 mr-1" />
              Export
            </button>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by order ID, email or name"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  className={`appearance-none border py-2 pl-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    statusFilter !== 'all' 
                      ? 'bg-purple-50 border-purple-300 text-purple-700 font-medium' 
                      : 'bg-white border-gray-300'
                  }`}
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1); // Reset to first page on filter change
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiFilter className={`${statusFilter !== 'all' ? 'text-purple-500' : 'text-gray-400'}`} />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className={`appearance-none border py-2 pl-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    dateFilter !== 'all' 
                      ? 'bg-purple-50 border-purple-300 text-purple-700 font-medium' 
                      : 'bg-white border-gray-300'
                  }`}
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setCurrentPage(1); // Reset to first page on filter change
                  }}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiFilter className={`${dateFilter !== 'all' ? 'text-purple-500' : 'text-gray-400'}`} />
                </div>
              </div>
              
              {/* Clear filters button - only show when filters are active */}
              {(statusFilter !== 'all' || dateFilter !== 'all' || searchTerm !== '') && (
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setDateFilter('all');
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="flex items-center px-3 py-2 text-sm bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loading />
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        ) : isError ? (
          /* Error State */
          <div className="text-center p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Orders</h3>
            <p className="text-gray-600 mb-6">{error?.data?.message || error?.error || 'Unknown error occurred'}</p>
            
            {error?.status === 'PARSING_ERROR' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left max-w-lg mx-auto">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">API Error</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>The server may be unavailable or returning HTML instead of JSON.</p>
                      <p className="mt-1">Make sure your backend server is running at {getBaseUrl()}</p>
                      <p className="mt-1">Check that the endpoint {getBaseUrl()}/api/orders is returning JSON data</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => refetch()} 
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <FiRefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          /* Empty State */
          <div className="text-center p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-600 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Orders Found</h3>
            {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? (
              <p className="text-gray-600 mb-6">No orders match your current filters. Try adjusting your search criteria.</p>
            ) : (
              <p className="text-gray-600 mb-6">No orders have been placed yet.</p>
            )}
            
            {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }} 
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Clear Filters
              </button>
            ) : (
              <button 
                onClick={() => refetch()} 
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <FiRefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </button>
            )}
          </div>
        ) : (
          /* Orders Table */
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {order._id.substring(0, 8)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium">
                          {order.name ? order.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{order.name || 'Unknown'}</div>
                          <div className="text-xs text-gray-500">{order.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-h-16 overflow-y-auto text-sm text-gray-900">
                        {order.productIds && order.productIds.length > 0 ? (
                          <div>
                            {order.productIds.map((product, index) => (
                              <div key={index} className="mb-1 flex items-center">
                                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                {product.title || 'Unnamed Product'}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500">No products</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.totalPrice ? `${order.totalPrice.toFixed(2)} BDT` : '0.00 BDT'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${
                          order.paymentMethod === 'Mobile Banking' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.paymentMethod || 'N/A'}
                        </span>
                        {order.paymentMethod === 'Mobile Banking' && (
                          <div className="mt-1">
                            <div className="text-xs">
                              <span className="font-semibold text-gray-700">TXN ID:</span> 
                              {order.transactionId ? (
                                <span className="inline-block mt-1 font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded break-all">
                                  {order.transactionId}
                                </span>
                              ) : (
                                <span className="text-red-500 font-medium">Missing</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleViewDetails(order)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors flex items-center"
                        >
                          <FiEye className="h-4 w-4 mr-1" />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => handleEditStatus(order)}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors flex items-center"
                        >
                          <FiEdit className="h-4 w-4 mr-1" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {!isLoading && !isError && filteredOrders.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{' '}
                  <span className="font-medium">{filteredOrders.length}</span> results
                </p>
                {(statusFilter !== 'all' || dateFilter !== 'all') && (
                  <p className="text-xs text-purple-600 mt-1">
                    {statusFilter !== 'all' && (
                      <span className="mr-2">Status: <strong>{statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</strong></span>
                    )}
                    {dateFilter !== 'all' && (
                      <span>Period: <strong>
                        {dateFilter === 'today' ? 'Today' : 
                         dateFilter === 'week' ? 'This Week' : 
                         dateFilter === 'month' ? 'This Month' : ''}
                      </strong></span>
                    )}
                  </p>
                )}
              </div>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border ${
                        currentPage === i + 1
                          ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      } text-sm font-medium`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                {isEditing ? 'Update Order Status' : 'Order Details'}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isEditing ? (
              /* Edit Status Form */
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-3">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Current Status:</span>
                      <div className="flex items-center">
                        {getStatusIcon(selectedOrder.status)}
                        <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            selectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            selectedOrder.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {selectedOrder.status ? selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) : 'Pending'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Order ID:</span>
                      <span className="text-sm text-gray-900">{selectedOrder._id}</span>
                    </div>
                  </div>
                  
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Status:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {statusOptions.map(status => (
                      <div 
                        key={status} 
                        className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center transition-all ${
                          newStatus === status.toLowerCase() 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                        }`}
                        onClick={() => setNewStatus(status.toLowerCase())}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                          status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                          status === 'Processing' ? 'bg-orange-100 text-orange-600' :
                          status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                          status === 'Delivered' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {status === 'Pending' ? <MdPendingActions className="w-4 h-4" /> :
                           status === 'Processing' ? <TbPackage className="w-4 h-4" /> :
                           status === 'Shipped' ? <MdLocalShipping className="w-4 h-4" /> :
                           status === 'Delivered' ? <MdShoppingBag className="w-4 h-4" /> :
                           <MdOutlineCancel className="w-4 h-4" />}
                        </div>
                        <span className="text-xs font-medium text-gray-700">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-end space-x-3">
                  <button 
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveOrderStatus}
                    className="px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              /* Order Details View */
              <div className="p-6">
                {/* Order Status & Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex flex-wrap justify-between items-start">
                    <div className="mb-4 md:mb-0">
                      <h4 className="text-base font-semibold text-gray-800 mb-1">Order Information</h4>
                      <div className="flex flex-col md:flex-row md:space-x-6">
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="text-sm font-medium">{selectedOrder._id}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="text-sm font-medium">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="text-sm font-medium">৳{selectedOrder.totalPrice?.toFixed(2) || '0.00'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <div className="flex items-center">
                        {getStatusIcon(selectedOrder.status)}
                        <span className={`ml-2 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                          ${selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            selectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            selectedOrder.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {selectedOrder.status ? selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1) : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Customer Information */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">Customer Information</h4>
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-lg font-medium mr-3">
                        {selectedOrder.name ? selectedOrder.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <h5 className="text-base font-medium">{selectedOrder.name || 'N/A'}</h5>
                        <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="text-sm font-medium">{selectedOrder.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Student ID</p>
                        <p className="text-sm font-medium">{selectedOrder.studentId || 'N/A'}</p>
                      </div>
                      {selectedOrder.address && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="text-sm font-medium">{selectedOrder.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Order Details */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">Order Details</h4>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Size</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{selectedOrder.size || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Sleeve Type</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{selectedOrder.sleeveType || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Name on Jersey</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{selectedOrder.NameOnJersey || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Number on Jersey</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{selectedOrder.NumberOnJersey || 'N/A'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">Payment Information</h4>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Payment Method</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              selectedOrder.paymentMethod === 'Mobile Banking' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {selectedOrder.paymentMethod || 'N/A'}
                            </span>
                          </td>
                        </tr>
                        {selectedOrder.paymentMethod === 'Mobile Banking' && (
                          <tr className="bg-blue-50">
                            <td className="px-4 py-3 text-sm font-bold text-gray-900">Transaction ID</td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {selectedOrder.transactionId ? (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-medium break-all">
                                  {selectedOrder.transactionId}
                                </span>
                              ) : (
                                <span className="text-red-500 font-medium">Missing</span>
                              )}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Total Amount</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">৳{selectedOrder.totalPrice?.toFixed(2) || '0.00'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Products Information */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">Products</h4>
                  <div className="bg-white rounded-lg border border-gray-200">
                    {selectedOrder.productIds && selectedOrder.productIds.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {selectedOrder.productIds.map((product, index) => (
                          <div key={index} className="p-4 flex flex-wrap md:flex-nowrap items-center">
                            <div className="flex-shrink-0 w-full md:w-auto mb-3 md:mb-0 md:mr-4">
                              {product.coverImage ? (
                                <img 
                                  src={product.coverImage} 
                                  alt={product.title || 'Product image'} 
                                  className="w-full md:w-24 h-24 object-cover rounded-lg"
                                />
                              ) : (
                                <div className="w-full md:w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-grow">
                              <h5 className="text-base font-semibold text-gray-900 mb-1">{product.title || 'Unnamed Product'}</h5>
                              <div className="flex flex-wrap gap-3">
                                {product.Price && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                                    ৳{product.Price.toFixed(2)}
                                  </span>
                                )}
                                {selectedOrder.size && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                    Size: {selectedOrder.size}
                                  </span>
                                )}
                                {selectedOrder.sleeveType && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                                    {selectedOrder.sleeveType}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <svg className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                        </svg>
                        <p>No product details available</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between border-t border-gray-200 pt-6">
                  <button
                    onClick={() => handleEditStatus(selectedOrder)}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <FiEdit className="h-4 w-4 mr-2" />
                    Edit Status
                  </button>
                  <button 
                    onClick={handleCloseModal}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalOrders;