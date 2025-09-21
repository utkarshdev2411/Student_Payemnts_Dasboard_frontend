import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { transactionAPI } from '../api/endpoints';
import StatsCard from './StatsCard';

// Professional SVG Icons
const RevenueIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const SuccessIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PendingIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FailedIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(searchParams.entries());
        
        // Convert date range filters to startDate/endDate for stats API
        if (params.dateRange) {
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
          switch (params.dateRange) {
            case 'today': {
              params.startDate = today.toISOString();
              params.endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString();
              break;
            }
            case 'yesterday': {
              const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
              params.startDate = yesterday.toISOString();
              params.endDate = today.toISOString();
              break;
            }
            case 'last7days': {
              params.startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
              params.endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString();
              break;
            }
            case 'last30days': {
              params.startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
              params.endDate = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString();
              break;
            }
          }
          delete params.dateRange;
        }

        // Remove pagination and sort parameters that aren't needed for stats
        delete params.page;
        delete params.limit;
        delete params.sortBy;
        delete params.order;
        delete params.search;

        const data = await transactionAPI.getTransactionStats(params);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats({
          successfulAmount: 0,
          successfulTransactions: 0,
          pendingTransactions: 0,
          failedTransactions: 0,
          totalTransactions: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [searchParams]);

  const formatCurrency = (amount) => {
    if (amount === 0 || amount === null || amount === undefined) return '₹0.00';
    return `₹${(amount / 1).toLocaleString('en-IN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  const formatNumber = (number) => {
    if (number === 0 || number === null || number === undefined) return '0';
    return number.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard 
        title="Total Revenue" 
        value={formatCurrency(stats.successfulAmount)} 
        icon={RevenueIcon}
        variant="success" 
      />
      <StatsCard 
        title="Successful Transactions" 
        value={formatNumber(stats.successfulTransactions)} 
        icon={SuccessIcon}
        variant="default" 
      />
      <StatsCard 
        title="Pending Transactions" 
        value={formatNumber(stats.pendingTransactions)} 
        icon={PendingIcon}
        variant="warning" 
      />
      <StatsCard 
        title="Failed Transactions" 
        value={formatNumber(stats.failedTransactions)} 
        icon={FailedIcon}
        variant="danger" 
      />
    </div>
  );
};

export default DashboardStats;