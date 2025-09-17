import React from 'react';

const TransactionTable = ({ transactions, loading }) => {
  const columns = [
    'Custom Order ID',
    'School ID', 
    'Student Name',
    'Gateway', 
    'Order Amount', 
    'Transaction Amount', 
    'Status', 
    'Payment Time'
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      success: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
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
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-8 gap-4">
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
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <div className="text-gray-500 text-lg">No transactions found.</div>
        <p className="text-gray-400 mt-2">Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th 
                  key={col} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx.collect_id} className="hover:bg-gray-50 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {tx.custom_order_id || tx.collect_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  {tx.school_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  {tx.student_name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  {tx.gateway_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  {formatCurrency(tx.order_amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  {formatCurrency(tx.transaction_amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(tx.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  {formatDate(tx.payment_time)}
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