import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import preferencesReducer from './slices/preferencesSlice';
import contentReducer from './slices/contentSlice';
import favoritesReducer from './slices/favoritesSlice';
import searchReducer from './slices/searchSlice';
import trendingReducer from './slices/trendingSlice';
import authReducer from './slices/authSlice';

// Custom storage that works with Next.js App Router
const storage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return Promise.resolve(null);
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return Promise.resolve();
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return Promise.resolve();
    return Promise.resolve(localStorage.removeItem(key));
  },
};

const preferencesPersistConfig = {
  key: 'preferences',
  storage,
  whitelist: ['categories', 'darkMode', 'language'],
};

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['items'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'],
};

const persistedPreferencesReducer = persistReducer(preferencesPersistConfig, preferencesReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    preferences: persistedPreferencesReducer,
    content: contentReducer,
    favorites: persistedFavoritesReducer,
    search: searchReducer,
    trending: trendingReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
