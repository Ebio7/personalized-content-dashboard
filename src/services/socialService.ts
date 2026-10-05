import { SocialPost } from '@/types';

const MOCK_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'social-1',
    type: 'social',
    title: 'Breaking: Tech Giants Announce New Partnership',
    description: 'Major technology companies collaborate on groundbreaking AI initiative that could reshape the industry.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
    url: '#',
    platform: 'Twitter',
    username: '@techinsider',
    likes: 45200,
    comments: 3200,
    shares: 8900,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'social-2',
    type: 'social',
    title: 'Viral Dance Challenge Takes Over Social Media',
    description: 'New dance trend goes viral with millions of participants worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
    url: '#',
    platform: 'Instagram',
    username: '@vibecentral',
    likes: 89000,
    comments: 12500,
    shares: 45000,
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'social-3',
    type: 'social',
    title: 'Fitness Motivation: Transformation Journey',
    description: 'Inspiring fitness transformation story gains massive engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
    url: '#',
    platform: 'Instagram',
    username: '@fitlife_daily',
    likes: 67000,
    comments: 8900,
    shares: 23000,
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'social-4',
    type: 'social',
    title: 'Cooking Tip: Perfect Pasta Every Time',
    description: 'Chef shares secret technique for cooking perfect pasta, goes viral.',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500',
    url: '#',
    platform: 'Twitter',
    username: '@culinary_masters',
    likes: 23400,
    comments: 4500,
    shares: 12000,
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: 'social-5',
    type: 'social',
    title: 'Travel Photography: Hidden Gems of Europe',
    description: 'Stunning photography of lesser-known European destinations captivates audiences.',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500',
    url: '#',
    platform: 'Instagram',
    username: '@wanderlust_daily',
    likes: 112000,
    comments: 15600,
    shares: 67000,
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
  },
];

export const socialService = {
  async fetchPosts(hashtag?: string, page: number = 1, limit: number = 10): Promise<SocialPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredPosts = MOCK_SOCIAL_POSTS;
    if (hashtag) {
      filteredPosts = MOCK_SOCIAL_POSTS.filter((post) =>
        post.description.toLowerCase().includes(hashtag.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredPosts.slice(startIndex, endIndex);
  },

  async searchPosts(query: string): Promise<SocialPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!query) return MOCK_SOCIAL_POSTS;

    const lowerQuery = query.toLowerCase();
    return MOCK_SOCIAL_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.username.toLowerCase().includes(lowerQuery)
    );
  },

  async fetchTrendingPosts(): Promise<SocialPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_SOCIAL_POSTS.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 5);
  },
};
