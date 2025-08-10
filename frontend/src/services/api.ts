import axios from 'axios';
import { VariantAnalytics, Insight, CreateInsightData, DashboardData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyticsApi = {
  getVariantAnalytics: async (): Promise<VariantAnalytics[]> => {
    const response = await api.get('/analytics/variants');
    return response.data;
  },

  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  getInsights: async (): Promise<Insight[]> => {
    const response = await api.get('/analytics/insights');
    return response.data;
  },

  saveInsight: async (insightData: CreateInsightData): Promise<Insight> => {
    const response = await api.post('/analytics/insights', insightData);
    return response.data;
  },
};
