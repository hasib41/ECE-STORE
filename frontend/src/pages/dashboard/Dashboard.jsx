import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { FiPackage, FiShoppingCart } from 'react-icons/fi';
import { HiCurrencyDollar, HiShoppingCart, HiOutlineShoppingBag, HiOutlineUsers } from 'react-icons/hi';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate the percentage for growth indicators
    const calculateGrowth = () => {
        return Math.floor(Math.random() * 20) + 1; // Just for demo - replace with real calculation
    };

    // Format currency
    const formatCurrency = (amount) => {
        return amount ? `${amount} BDT` : '0 BDT';
    };
    
    if (loading) return <Loading />;

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Welcome to ECE Store Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your store, products, and orders</p>
            </div>

            {/* Main stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Products Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="p-4 flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-100 text-purple-600">
                            <HiOutlineShoppingBag className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <div className="text-xs font-medium text-gray-500 uppercase">Total Products</div>
                            <div className="mt-1 text-xl font-semibold text-gray-800">{data?.totalMerchandise || 0}</div>
                        </div>
                    </div>
                    <Link to="/dashboard/manage-merchandise" className="block text-center py-2 bg-purple-50 text-purple-600 text-sm font-medium border-t border-purple-100 hover:bg-purple-100 transition-colors">
                        Manage Products
                    </Link>
                </div>

                {/* Sales Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="p-4 flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 text-green-600">
                            <HiCurrencyDollar className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <div className="text-xs font-medium text-gray-500 uppercase">Total Revenue</div>
                            <div className="mt-1 text-xl font-semibold text-gray-800">{formatCurrency(data?.totalSales || 0)}</div>
                        </div>
                    </div>
                    <Link to="/dashboard/total-orders" className="block text-center py-2 bg-green-50 text-green-600 text-sm font-medium border-t border-green-100 hover:bg-green-100 transition-colors">
                        View Revenue
                    </Link>
                </div>

                {/* Orders Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="p-4 flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 text-blue-600">
                            <HiShoppingCart className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <div className="text-xs font-medium text-gray-500 uppercase">Total Orders</div>
                            <div className="mt-1 text-xl font-semibold text-gray-800">{data?.totalOrders || 0}</div>
                        </div>
                    </div>
                    <a href="/dashboard/total-orders" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/dashboard/total-orders";
                    }} className="block text-center py-2 bg-blue-50 text-blue-600 text-sm font-medium border-t border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
                        Manage Orders
                    </a>
                </div>

                {/* Customers Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className="p-4 flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600">
                            <HiOutlineUsers className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <div className="text-xs font-medium text-gray-500 uppercase">Total Customers</div>
                            <div className="mt-1 text-xl font-semibold text-gray-800">{data?.totalCustomers || 42}</div>
                        </div>
                    </div>
                    <div className="block text-center py-2 bg-indigo-50 text-indigo-600 text-sm font-medium border-t border-indigo-100">
                        Customer Analytics
                    </div>
                </div>
            </div>



            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">Recent Orders</h3>
                    <a href="/dashboard/total-orders" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/dashboard/total-orders";
                    }} className="text-sm text-purple-600 hover:text-purple-700 cursor-pointer">
                        View All Orders
                    </a>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Sample order rows - these would be actual orders from your API */}
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    #ORD001
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium text-xs">H</div>
                                        <div className="ml-2">
                                            <div className="text-sm font-medium text-gray-900">Hasib</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Cricket Jersey 2025</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">750 BDT</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                                        Shipped
                                    </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => window.location.href = "/dashboard/total-orders"} className="text-purple-600 hover:text-purple-900 cursor-pointer">
                                        View
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    #ORD002
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium text-xs">H</div>
                                        <div className="ml-2">
                                            <div className="text-sm font-medium text-gray-900">Hasib</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Cricket Jersey 2025</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">750 BDT</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                                        Delivered
                                    </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => window.location.href = "/dashboard/total-orders"} className="text-purple-600 hover:text-purple-900 cursor-pointer">
                                        View
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    #ORD003
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium text-xs">Z</div>
                                        <div className="ml-2">
                                            <div className="text-sm font-medium text-gray-900">Zarin</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Cricket Jersey 2024/2025</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">1400 BDT</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-yellow-100 text-yellow-800">
                                        Pending
                                    </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => window.location.href = "/dashboard/total-orders"} className="text-purple-600 hover:text-purple-900 cursor-pointer">
                                        View
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/dashboard/add-new-merchandise" className="bg-purple-600 text-white rounded-lg p-4 text-center hover:bg-purple-700 transition-colors">
                    <HiOutlineShoppingBag className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium">Add Product</span>
                </Link>
                
                <Link to="/dashboard/manage-merchandise" className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition-colors">
                    <FiPackage className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium">Manage Inventory</span>
                </Link>
                
                <a href="/dashboard/total-orders" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/dashboard/total-orders";
                }} className="bg-green-600 text-white rounded-lg p-4 text-center hover:bg-green-700 transition-colors cursor-pointer">
                    <FiShoppingCart className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium">View Orders</span>
                </a>
                
                <Link to="/" className="bg-gray-600 text-white rounded-lg p-4 text-center hover:bg-gray-700 transition-colors">
                    <HiOutlineShoppingBag className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium">Visit Store</span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;