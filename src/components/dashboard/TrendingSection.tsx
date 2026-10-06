'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTrendingContent } from '@/store/thunks/contentThunks';
import { ContentCard } from '@/components/ui/ContentCard';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

export const TrendingSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.trending);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const { darkMode } = useAppSelector((state) => state.preferences);

  useEffect(() => {
    dispatch(fetchTrendingContent());
  }, [dispatch]);

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
        className="mb-6"
      >
        <h2 className="text-3xl font-bold mb-2" style={{ color: darkMode ? '#ededed' : '#111827' }}>
          {t('trending.title')}
        </h2>
        <p className="text-lg" style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}>
          {t('trending.description')}
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}>
            {t('trending.noContent')}
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
};
