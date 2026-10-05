import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContentCard } from '@/components/ui/ContentCard';

const mockItem = {
  id: '1',
  type: 'news' as const,
  title: 'Test Article',
  description: 'Test description',
  imageUrl: 'https://example.com/image.jpg',
  url: 'https://example.com',
  publishedAt: '2024-01-01',
  author: 'Test Author',
  category: 'technology',
};

describe('ContentCard', () => {
  it('renders content item correctly', () => {
    render(<ContentCard item={mockItem} />);
    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders image when imageUrl is provided', () => {
    render(<ContentCard item={mockItem} />);
    const image = screen.getByAltText('Test Article');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders type badge', () => {
    render(<ContentCard item={mockItem} />);
    expect(screen.getByText('news')).toBeInTheDocument();
  });

  it('calls onFavorite when favorite button is clicked', () => {
    const handleFavorite = jest.fn();
    render(<ContentCard item={mockItem} onFavorite={handleFavorite} />);
    const favoriteButton = screen.getByLabelText('Add to favorites');
    favoriteButton.click();
    expect(handleFavorite).toHaveBeenCalledWith(mockItem);
  });

  it('shows filled heart when isFavorite is true', () => {
    render(<ContentCard item={mockItem} onFavorite={jest.fn()} isFavorite={true} />);
    const favoriteButton = screen.getByLabelText('Remove from favorites');
    expect(favoriteButton).toBeInTheDocument();
  });

  it('renders rating when provided', () => {
    const itemWithRating = { ...mockItem, rating: 8.5 };
    render(<ContentCard item={itemWithRating} />);
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('renders correct action button for news type', () => {
    render(<ContentCard item={mockItem} />);
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('renders correct action button for movie type', () => {
    const movieItem = { ...mockItem, type: 'movie' as const, rating: 8.5 };
    render(<ContentCard item={movieItem} />);
    expect(screen.getByText('Watch Now')).toBeInTheDocument();
  });
});
