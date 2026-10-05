import favoritesReducer, {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} from '@/store/slices/favoritesSlice';

const mockItem = {
  id: '1',
  type: 'news' as const,
  title: 'Test Article',
  description: 'Test description',
};

describe('favoritesSlice', () => {
  const initialState = {
    items: [],
  };

  it('returns initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handles addFavorite', () => {
    const newState = favoritesReducer(initialState, addFavorite(mockItem));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual({ ...mockItem, isFavorite: true });
  });

  it('does not add duplicate favorites', () => {
    const stateWithItem = { items: [{ ...mockItem, isFavorite: true }] };
    const newState = favoritesReducer(stateWithItem, addFavorite(mockItem));
    expect(newState.items).toHaveLength(1);
  });

  it('handles removeFavorite', () => {
    const stateWithItem = { items: [{ ...mockItem, isFavorite: true }] };
    const newState = favoritesReducer(stateWithItem, removeFavorite('1'));
    expect(newState.items).toHaveLength(0);
  });

  it('handles toggleFavorite - adds when not present', () => {
    const newState = favoritesReducer(initialState, toggleFavorite(mockItem));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].isFavorite).toBe(true);
  });

  it('handles toggleFavorite - removes when present', () => {
    const stateWithItem = { items: [{ ...mockItem, isFavorite: true }] };
    const newState = favoritesReducer(stateWithItem, toggleFavorite(mockItem));
    expect(newState.items).toHaveLength(0);
  });

  it('handles clearFavorites', () => {
    const stateWithItems = {
      items: [
        { ...mockItem, isFavorite: true },
        { ...mockItem, id: '2', isFavorite: true },
      ],
    };
    const newState = favoritesReducer(stateWithItems, clearFavorites());
    expect(newState.items).toHaveLength(0);
  });
});
