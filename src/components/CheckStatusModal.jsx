import React, { useState } from 'react';
import { transactionAPI } from '../api/endpoints';
import { useNotification } from '../hooks/useNotification';

const CheckStatusModal = ({ isOpen, onClose }) => {
  const [collectId, setCollectId] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { showError } = useNotification();

  const handleChange = (e) => {
    setCollectId(e.target.value);
    setError('');
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!collectId.trim()) {
      setError('Please enter a transaction ID');
      return;
    }

    setIsLoading(true);
    setError('');
    setStatus(null);

    try {
      const response = await transactionAPI.getTransactionStatus(collectId.trim());
      setStatus(response);
    } catch (error) {
      console.error('Status check error:', error);
      if (error.response?.status === 404) {
        setError('Transaction not found. Please check the transaction ID and try again.');
      } else {
        setError(error.response?.data?.message || 'Failed to check transaction status. Please try again.');
        showError('Failed to check transaction status');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setCollectId('');
      setStatus(null);
      setError('');
      onClose();
    }
  };

  const getStatusBadge = (statusValue) => {
    const statusClasses = {
      success: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      failed: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full border ${statusClasses[statusValue] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {statusValue?.toUpperCase()}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return amount ? `₹${parseFloat(amount).toFixed(2)}` : 'N/A';
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'N/A';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Check Transaction Status</h3>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="collectId" className="block text-sm font-medium text-gray-700 mb-1">
              Transaction ID / Custom Order ID
            </label>
            <input
              type="text"
              id="collectId"
              value={collectId}
              onChange={handleChange}
              placeholder="Enter transaction ID"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                error ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !collectId.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? 'Checking...' : 'Check Status'}
            </button>
          </div>
        </form>

        {/* Status Display */}
        {status && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="text-md font-medium text-gray-900 mb-3">Transaction Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Status:</span>
                {getStatusBadge(status.status)}
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Transaction ID:</span>
                <span className="text-sm text-gray-900 font-mono">{status.collect_id}</span>
              </div>

              {status.order_amount && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Order Amount:</span>
                  <span className="text-sm text-gray-900 font-semibold">{formatCurrency(status.order_amount)}</span>
                </div>
              )}

              {status.transaction_amount && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Transaction Amount:</span>
                  <span className="text-sm text-gray-900 font-semibold">{formatCurrency(status.transaction_amount)}</span>
                </div>
              )}

              {status.payment_mode && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Payment Mode:</span>
                  <span className="text-sm text-gray-900 capitalize">{status.payment_mode}</span>
                </div>
              )}

              {status.bank_reference && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Bank Reference:</span>
                  <span className="text-sm text-gray-900 font-mono">{status.bank_reference}</span>
                </div>
              )}

              {status.payment_time && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Payment Time:</span>
                  <span className="text-sm text-gray-900">{formatDate(status.payment_time)}</span>
                </div>
              )}

              {status.payment_message && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Message:</span>
                  <span className="text-sm text-gray-900">{status.payment_message}</span>
                </div>
              )}

              {status.error_message && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Error:</span>
                  <span className="text-sm text-red-600">{status.error_message}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                <span className="text-sm text-gray-900">{formatDate(status.last_updated)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatusModal;