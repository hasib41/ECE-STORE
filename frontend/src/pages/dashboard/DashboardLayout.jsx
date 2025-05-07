import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../../components/Loading';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden sm:flex sm:flex-col">
        <a href="/" className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500" />
        <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
          <nav className="flex flex-col mx-4 my-6 space-y-4">
            <Link to="/dashboard" className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-lg">
              <span className="sr-only">Dashboard</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0-01-2-2z" />
              </svg>
            </Link>
            <Link to="/dashboard/add-new-merchandise" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg">
              <span className="sr-only">Add Merchandise</span>
              <HiViewGridAdd className="h-6 w-6"/>
            </Link>
            <Link to="/dashboard/manage-merchandise" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg">
              <span className="sr-only">Manage Merchandise</span>
              <MdOutlineManageHistory className="h-6 w-6"/>
            </Link>
          </nav>
          <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
            <button onClick={handleLogout} className="p-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg">
              <span className="sr-only">Log out</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-grow text-gray-800">
        <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </header>

        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div>
              <h2 className="text-4xl font-semibold mb-2">ECE Store Inventory</h2>
              <p className="text-gray-600">Manage your merchandise efficiently</p>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
              <Link to="/dashboard/manage-merchandise" className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 hover:bg-purple-100 border border-purple-600 rounded-md mb-3">
                Manage Merchandise
              </Link>
              <Link to="/dashboard/add-new-merchandise" className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-md ml-6 mb-3">
                Add New Merchandise
              </Link>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;