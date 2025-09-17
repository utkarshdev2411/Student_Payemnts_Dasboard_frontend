import React, { useState } from 'react';

const TransactionTable = ({ transactions, loading }) => {
  const [copiedId, setCopiedId] = useState(null);

  const columns = [
    'Sr. No',
    'Institute Name', 
    'Date & Time',
    'Order Amount', 
    'Transaction ID', 
    'Payment Method',
    'Student Name',
    'Status'
  ];

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getStatusDisplay = (status) => {
    const statusColors = {
      success: 'text-green-700',
      pending: 'text-yellow-700',
      failed: 'text-red-700'
    };
    
    return (
      <span className={`text-sm font-semibold ${statusColors[status] || 'text-gray-700'}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return amount ? `₹${parseFloat(amount).toFixed(2)}` : 'N/A';
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleString() : 'N/A';
  };

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-8 gap-6">
                {[...Array(8)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-lg p-12 text-center border border-gray-200">
        <div className="text-gray-500 text-lg font-medium">No transactions found</div>
        <p className="text-gray-400 mt-2">Try adjusting your filters or check back later for new transactions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              {columns.map(col => (
                <th 
                  key={col} 
                  className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {transactions.map((tx, index) => (
              <tr key={tx.collect_id} className="hover:bg-gray-50 transition-colors duration-150">
                {/* Sr. No */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                
                {/* Institute Name (School ID) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {tx.school_id}
                </td>
                
                {/* Date & Time */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(tx.payment_time)}
                </td>
                
                {/* Order Amount */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(tx.order_amount)}
                </td>
                
                {/* Transaction ID with Copy Icon */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs">
                      {tx.custom_order_id || tx.collect_id}
                    </span>
                    <button
                      onClick={() => copyToClipboard(tx.custom_order_id || tx.collect_id, tx.collect_id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors duration-150"
                      title="Copy Order ID"
                    >
                      {copiedId === tx.collect_id ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
                
                {/* Payment Method */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {tx.gateway_name}
                </td>
                
                {/* Student Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {tx.student_name || 'N/A'}
                </td>
                
                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusDisplay(tx.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;