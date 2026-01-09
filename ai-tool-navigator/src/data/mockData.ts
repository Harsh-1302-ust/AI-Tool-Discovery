import { AITool, Review, Category, PricingModel } from '@/types';

export const categories: Category[] = [
  'NLP',
  'Computer Vision',
  'Dev Tools',
  'Data Science',
  'Automation',
  'Content Generation'
];

export const pricingModels: PricingModel[] = ['Free', 'Paid', 'Subscription'];

export const mockTools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced conversational AI for natural language understanding and generation.',
    useCase: 'Customer support, content creation, coding assistance',
    category: 'NLP',
    pricingModel: 'Subscription',
    averageRating: 4.7,
    totalReviews: 1250,
    websiteUrl: 'https://chat.openai.com',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation from text descriptions.',
    useCase: 'Design mockups, creative artwork, marketing visuals',
    category: 'Content Generation',
    pricingModel: 'Subscription',
    averageRating: 4.5,
    totalReviews: 890,
    websiteUrl: 'https://midjourney.com',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'GitHub Copilot',
    description: 'AI pair programmer that suggests code completions.',
    useCase: 'Code completion, documentation, debugging',
    category: 'Dev Tools',
    pricingModel: 'Subscription',
    averageRating: 4.6,
    totalReviews: 2100,
    websiteUrl: 'https://github.com/features/copilot',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: '4',
    name: 'Hugging Face',
    description: 'Open-source platform for machine learning models.',
    useCase: 'Model deployment, NLP tasks, research',
    category: 'Data Science',
    pricingModel: 'Free',
    averageRating: 4.8,
    totalReviews: 560,
    websiteUrl: 'https://huggingface.co',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: '5',
    name: 'DALL-E 3',
    description: 'State-of-the-art image generation with enhanced understanding.',
    useCase: 'Marketing materials, product visualization, creative design',
    category: 'Computer Vision',
    pricingModel: 'Paid',
    averageRating: 4.4,
    totalReviews: 720,
    websiteUrl: 'https://openai.com/dall-e-3',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: '6',
    name: 'Zapier AI',
    description: 'Automate workflows with AI-powered integrations.',
    useCase: 'Workflow automation, data sync, notifications',
    category: 'Automation',
    pricingModel: 'Subscription',
    averageRating: 4.3,
    totalReviews: 430,
    websiteUrl: 'https://zapier.com',
    createdAt: '2024-01-07',
    updatedAt: '2024-01-07'
  },
  {
    id: '7',
    name: 'Grammarly',
    description: 'AI writing assistant for grammar, tone, and clarity.',
    useCase: 'Writing improvement, professional communication, content editing',
    category: 'NLP',
    pricingModel: 'Subscription',
    averageRating: 4.5,
    totalReviews: 3200,
    websiteUrl: 'https://grammarly.com',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03'
  },
  {
    id: '8',
    name: 'TensorFlow',
    description: 'Open-source machine learning framework by Google.',
    useCase: 'Model training, deep learning, production ML',
    category: 'Data Science',
    pricingModel: 'Free',
    averageRating: 4.6,
    totalReviews: 1800,
    websiteUrl: 'https://tensorflow.org',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    toolId: '1',
    toolName: 'ChatGPT',
    userId: 'u1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Incredibly helpful for content creation and brainstorming.',
    status: 'Approved',
    createdAt: '2024-01-16'
  },
  {
    id: 'r2',
    toolId: '1',
    toolName: 'ChatGPT',
    userId: 'u2',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Great tool but sometimes gives outdated information.',
    status: 'Approved',
    createdAt: '2024-01-17'
  },
  {
    id: 'r3',
    toolId: '3',
    toolName: 'GitHub Copilot',
    userId: 'u3',
    userName: 'Mike Johnson',
    rating: 5,
    comment: 'Game changer for development productivity!',
    status: 'Pending',
    createdAt: '2024-01-18'
  },
  {
    id: 'r4',
    toolId: '2',
    toolName: 'Midjourney',
    userId: 'u4',
    userName: 'Sarah Wilson',
    rating: 4,
    comment: 'Amazing for creative projects.',
    status: 'Pending',
    createdAt: '2024-01-19'
  },
  {
    id: 'r5',
    toolId: '5',
    toolName: 'DALL-E 3',
    userId: 'u5',
    userName: 'Tom Brown',
    rating: 3,
    comment: 'Good but expensive for regular use.',
    status: 'Rejected',
    createdAt: '2024-01-20'
  }
];
