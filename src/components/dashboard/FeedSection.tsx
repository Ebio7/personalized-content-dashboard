'use client';

import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchContent, loadMoreContent } from '@/store/thunks/contentThunks';
import { ContentCard } from '@/components/ui/ContentCard';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';

export const FeedSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, loading, hasMore, page } = useAppSelector((state) => state.content);
  const { categories, darkMode } = useAppSelector((state) => state.preferences);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const { refresh } = useRealTimeUpdates(30000);

  useEffect(() => {
    dispatch(fetchContent({ categories, page: 1 }));
  }, [dispatch, categories]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(loadMoreContent());
    }
  }, [dispatch, loading, hasMore]);

  const handleFavorite = (item: any) => {
    dispatch(toggleFavorite(item));
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: darkMode ? '#ededed' : '#111827' }}>
            {t('feed.title')}
          </h2>
          <p className="text-lg" style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}>
            {t('feed.description')}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh
        </motion.button>
      </motion.div>

      {loading && items.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}>
            {t('feed.noContent')}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ContentCard
                  item={item}
                  onFavorite={handleFavorite}
                  isFavorite={isFavorite(item.id)}
                />
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm lg:text-base"
              >
                {loading ? t('feed.loading') : t('feed.loadMore')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
