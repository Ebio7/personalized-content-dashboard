import { ContentItem } from '@/types';
import { newsService } from './newsService';
import { movieService } from './movieService';
import { socialService } from './socialService';

export const apiService = {
  async fetchContent(
    categories: string[],
    page: number = 1,
    limit: number = 10
  ): Promise<ContentItem[]> {
    const results: ContentItem[] = [];

    if (categories.includes('technology') || categories.includes('all')) {
      const news = await newsService.fetchNews('technology', page, Math.ceil(limit / 3));
      results.push(...news);
    }

    if (categories.includes('sports') || categories.includes('all')) {
      const news = await newsService.fetchNews('sports', page, Math.ceil(limit / 3));
      results.push(...news);
    }

    if (categories.includes('finance') || categories.includes('all')) {
      const news = await newsService.fetchNews('finance', page, Math.ceil(limit / 3));
      results.push(...news);
    }

    if (categories.includes('movies') || categories.includes('all')) {
      const movies = await movieService.fetchMovies(undefined, page, Math.ceil(limit / 3));
      results.push(...movies);
    }

    if (categories.includes('social') || categories.includes('all')) {
      const posts = await socialService.fetchPosts(undefined, page, Math.ceil(limit / 3));
      results.push(...posts);
    }

    return results;
  },

  async searchContent(query: string): Promise<ContentItem[]> {
    if (!query) return [];

    const [news, movies, posts] = await Promise.all([
      newsService.searchNews(query),
      movieService.searchMovies(query),
      socialService.searchPosts(query),
    ]);

    return [...news, ...movies, ...posts];
  },

  async fetchTrendingContent(): Promise<ContentItem[]> {
    const [movies, posts] = await Promise.all([
      movieService.fetchTrendingMovies(),
      socialService.fetchTrendingPosts(),
    ]);

    return [...movies, ...posts];
  },
};
