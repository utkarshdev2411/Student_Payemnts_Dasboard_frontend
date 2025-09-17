import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { useTransactions } from '../hooks/useTransactions';
import TransactionTable from '../components/TransactionTable';
import TransactionFilters from '../components/TransactionFilters';
import Pagination from '../components/Pagination';
import CreatePaymentModal from '../components/CreatePaymentModal';
import CheckStatusModal from '../components/CheckStatusModal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { showSuccess } = useNotification();
  const { transactions, pagination, loading, updateFilters, changePage, changeLimit, fetchTransactions } = useTransactions();
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

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
    }, 2000);
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
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Payment
              </button>
              
              <button
                onClick={() => setIsStatusModalOpen(true)}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Check Status
              </button>
              
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
        <div className="space-y-8">
          {/* Filters */}
          <TransactionFilters onFilterChange={updateFilters} />
          
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
      
      <CheckStatusModal 
        isOpen={isStatusModalOpen} 
        onClose={() => setIsStatusModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;