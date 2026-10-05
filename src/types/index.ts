export type ContentType = 'news' | 'movie' | 'music' | 'social';

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  publishedAt?: string;
  author?: string;
  category?: string;
  rating?: number;
  isFavorite?: boolean;
}

export interface NewsArticle extends ContentItem {
  type: 'news';
  source?: string;
  publishedAt: string;
}

export interface MovieRecommendation extends ContentItem {
  type: 'movie';
  releaseDate?: string;
  rating: number;
  genre?: string[];
}

export interface MusicRecommendation extends ContentItem {
  type: 'music';
  artist?: string;
  album?: string;
  duration?: string;
}

export interface SocialPost extends ContentItem {
  type: 'social';
  platform: string;
  username: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

export interface UserPreferences {
  categories: string[];
  darkMode: boolean;
  language: string;
}

export interface FeedState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

export interface SearchState {
  query: string;
  results: ContentItem[];
  loading: boolean;
  error: string | null;
}

export interface FavoritesState {
  items: ContentItem[];
}

export interface TrendingState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
}
