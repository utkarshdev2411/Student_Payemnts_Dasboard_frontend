import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { useTransactions } from '../hooks/useTransactions';
import TransactionTable from '../components/TransactionTable';
import TransactionFilters from '../components/TransactionFilters';
import Pagination from '../components/Pagination';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { showSuccess } = useNotification();
  const { transactions, pagination, loading, updateFilters, changePage } = useTransactions();

  const handleLogout = () => {
    showSuccess(`Goodbye ${user?.username}! You have been logged out.`, 3000);
    setTimeout(() => {
      logout();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Transactions Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage and monitor student payment transactions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{user?.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Filters */}
          <TransactionFilters onFilterChange={updateFilters} />
          
          {/* Transaction Table */}
          <TransactionTable transactions={transactions} loading={loading} />
          
          {/* Pagination */}
          <Pagination pagination={pagination} onPageChange={changePage} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;