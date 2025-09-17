import React from 'react';
import { useSearchParams } from 'react-router-dom';

const TransactionFilters = ({ onFilterChange }) => {
  const [searchParams] = useSearchParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      status: '',
      schoolId: '',
      startDate: '',
      endDate: '',
      sortBy: 'payment_time',
      order: 'desc'
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter Transactions</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-600 hover:text-gray-900 underline font-medium transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={searchParams.get('status') || ''}
            onChange={handleInputChange}
            className="w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 rounded-lg transition-colors duration-200"
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* School ID Filter */}
        <div>
          <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700 mb-2">
            Institute ID
          </label>
          <input
            type="text"
            name="schoolId"
            id="schoolId"
            value={searchParams.get('schoolId') || ''}
            onChange={handleInputChange}
            placeholder="Enter Institute ID"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm transition-colors duration-200"
          />
        </div>

        {/* Start Date Filter */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={searchParams.get('startDate') || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm transition-colors duration-200"
          />
        </div>

        {/* End Date Filter */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={searchParams.get('endDate') || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm transition-colors duration-200"
          />
        </div>

        {/* Sort By Filter */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            name="sortBy"
            id="sortBy"
            value={searchParams.get('sortBy') || 'payment_time'}
            onChange={handleInputChange}
            className="w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 rounded-lg transition-colors duration-200"
          >
            <option value="payment_time">Payment Time</option>
            <option value="order_amount">Order Amount</option>
            <option value="transaction_amount">Transaction Amount</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* Sort Order Filter */}
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
            Order
          </label>
          <select
            name="order"
            id="order"
            value={searchParams.get('order') || 'desc'}
            onChange={handleInputChange}
            className="w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 rounded-lg transition-colors duration-200"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;