import apiClient from './client';

// Authentication API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
};

// Transaction API calls
export const transactionAPI = {
  getAllTransactions: async (params = {}) => {
    const response = await apiClient.get('/transactions', { params });
    return response.data;
  },

  getTransactionsBySchool: async (schoolId, params = {}) => {
    const response = await apiClient.get(`/transactions/school/${schoolId}`, { params });
    return response.data;
  },

  getTransactionStatus: async (collectId) => {
    const response = await apiClient.get(`/transactions/status/${collectId}`);
    return response.data;
  },

  getTransactionStats: async (params = {}) => {
    const response = await apiClient.get('/transactions/stats', { params });
    return response.data;
  },
};

// Payment API calls
export const paymentAPI = {
  createPayment: async (paymentData) => {
    const response = await apiClient.post('/payments/create-payment', paymentData);
    return response.data;
  },
};

// Webhook API calls (for admin purposes)
export const webhookAPI = {
  getWebhookLogs: async (params = {}) => {
    const response = await apiClient.get('/webhook/logs', { params });
    return response.data;
  },
};