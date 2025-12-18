import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const API_ENDPOINT = '/api/v1/ai-mutual-fund-system';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}${API_ENDPOINT}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RecommendationRequest {
  amcName?: string;
  category?: string;
  amountInvested: number;
  tenure: number;
  investmentType?: string;
}

export interface FundRecommendation {
  id: string;
  schemeName: string;
  amcName: string;
  category: string;
  rating: number;
  riskLevel: number;
  returns1yr: number | null;
  returns3yr: number | null;
  returns5yr: number | null;
  expectedReturn: number;
  projectedValue: number;
  score: number;
}

export interface AnalyticsData {
  totalFunds: number;
  byCategory: Array<{ category: string; _count: number }>;
  topAMCs: Array<{ amcName: string; _count: number }>;
  avgReturns: {
    returns1yr: number | null;
    returns3yr: number | null;
    returns5yr: number | null;
  };
}

export interface FiltersData {
  amcs: string[];
  categories: Record<string, string[]>;
}

export const mutualFundAPI = {
  getRecommendations: async (request: RecommendationRequest): Promise<FundRecommendation[]> => {
    const response = await apiClient.post('/mutual-funds/recommendations', request);
    return response.data.data;
  },

  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await apiClient.get('/mutual-funds/analytics');
    return response.data.data;
  },

  getFilters: async (): Promise<FiltersData> => {
    const response = await apiClient.get('/mutual-funds/filters');
    return response.data.data;
  },

  getFundDetails: async (fundId: string) => {
    const response = await apiClient.get(`/mutual-funds/${fundId}`);
    return response.data.data;
  },
};