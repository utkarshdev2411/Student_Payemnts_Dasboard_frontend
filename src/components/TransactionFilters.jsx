import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';import { useSearchParams } from 'react-router-dom';

const TransactionFilters = ({ onFilterChange }) => {

  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');

const TransactionFilters = ({ onFilterChange }) => {const TransactionFilters = ({ onFilterChange }) => {

  // Debounced search effect

  useEffect(() => {  const [searchParams] = useSearchParams();  const [searchParams] = useSearchParams();

    const timer = setTimeout(() => {

      if (searchTerm !== (searchParams.get('search') || '')) {  const [searchTerm, setSearchTerm] = useState('');  const [searchTerm, setSearchTerm] = useState('');

        onFilterChange({ search: searchTerm });

      }

    }, 300);

  // Debounced search effect  // Debounced search effect

    return () => clearTimeout(timer);

  }, [searchTerm, onFilterChange, searchParams]);  useEffect(() => {  useEffect(() => {



  // Initialize search term from URL params    const timer = setTimeout(() => {    const timer = setTimeout(() => {

  useEffect(() => {

    setSearchTerm(searchParams.get('search') || '');      if (searchTerm !== (searchParams.get('search') || '')) {      if (searchTerm !== (searchParams.get('search') || '')) {

  }, [searchParams]);

        onFilterChange({ search: searchTerm });        onFilterChange({ search: searchTerm });

  const handleInputChange = (e) => {

    const { name, value } = e.target;      }      }

    onFilterChange({ [name]: value });

  };    }, 300);    }, 300);



  const handleSearchChange = (e) => {

    setSearchTerm(e.target.value);

  };    return () => clearTimeout(timer);    return () => clearTimeout(timer);



  return (  }, [searchTerm, onFilterChange, searchParams]);  }, [searchTerm, onFilterChange, searchParams]);

    <div className="bg-white border-b border-gray-200 px-6 py-4">

      <div className="flex items-center justify-between">

        {/* Left Side - Search and Filters */}

        <div className="flex items-center space-x-4">  // Initialize search term from URL params  // Initialize search term from URL params

          {/* Search Input */}

          <div className="relative">  useEffect(() => {  useEffect(() => {

            <input

              type="text"    setSearchTerm(searchParams.get('search') || '');    setSearchTerm(searchParams.get('search') || '');

              value={searchTerm}

              onChange={handleSearchChange}  }, [searchParams]);  }, [searchParams]);

              placeholder="Search Order ID..."

              className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"

            />

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">  const handleInputChange = (e) => {  // Close dropdown when clicking outside

              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />    const { name, value } = e.target;  useEffect(() => {

              </svg>

            </div>    onFilterChange({ [name]: value });    const handleClickOutside = (event) => {

          </div>

  };      Object.keys(dropdownRefs.current).forEach(key => {

          {/* Filter By Dropdown */}

          <div className="relative">        if (dropdownRefs.current[key] && !dropdownRefs.current[key].contains(event.target)) {

            <select

              name="sortBy"  const handleSearchChange = (e) => {          setIsOpen(prev => ({ ...prev, [key]: false }));

              value={searchParams.get('sortBy') || 'payment_time'}

              onChange={handleInputChange}    setSearchTerm(e.target.value);        }

              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"

            >  };      });

              <option value="payment_time">Filter By</option>

              <option value="order_amount">Order Amount</option>    };

              <option value="transaction_amount">Transaction Amount</option>

              <option value="status">Status</option>  return (

            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">    <div className="bg-white border-b border-gray-200 px-6 py-4">    document.addEventListener('mousedown', handleClickOutside);

              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />      <div className="flex items-center justify-between">    return () => document.removeEventListener('mousedown', handleClickOutside);

              </svg>

            </div>        {/* Left Side - Search and Filters */}  }, []);

          </div>

        <div className="flex items-center space-x-4">

          {/* Search Icon Button */}

          <button className="p-2 text-gray-400 hover:text-gray-600">          {/* Search Input */}  const handleInputChange = (e) => {

            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />          <div className="relative">    const { name, value } = e.target;

            </svg>

          </button>            <input    onFilterChange({ [name]: value });

        </div>

              type="text"  };

        {/* Right Side - Date, Status, Institute Filters */}

        <div className="flex items-center space-x-4">              value={searchTerm}

          {/* Date Filter */}

          <div className="relative">              onChange={handleSearchChange}  const handleSearchChange = (e) => {

            <select

              name="dateRange"              placeholder="Search Order ID..."    setSearchTerm(e.target.value);

              value={searchParams.get('dateRange') || ''}

              onChange={handleInputChange}              className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"  };

              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"

            >            />

              <option value="">Date</option>

              <option value="today">Today</option>            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">  const toggleDropdown = (name) => {

              <option value="yesterday">Yesterday</option>

              <option value="last7days">Last 7 Days</option>              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">    setIsOpen(prev => ({

              <option value="last30days">Last 30 Days</option>

              <option value="custom">Custom Range</option>                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />      ...prev,

            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">              </svg>      [name]: !prev[name]

              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />            </div>    }));

              </svg>

            </div>          </div>  };

          </div>



          {/* Status Filter */}

          <div className="relative">          {/* Filter By Dropdown */}  const handleDropdownSelect = (name, value) => {

            <select

              name="status"          <div className="relative">    onFilterChange({ [name]: value });

              value={searchParams.get('status') || ''}

              onChange={handleInputChange}            <select    setIsOpen(prev => ({ ...prev, [name]: false }));

              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"

            >              name="sortBy"  };

              <option value="">Status</option>

              <option value="success">Success</option>              value={searchParams.get('sortBy') || 'payment_time'}

              <option value="pending">Pending</option>

              <option value="failed">Failed</option>              onChange={handleInputChange}  const clearFilters = () => {

            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"    setSearchTerm('');

              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />            >    setIsOpen({});

              </svg>

            </div>              <option value="payment_time">Filter By</option>    onFilterChange({

          </div>

              <option value="order_amount">Order Amount</option>      status: '',

          {/* Select Institute Filter */}

          <div className="relative">              <option value="transaction_amount">Transaction Amount</option>      schoolId: '',

            <select

              name="schoolId"              <option value="status">Status</option>      startDate: '',

              value={searchParams.get('schoolId') || ''}

              onChange={handleInputChange}            </select>      endDate: '',

              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"

            >            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">      sortBy: 'payment_time',

              <option value="">Select Institute</option>

              <option value="inst001">Institute 001</option>              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">      order: 'desc',

              <option value="inst002">Institute 002</option>

              <option value="inst003">Institute 003</option>                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />      search: ''

            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">              </svg>    });

              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />            </div>  };

              </svg>

            </div>          </div>

          </div>

        </div>  const statusOptions = [

      </div>

          {/* Search Icon Button */}    { value: '', label: 'All Status', icon: '📋' },

      {/* Bottom Row - Rows per page */}

      <div className="mt-4 flex items-center">          <button className="p-2 text-gray-400 hover:text-gray-600">    { value: 'success', label: 'Success', icon: '✅' },

        <div className="flex items-center space-x-2">

          <span className="text-sm text-gray-600">Rows per page</span>            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">    { value: 'pending', label: 'Pending', icon: '⏳' },

          <div className="relative">

            <select              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />    { value: 'failed', label: 'Failed', icon: '❌' }

              name="limit"

              value={searchParams.get('limit') || '10'}            </svg>  ];

              onChange={handleInputChange}

              className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-6 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"          </button>

            >

              <option value="5">5</option>        </div>  const sortByOptions = [

              <option value="10">10</option>

              <option value="25">25</option>    { value: 'payment_time', label: 'Payment Time', icon: '🕒' },

              <option value="50">50</option>

              <option value="100">100</option>        {/* Right Side - Date, Status, Institute Filters */}    { value: 'order_amount', label: 'Order Amount', icon: '💰' },

            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">        <div className="flex items-center space-x-4">    { value: 'transaction_amount', label: 'Transaction Amount', icon: '💸' },

              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />          {/* Date Filter */}    { value: 'status', label: 'Status', icon: '📊' }

              </svg>

            </div>          <div className="relative">  ];

          </div>

        </div>            <select

      </div>

    </div>              name="dateRange"  const orderOptions = [

  );

};              value={searchParams.get('dateRange') || ''}    { value: 'desc', label: 'Descending', icon: '⬇️' },



export default TransactionFilters;              onChange={handleInputChange}    { value: 'asc', label: 'Ascending', icon: '⬆️' }

              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"  ];

            >

              <option value="">Date</option>  const CustomDropdown = ({ name, options, value }) => {

              <option value="today">Today</option>    const selectedOption = options.find(option => option.value === value) || options[0];

              <option value="yesterday">Yesterday</option>    

              <option value="last7days">Last 7 Days</option>    return (

              <option value="last30days">Last 30 Days</option>      <div className="relative" ref={el => dropdownRefs.current[name] = el}>

              <option value="custom">Custom Range</option>        <button

            </select>          type="button"

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">          onClick={() => toggleDropdown(name)}

              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">          className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 transition-all duration-200 ${

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />            isOpen[name] ? 'ring-2 ring-slate-500/20 border-slate-400' : ''

              </svg>          }`}

            </div>        >

          </div>          <div className="flex items-center space-x-3">

            <span className="text-lg">{selectedOption.icon}</span>

          {/* Status Filter */}            <span className={`text-sm ${value ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>

          <div className="relative">              {selectedOption.label}

            <select            </span>

              name="status"          </div>

              value={searchParams.get('status') || ''}          <svg

              onChange={handleInputChange}            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${

              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"              isOpen[name] ? 'rotate-180' : ''

            >            }`}

              <option value="">Status</option>            fill="none"

              <option value="success">Success</option>            stroke="currentColor"

              <option value="pending">Pending</option>            viewBox="0 0 24 24"

              <option value="failed">Failed</option>          >

            </select>            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">          </svg>

              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">        </button>

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />

              </svg>        {isOpen[name] && (

            </div>          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg animate-in slide-in-from-top-2 duration-200">

          </div>            <div className="py-2">

              {options.map((option) => (

          {/* Select Institute Filter */}                <button

          <div className="relative">                  key={option.value}

            <select                  onClick={() => handleDropdownSelect(name, option.value)}

              name="schoolId"                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-150 ${

              value={searchParams.get('schoolId') || ''}                    value === option.value ? 'bg-slate-50 text-slate-900 font-medium' : 'text-slate-700'

              onChange={handleInputChange}                  }`}

              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"                >

            >                  <span className="text-lg">{option.icon}</span>

              <option value="">Select Institute</option>                  <span className="text-sm">{option.label}</span>

              <option value="inst001">Institute 001</option>                  {value === option.value && (

              <option value="inst002">Institute 002</option>                    <svg className="w-4 h-4 ml-auto text-slate-600" fill="currentColor" viewBox="0 0 20 20">

              <option value="inst003">Institute 003</option>                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />

            </select>                    </svg>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">                  )}

              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">                </button>

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />              ))}

              </svg>            </div>

            </div>          </div>

          </div>        )}

        </div>      </div>

      </div>    );

  };

      {/* Bottom Row - Rows per page */}

      <div className="mt-4 flex items-center">  return (

        <div className="flex items-center space-x-2">    <div className="bg-white border-b border-gray-200 px-6 py-4">

          <span className="text-sm text-gray-600">Rows per page</span>      {/* Header */}

          <div className="relative">      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">

            <select        <div className="flex items-center justify-between">

              name="limit"          <div className="flex items-center space-x-3">

              value={searchParams.get('limit') || '10'}            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">

              onChange={handleInputChange}              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-6 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />

            >              </svg>

              <option value="5">5</option>            </div>

              <option value="10">10</option>            <h3 className="text-lg font-semibold text-slate-900">Filter Transactions</h3>

              <option value="25">25</option>          </div>

              <option value="50">50</option>          <button

              <option value="100">100</option>            onClick={clearFilters}

            </select>            className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all duration-200 group"

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">          >

              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">            <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />

              </svg>            </svg>

            </div>            <span className="font-medium">Clear All</span>

          </div>          </button>

        </div>        </div>

      </div>      </div>

    </div>

  );      {/* Search Section */}

};      <div className="p-6 border-b border-slate-100">

        <div className="relative">

