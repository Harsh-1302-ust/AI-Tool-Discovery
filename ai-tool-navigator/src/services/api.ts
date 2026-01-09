import { AITool, Review, FilterState, Category, PricingModel } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Helper for handling responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Tools API
export const toolsApi = {
  getAll: async (filters?: Partial<FilterState>): Promise<AITool[]> => {
    const params = new URLSearchParams();
    
    if (filters?.categories?.length) {
      filters.categories.forEach(cat => params.append('category', cat));
    }
    if (filters?.pricingModels?.length) {
      filters.pricingModels.forEach(pm => params.append('pricing_model', pm));
    }
    if (filters?.minRating && filters.minRating > 0) {
      params.append('min_rating', filters.minRating.toString());
    }
    if (filters?.searchQuery) {
      params.append('search', filters.searchQuery);
    }

    const url = `${API_BASE_URL}/tools${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    return handleResponse<AITool[]>(response);
  },

  getById: async (id: string): Promise<AITool> => {
    const response = await fetch(`${API_BASE_URL}/tools/${id}`);
    return handleResponse<AITool>(response);
  },

  create: async (tool: Omit<AITool, 'id' | 'averageRating' | 'totalReviews' | 'createdAt' | 'updatedAt'>): Promise<AITool> => {
    const response = await fetch(`${API_BASE_URL}/tools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tool),
    });
    return handleResponse<AITool>(response);
  },

  update: async (id: string, tool: Partial<AITool>): Promise<AITool> => {
    const response = await fetch(`${API_BASE_URL}/tools/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tool),
    });
    return handleResponse<AITool>(response);
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/tools/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Failed to delete tool' }));
      throw new Error(error.detail);
    }
  },
};

// Reviews API
export const reviewsApi = {
  getAll: async (): Promise<Review[]> => {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    return handleResponse<Review[]>(response);
  },

  getByToolId: async (toolId: string): Promise<Review[]> => {
    const response = await fetch(`${API_BASE_URL}/reviews?tool_id=${toolId}`);
    return handleResponse<Review[]>(response);
  },

  create: async (review: { toolId: string; rating: number; comment?: string; userName: string }): Promise<Review> => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool_id: review.toolId,
        rating: review.rating,
        comment: review.comment,
        user_name: review.userName,
      }),
    });
    return handleResponse<Review>(response);
  },

  approve: async (id: string): Promise<Review> => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}/approve`, {
      method: 'PUT',
    });
    return handleResponse<Review>(response);
  },

  reject: async (id: string): Promise<Review> => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}/reject`, {
      method: 'PUT',
    });
    return handleResponse<Review>(response);
  },
};

// Categories and Pricing Models
export const metadataApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return handleResponse<Category[]>(response);
  },

  getPricingModels: async (): Promise<PricingModel[]> => {
    const response = await fetch(`${API_BASE_URL}/pricing-models`);
    return handleResponse<PricingModel[]>(response);
  },
};
