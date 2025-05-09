import React, { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError, error } = useGetOrderByEmailQuery(currentUser?.email);

    useEffect(() => {
        // For debugging - log orders data structure
        console.log("Orders data:", orders);
        if (error) {
            console.error("Error in orders query:", error);
        }
    }, [orders, error]);

    if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (isError) return <div className="flex justify-center items-center min-h-screen">Error getting orders data</div>;

    return (
        <div className=" bg-gray-100 py-16">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                <p className="text-gray-700 mb-6">Welcome, {currentUser?.name || 'User'}! Here are your recent orders:</p>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                    {orders.length > 0 ? (
                        <ul className="space-y-4">
                            {orders.map((order) => (
                                <li key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1">
                                    <p className="font-medium">Order ID: {order._id}</p>
                                    <p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                                    <p>Total: ৳{order.totalPrice}</p>
                                    <div className="mt-2">
                                        <p className="font-medium text-sm">Products:</p>
                                        <ul className="ml-4 mt-1">
                                            {order.productIds && order.productIds.map((product, index) => (
                                                <li key={index} className="text-sm text-gray-700">
                                                    {typeof product === 'object' ? 
                                                        product.title || `Product ${index + 1}` : 
                                                        `Product ID: ${product}`}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>


                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">You have no recent orders.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
