import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, FavoritesState } from '@/types';

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<ContentItem>) => {
      const item = action.payload;
      if (!state.items.find((i) => i.id === item.id)) {
        state.items.push({ ...item, isFavorite: true });
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<ContentItem>) => {
      const item = action.payload;
      const existingIndex = state.items.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push({ ...item, isFavorite: true });
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
