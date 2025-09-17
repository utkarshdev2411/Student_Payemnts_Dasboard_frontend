import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { transactionAPI } from '../api/endpoints';
import { useNotification } from './useNotification';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { showError } = useNotification();

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const response = await transactionAPI.getAllTransactions(params);
      setTransactions(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      showError('Failed to fetch transactions.');
    } finally {
      setLoading(false);
    }
  }, [searchParams, showError]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const updateFilters = (newFilters) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== '') {
          updated.set(key, value);
        } else {
          updated.delete(key);
        }
      });
      updated.set('page', '1'); // Reset to first page on filter change
      return updated;
    });
  };

  const changePage = (page) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      updated.set('page', page.toString());
      return updated;
    });
  };

  const changeLimit = (limit) => {
    setSearchParams(prev => {
      const updated = new URLSearchParams(prev);
      updated.set('limit', limit.toString());
      updated.set('page', '1'); // Reset to first page on limit change
      return updated;
    });
  };

  return { 
    transactions, 
    pagination, 
    loading, 
    updateFilters, 
    changePage,
    changeLimit,
    fetchTransactions 
  };
};