import { NewsArticle } from '@/types';

const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    type: 'news',
    title: 'AI Revolution Continues: New Breakthrough in Machine Learning',
    description: 'Researchers announce significant advancement in neural network architectures that could transform how we interact with technology.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
    url: '#',
    source: 'Tech Daily',
    publishedAt: new Date().toISOString(),
    author: 'John Smith',
    category: 'technology',
  },
  {
    id: 'news-2',
    type: 'news',
    title: 'Global Markets Rally as Economic Indicators Improve',
    description: 'Stock markets worldwide show strong performance as employment data exceeds expectations.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500',
    url: '#',
    source: 'Financial Times',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    author: 'Sarah Johnson',
    category: 'finance',
  },
  {
    id: 'news-3',
    type: 'news',
    title: 'Championship Finals Set to Break Viewership Records',
    description: 'The upcoming championship game is expected to draw millions of viewers worldwide.',
    imageUrl: 'https://thesportsrush.com/wp-content/uploads/2025/06/16dcf7a2-nba-finals.jpg',
    url: '#',
    source: 'Sports Weekly',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    author: 'Mike Thompson',
    category: 'sports',
  },
  {
    id: 'news-4',
    type: 'news',
    title: 'New Electric Vehicle Models Hit the Market',
    description: 'Major automakers release their latest electric vehicles with improved range and performance.',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500',
    url: '#',
    source: 'Auto News',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    author: 'Emily Davis',
    category: 'technology',
  },
  {
    id: 'news-5',
    type: 'news',
    title: 'Cryptocurrency Regulations Evolve Globally',
    description: 'New regulatory frameworks are being established to govern cryptocurrency trading and usage.',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500',
    url: '#',
    source: 'Crypto Watch',
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    author: 'David Lee',
    category: 'finance',
  },
];

export const newsService = {
  async fetchNews(category?: string, page: number = 1, limit: number = 10): Promise<NewsArticle[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredNews = MOCK_NEWS;
    if (category && category !== 'all') {
      filteredNews = MOCK_NEWS.filter((news) => news.category === category);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredNews.slice(startIndex, endIndex);
  },

  async searchNews(query: string): Promise<NewsArticle[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!query) return MOCK_NEWS;

    const lowerQuery = query.toLowerCase();
    return MOCK_NEWS.filter(
      (news) =>
        news.title.toLowerCase().includes(lowerQuery) ||
        news.description.toLowerCase().includes(lowerQuery)
    );
  },
};
