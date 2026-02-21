import { Provider } from '../types/provider';

export const providers: Provider[] = [
  {
    id: '1',
    name: 'Chef Anita',
    category: 'Home Chef',
    description: 'Healthy homemade meals',
    rating: 4.6,
    location: 'Mumbai',
    services: ['North Indian', 'Weekly Meals'],
  },
  {
    id: '2',
    name: 'FitFlex Gym',
    category: 'Home Gym',
    description: 'Personal fitness training',
    rating: 4.8,
    location: 'Delhi',
    services: ['Yoga', 'Strength Training'],
  },
  {
    id: '3',
    name: 'Paws & Bubbles',
    category: 'Pet Groomer',
    description: 'At-home pet grooming',
    rating: 4.5,
    location: 'Bangalore',
    services: ['Bath', 'Hair Trim'],
  },
];