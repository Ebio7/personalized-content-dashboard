import preferencesReducer, {
  setCategories,
  toggleCategory,
  setDarkMode,
  toggleDarkMode,
  setLanguage,
  resetPreferences,
} from '@/store/slices/preferencesSlice';

describe('preferencesSlice', () => {
  const initialState = {
    categories: ['technology', 'sports', 'finance'],
    darkMode: false,
    language: 'en',
  };

  it('returns initial state', () => {
    expect(preferencesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('handles setCategories', () => {
    const newState = preferencesReducer(initialState, setCategories(['movies', 'music']));
    expect(newState.categories).toEqual(['movies', 'music']);
  });

  it('handles toggleCategory - adds category', () => {
    const newState = preferencesReducer(initialState, toggleCategory('movies'));
    expect(newState.categories).toContain('movies');
  });

  it('handles toggleCategory - removes category', () => {
    const newState = preferencesReducer(initialState, toggleCategory('technology'));
    expect(newState.categories).not.toContain('technology');
  });

  it('handles setDarkMode', () => {
    const newState = preferencesReducer(initialState, setDarkMode(true));
    expect(newState.darkMode).toBe(true);
  });

  it('handles toggleDarkMode', () => {
    const newState = preferencesReducer(initialState, toggleDarkMode());
    expect(newState.darkMode).toBe(true);
  });

  it('handles setLanguage', () => {
    const newState = preferencesReducer(initialState, setLanguage('es'));
    expect(newState.language).toBe('es');
  });

  it('handles resetPreferences', () => {
    const modifiedState = {
      categories: ['movies'],
      darkMode: true,
      language: 'fr',
    };
    const newState = preferencesReducer(modifiedState, resetPreferences());
    expect(newState).toEqual(initialState);
  });
});
