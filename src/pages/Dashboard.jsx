import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { useTransactions } from '../hooks/useTransactions';
import TransactionTable from '../components/TransactionTable';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import CreatePaymentModal from '../components/CreatePaymentModal';
import DashboardStats from '../components/DashboardStats';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { showSuccess } = useNotification();
  const { transactions, pagination, loading, updateFilters, changePage, changeLimit, fetchTransactions } = useTransactions();
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh transactions every 10 seconds to catch status updates during development
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTransactions();
      setLastUpdated(new Date());
    }, 10000); // 10 seconds for faster development feedback

    return () => clearInterval(interval);
  }, [fetchTransactions]);

  const handleLogout = () => {
    showSuccess(`Goodbye ${user?.username}! You have been logged out.`, 3000);
    setTimeout(() => {
      logout();
    }, 500);
  };

  const handlePaymentSuccess = () => {
    // Refresh transactions after successful payment creation
    setTimeout(() => {
      fetchTransactions();
      setLastUpdated(new Date());
    }, 2000);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchTransactions();
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 500); // Show spinner for at least 500ms
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Student Payments Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Monitor and manage student payment transactions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-semibold text-gray-900">{user?.username}</span>
              </span>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center shadow-sm disabled:opacity-50"
                >
                  <svg 
                    className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
                
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Create Payment
                </button>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-[85%] mx-auto py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Dashboard Overview Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              
            </div>
            <DashboardStats />
          </div>
          
          {/* Filters */}
          <FilterBar onFilterChange={updateFilters} />
          
          {/* Last Updated Indicator */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              Last updated: {lastUpdated.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Auto-refreshing every 10 seconds
            </span>
          </div>
          
          {/* Transaction Table */}
          <TransactionTable transactions={transactions} loading={loading} />
          
          {/* Pagination */}
          <Pagination pagination={pagination} onPageChange={changePage} onLimitChange={changeLimit} />
        </div>
      </main>

      {/* Modals */}
      <CreatePaymentModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Dashboard;