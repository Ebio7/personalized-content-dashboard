import { MovieRecommendation } from '@/types';

const MOCK_MOVIES: MovieRecommendation[] = [
  {
    id: 'movie-1',
    type: 'movie',
    title: 'The Digital Frontier',
    description: 'A thrilling sci-fi adventure about humanity\'s journey into the digital realm.',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
    url: '#',
    releaseDate: '2024-03-15',
    rating: 8.5,
    genre: ['Sci-Fi', 'Action'],
  },
  {
    id: 'movie-2',
    type: 'movie',
    title: 'Ocean\'s Depth',
    description: 'An underwater documentary exploring the mysteries of the deep sea.',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500',
    url: '#',
    releaseDate: '2024-02-20',
    rating: 9.0,
    genre: ['Documentary', 'Nature'],
  },
  {
    id: 'movie-3',
    type: 'movie',
    title: 'Urban Legends',
    description: 'A mystery thriller set in a bustling metropolis with unexpected twists.',
    imageUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500',
    url: '#',
    releaseDate: '2024-04-10',
    rating: 7.8,
    genre: ['Thriller', 'Mystery'],
  },
  {
    id: 'movie-4',
    type: 'movie',
    title: 'The Art of Time',
    description: 'A romantic drama spanning decades and exploring the nature of love.',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500',
    url: '#',
    releaseDate: '2024-01-25',
    rating: 8.2,
    genre: ['Romance', 'Drama'],
  },
  {
    id: 'movie-5',
    type: 'movie',
    title: 'Velocity',
    description: 'High-octane racing action with incredible stunts and heart-pounding moments.',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500',
    url: '#',
    releaseDate: '2024-05-01',
    rating: 7.5,
    genre: ['Action', 'Adventure'],
  },
];

export const movieService = {
  async fetchMovies(genre?: string, page: number = 1, limit: number = 10): Promise<MovieRecommendation[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredMovies = MOCK_MOVIES;
    if (genre && genre !== 'all') {
      filteredMovies = MOCK_MOVIES.filter((movie) => movie.genre?.includes(genre));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredMovies.slice(startIndex, endIndex);
  },

  async searchMovies(query: string): Promise<MovieRecommendation[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!query) return MOCK_MOVIES;

    const lowerQuery = query.toLowerCase();
    return MOCK_MOVIES.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerQuery) ||
        movie.description.toLowerCase().includes(lowerQuery)
    );
  },

  async fetchTrendingMovies(): Promise<MovieRecommendation[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_MOVIES.sort((a, b) => b.rating - a.rating).slice(0, 5);
  },
};