export default TransactionFilters;          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center transition-colors duration-200 ${
            isSearchFocused ? 'text-slate-600' : 'text-slate-400'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search by order ID, amount, or institute..."
            className={`w-full pl-12 pr-4 py-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 focus:bg-white transition-all duration-200 placeholder-slate-400 ${
              searchTerm ? 'bg-white border-slate-300' : ''
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Status
            </label>
            <CustomDropdown
              name="status"
              options={statusOptions}
              value={searchParams.get('status') || ''}
              placeholder="Select status"
            />
          </div>

          {/* Institute ID Filter */}
          <div className="space-y-2">
            <label htmlFor="schoolId" className="block text-sm font-medium text-slate-700">
              Institute ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <input
                type="text"
                name="schoolId"
                id="schoolId"
                value={searchParams.get('schoolId') || ''}
                onChange={handleInputChange}
                placeholder="Enter institute ID"
                className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 transition-all duration-200 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Start Date Filter */}
          <div className="space-y-2">
            <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={searchParams.get('startDate') || ''}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 transition-all duration-200"
              />
            </div>
          </div>

          {/* End Date Filter */}
          <div className="space-y-2">
            <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">
              End Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={searchParams.get('endDate') || ''}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-400 transition-all duration-200"
              />
            </div>
          </div>

          {/* Sort By and Order Combined */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Sort By
              </label>
              <CustomDropdown
                name="sortBy"
                options={sortByOptions}
                value={searchParams.get('sortBy') || 'payment_time'}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Order
              </label>
              <CustomDropdown
                name="order"
                options={orderOptions}
                value={searchParams.get('order') || 'desc'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;