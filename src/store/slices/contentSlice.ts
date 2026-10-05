import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, FeedState } from '@/types';

const initialState: FeedState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContentLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setContentError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setContentItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    appendContentItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = [...state.items, ...action.payload];
    },
    setContentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    resetContent: () => initialState,
  },
});

export const {
  setContentLoading,
  setContentError,
  setContentItems,
  appendContentItems,
  setContentPage,
  incrementPage,
  setHasMore,
  resetContent,
} = contentSlice.actions;

export default contentSlice.reducer;
