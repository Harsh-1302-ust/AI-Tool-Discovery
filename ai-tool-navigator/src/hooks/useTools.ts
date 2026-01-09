import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toolsApi } from '@/services/api';
import { AITool, FilterState } from '@/types';
import { toast } from 'sonner';

export function useTools(filters?: Partial<FilterState>) {
  return useQuery({
    queryKey: ['tools', filters],
    queryFn: () => toolsApi.getAll(filters),
  });
}

export function useTool(id: string) {
  return useQuery({
    queryKey: ['tool', id],
    queryFn: () => toolsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateTool() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toolsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      toast.success('Tool added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add tool');
    },
  });
}

export function useUpdateTool() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AITool> }) => 
      toolsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      toast.success('Tool updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update tool');
    },
  });
}

export function useDeleteTool() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toolsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      toast.success('Tool deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete tool');
    },
  });
}
