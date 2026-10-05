'use client';

import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchContent, loadMoreContent } from '@/store/thunks/contentThunks';
import { ContentCard } from '@/components/ui/ContentCard';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

interface FeedContentProps {
  onFavorite: (item: any) => void;
  isFavorite: (id: string) => boolean;
}

const FeedContent: React.FC<FeedContentProps> = ({ onFavorite, isFavorite }) => {
  const dispatch = useAppDispatch();
  const { items, loading, hasMore } = useAppSelector((state) => state.content);
  const { categories } = useAppSelector((state) => state.preferences);

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

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Personalized Feed
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Content tailored to your preferences.
        </p>
      </motion.div>

      {loading && items.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No content available. Update your preferences to see more.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const DraggableFeedSection: React.FC = () => {
  const { items: favorites } = useAppSelector((state) => state.favorites);

  const handleFavorite = (item: any) => {
    // This will be handled inside FeedContent
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  return <FeedContent onFavorite={handleFavorite} isFavorite={isFavorite} />;
};
