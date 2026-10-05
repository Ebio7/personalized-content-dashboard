import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, TrendingState } from '@/types';

const initialState: TrendingState = {
  items: [],
  loading: false,
  error: null,
};

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    setTrendingLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTrendingError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTrendingItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  setTrendingLoading,
  setTrendingError,
  setTrendingItems,
} = trendingSlice.actions;

export default trendingSlice.reducer;
