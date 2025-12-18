import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mutualFundAPI, type RecommendationRequest, type FundRecommendation, type AnalyticsData, type FiltersData } from '../lib/api';

export const useRecommendations = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (request: RecommendationRequest) => mutualFundAPI.getRecommendations(request),
    onSuccess: (data) => {
      queryClient.setQueryData(['recommendations'], data);
    },
  });

  const query = useQuery<FundRecommendation[]>({
    queryKey: ['recommendations'],
    queryFn: () => Promise.resolve([]),
    enabled: false,
  });

  return {
    recommendations: (query.data || []) as FundRecommendation[],
    loading: mutation.isPending,
    error: mutation.error?.message || null,
    fetchRecommendations: mutation.mutate,
  };
};

export const useAnalytics = () => {
  const query = useQuery({
    queryKey: ['analytics'],
    queryFn: mutualFundAPI.getAnalytics,
  });

  return {
    analytics: query.data || null,
    loading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
  };
};

export const useFilters = () => {
  const query = useQuery({
    queryKey: ['filters'],
    queryFn: mutualFundAPI.getFilters,
  });

  return {
    filters: query.data || null,
    loading: query.isLoading,
    error: query.error?.message || null,
    refetch: query.refetch,
  };
};

export const useFundDetails = (fundId: string) => {
  const query = useQuery({
    queryKey: ['fund', fundId],
    queryFn: () => mutualFundAPI.getFundDetails(fundId),
    enabled: !!fundId,
  });

  return {
    fund: query.data || null,
    loading: query.isLoading,
    error: query.error?.message || null,
  };
};