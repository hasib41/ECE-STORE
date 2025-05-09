import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();
  
  // Check if currentUser exists and has an email before querying
  const userEmail = currentUser?.email;
  
  const {
    data: orders = [],
    isLoading,
    isError,
    error
  } = useGetOrderByEmailQuery(userEmail, { 
    // Skip the query if there's no email
    skip: !userEmail 
  });

  // Debug orders data when it changes
  React.useEffect(() => {
    if (orders && orders.length > 0) {
      console.log('Orders received:', orders);
      // Check for Mobile Banking orders
      const mobileOrders = orders.filter(order => order.paymentMethod === 'Mobile Banking');
      if (mobileOrders.length > 0) {
        console.log('Mobile Banking orders:', mobileOrders);
        mobileOrders.forEach(order => {
          console.log(`Order ID: ${order._id}, has transactionId: ${!!order.transactionId}`);
          console.log('Order fields:', Object.keys(order));
        });
      }
    }
  }, [orders]);

  if (!userEmail) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You need to be logged in to view your orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error('Order fetch error:', error);
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error getting orders data. Please try again later.
              </p>
              <p className="text-xs text-red-500 mt-1">
                {error?.data?.message || "Unknown error occurred"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <p className="text-gray-600">You don't have any orders yet.</p>
          <button 
            onClick={() => window.location.href = '/shop'}
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="border p-6 rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <div>
                  <h2 className="font-bold text-lg text-gray-800">Order #{index + 1}</h2>
                  <p className="text-xs text-gray-500">ID: {order._id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Personal Details</h3>
                  <p className="text-gray-700"><span className="font-medium">Name:</span> {order.name}</p>
                  <p className="text-gray-700"><span className="font-medium">Student ID:</span> {order.studentId}</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {order.email}</p>
                  <p className="text-gray-700"><span className="font-medium">Phone:</span> {order.phone}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Order Details</h3>
                  <p className="text-gray-700"><span className="font-medium">Size:</span> {order.size}</p>
                  <p className="text-gray-700"><span className="font-medium">Sleeve Type:</span> {order.sleeveType}</p>
                  <p className="text-gray-700"><span className="font-medium">Name on Jersey:</span> {order.NameOnJersey}</p>
                  <p className="text-gray-700"><span className="font-medium">Number on Jersey:</span> {order.NumberOnJersey}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold text-gray-700 mb-2">Payment Information</h3>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Payment Method:</span>
                    <span className={`ml-2 px-2 py-0.5 text-sm rounded-full ${
                      order.paymentMethod === 'Mobile Banking' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {order.paymentMethod}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Total Price:</span> 
                    <span className="ml-2 font-bold text-green-700">৳{order.totalPrice}</span>
                  </p>
                  
                  {order.paymentMethod === 'Mobile Banking' && (
                    <div className="w-full mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-gray-700">
                        <span className="font-medium">Transaction ID:</span>
                        {order.transactionId ? (
                          <span className="ml-2 bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium inline-block mt-1">
                            {order.transactionId}
                          </span>
                        ) : (
                          <span className="ml-2 text-red-500 italic">Not provided</span>
                        )}
                      </p>
                      {/* Additional debug info */}
                      <div className="text-xs text-gray-500 mt-1">
                        {JSON.stringify(order.transactionId) === undefined ? 
                          "(Field missing)" : 
                          order.transactionId === null ? 
                            "(Field is null)" : 
                            order.transactionId === "" ? 
                              "(Field is empty)" : 
                              ""}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold text-gray-700 mb-2">Order Status</h3>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold text-gray-700 mb-2">Products</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  {order.productIds.map((productId, i) => (
                    <div key={i} className="flex items-center">
                      <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                      <span>Product {i+1}: {typeof productId === 'object' ? productId.title || 'Unknown' : productId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
