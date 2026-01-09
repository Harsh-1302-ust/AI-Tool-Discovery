export type PricingModel = 'Free' | 'Paid' | 'Subscription';

export type Category = 'NLP' | 'Computer Vision' | 'Dev Tools' | 'Data Science' | 'Automation' | 'Content Generation';

export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected';

export interface AITool {
  id: string;
  name: string;
  description: string;
  useCase: string;
  category: Category;
  pricingModel: PricingModel;
  averageRating: number;
  totalReviews: number;
  imageUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  toolId: string;
  toolName?: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  status: ReviewStatus;
  createdAt: string;
}

export interface FilterState {
  categories: Category[];
  pricingModels: PricingModel[];
  minRating: number;
  searchQuery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
