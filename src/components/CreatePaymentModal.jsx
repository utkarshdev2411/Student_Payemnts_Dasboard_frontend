import React, { useState } from 'react';
import { paymentAPI } from '../api/endpoints';
import { useNotification } from '../hooks/useNotification';

const CreatePaymentModal = ({ isOpen, onClose, onSuccess }) => {
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    studentName: '',
    studentId: '',
    studentEmail: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCurrency = (value) => {
    // Remove all non-digit characters except decimal point
    const cleaned = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    return cleaned;
  };

  const handleAmountChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData(prev => ({
      ...prev,
      amount: formatted
    }));
    
    if (errors.amount) {
      setErrors(prev => ({
        ...prev,
        amount: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    if (!formData.studentEmail.trim()) {
      newErrors.studentEmail = 'Student email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.studentEmail)) {
      newErrors.studentEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const paymentData = {
        order_amount: parseFloat(formData.amount),
        student_info: {
          name: formData.studentName.trim(),
          id: formData.studentId.trim(),
          email: formData.studentEmail.trim()
        },
        callback_url: `${window.location.origin}/dashboard`
      };

      const response = await paymentAPI.createPayment(paymentData);
      
      showSuccess('Payment link created successfully! Redirecting to payment page...');
      
      // Reset form
      setFormData({
        amount: '',
        studentName: '',
        studentId: '',
        studentEmail: ''
      });
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      onClose();
      
      // Redirect to payment URL
      setTimeout(() => {
        window.open(response.payment_url, '_blank');
      }, 1000);
      
    } catch (error) {
      console.error('Payment creation error:', error);
      
      // Enhanced error handling
      let errorMessage = 'Failed to create payment link. Please try again.';
      
      if (error.response?.status === 502) {
        // Gateway errors
        const errorData = error.response.data;
        if (errorData.error_code === 401) {
          errorMessage = 'Payment service authentication error. Please contact support.';
        } else {
          errorMessage = errorData.message || 'Payment gateway is temporarily unavailable. Please try again later.';
        }
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid payment details. Please check your inputs.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error occurred. Please try again later.';
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        errorMessage = 'Network connection error. Please check your internet connection.';
      }
      
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        amount: '',
        studentName: '',
        studentId: '',
        studentEmail: ''
      });
      setErrors({});
      onClose();
    }
  };

  const quickAmounts = [500, 1000, 1500, 2000, 2500, 3000];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl transform transition-all scale-100 animate-slideUp border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100/50 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Create Payment</h2>
                  <p className="text-sm text-gray-600 mt-1">Generate a secure payment link for students</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 transition-all duration-200 p-2 hover:bg-white/60 rounded-xl group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Amount Section - Left Side */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-1.5 bg-green-100 rounded-lg">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <label className="text-sm font-semibold text-gray-900">
                  Payment Amount
                </label>
              </div>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                    className={`px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-xl border-2 ${
                      formData.amount === amount.toString()
                        ? 'bg-blue-500 text-white border-blue-500 shadow-lg scale-105'
                        : 'text-gray-700 bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:scale-105'
                    }`}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
              </div>
              
              {/* Amount Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-600 text-xl font-bold">₹</span>
                </div>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className={`w-full pl-10 pr-4 py-4 text-xl font-bold border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-200 bg-white ${
                    errors.amount
                      ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50/30'
                      : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300'
                  }`}
                />
              </div>
              {errors.amount && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
                  <p className="text-sm text-red-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.amount}
                  </p>
                </div>
              )}
            </div>

            {/* Student Information Section - Right Side */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center space-x-2 mb-5">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <label className="text-sm font-semibold text-gray-900">
                  Student Information
                </label>
              </div>
              
              <div className="space-y-5">
                {/* Student Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="Enter student's full name"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-200 bg-white font-medium ${
                        errors.studentName
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50/30'
                          : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.studentName && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
                      <p className="text-sm text-red-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.studentName}
                      </p>
                    </div>
                  )}
                </div>

                {/* Student ID */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Student ID</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      placeholder="Enter student ID or roll number"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-200 bg-white font-medium ${
                        errors.studentId
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50/30'
                          : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.studentId && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
                      <p className="text-sm text-red-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.studentId}
                      </p>
                    </div>
                  )}
                </div>

                {/* Student Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="studentEmail"
                      value={formData.studentEmail}
                      onChange={handleInputChange}
                      placeholder="student@university.edu"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-200 bg-white font-medium ${
                        errors.studentEmail
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50/30'
                          : 'border-gray-200 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.studentEmail && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
                      <p className="text-sm text-red-700 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.studentEmail}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions - Positioned below student information and aligned to right */}
              <div className="flex gap-4 pt-6 mt-6 border-t border-gray-200 justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="px-6 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg  transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Payment...
                    </>
                  ) : (
                    <>
                     
                      Continue
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePaymentModal;