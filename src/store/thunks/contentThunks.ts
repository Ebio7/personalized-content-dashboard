import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '@/services/apiService';
import { setContentLoading, setContentError, setContentItems, appendContentItems, incrementPage, setHasMore } from '../slices/contentSlice';
import { setSearchLoading, setSearchError, setSearchResults } from '../slices/searchSlice';
import { setTrendingLoading, setTrendingError, setTrendingItems } from '../slices/trendingSlice';
import { RootState } from '../store';

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (params: { categories: string[]; page?: number; limit?: number }, { dispatch, getState }) => {
    const { page = 1, limit = 10, categories } = params;
    const state = getState() as RootState;

    try {
      dispatch(setContentLoading(true));
      dispatch(setContentError(null));

      const items = await apiService.fetchContent(categories, page, limit);

      if (page === 1) {
        dispatch(setContentItems(items));
      } else {
        dispatch(appendContentItems(items));
      }

      dispatch(setHasMore(items.length >= limit));
    } catch (error) {
      dispatch(setContentError(error instanceof Error ? error.message : 'Failed to fetch content'));
    } finally {
      dispatch(setContentLoading(false));
    }
  }
);

export const loadMoreContent = createAsyncThunk(
  'content/loadMore',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { page, hasMore, loading } = state.content;

    if (!hasMore || loading) return;

    dispatch(incrementPage());
    const { categories } = state.preferences;
    await dispatch(fetchContent({ categories, page: page + 1 }));
  }
);

export const searchContent = createAsyncThunk(
  'search/searchContent',
  async (query: string, { dispatch }) => {
    try {
      dispatch(setSearchLoading(true));
      dispatch(setSearchError(null));

      const results = await apiService.searchContent(query);
      dispatch(setSearchResults(results));
    } catch (error) {
      dispatch(setSearchError(error instanceof Error ? error.message : 'Search failed'));
    } finally {
      dispatch(setSearchLoading(false));
    }
  }
);

export const fetchTrendingContent = createAsyncThunk(
  'trending/fetchTrending',
  async (_, { dispatch }) => {
    try {
      dispatch(setTrendingLoading(true));
      dispatch(setTrendingError(null));

      const items = await apiService.fetchTrendingContent();
      dispatch(setTrendingItems(items));
    } catch (error) {
      dispatch(setTrendingError(error instanceof Error ? error.message : 'Failed to fetch trending content'));
    } finally {
      dispatch(setTrendingLoading(false));
    }
  }
);
