import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '@/services/api';
import { toast } from 'sonner';

export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsApi.getAll,
  });
}

export function useToolReviews(toolId: string) {
  return useQuery({
    queryKey: ['reviews', toolId],
    queryFn: () => reviewsApi.getByToolId(toolId),
    enabled: !!toolId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reviewsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      toast.success('Review submitted successfully! It will be visible after approval.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit review');
    },
  });
}

export function useApproveReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reviewsApi.approve,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      toast.success('Review approved');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to approve review');
    },
  });
}

export function useRejectReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reviewsApi.reject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success('Review rejected');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to reject review');
    },
  });
}
