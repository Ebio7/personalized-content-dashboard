'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFavorite } from '@/store/slices/favoritesSlice';
import { ContentCard } from '@/components/ui/ContentCard';

export const FavoritesSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.favorites);
  const { darkMode } = useAppSelector((state) => state.preferences);

  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold mb-2" style={{ color: darkMode ? '#ededed' : '#111827' }}>
          {t('favorites.title')}
        </h2>
        <p className="text-lg" style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}>
          {t('favorites.description')}
        </p>
      </motion.div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            ⭐
          </motion.div>
          <p className="text-lg" style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}>
            {t('favorites.noFavorites')}
          </p>
        </div>
      ) : (
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
                onFavorite={() => handleRemoveFavorite(item.id)}
                isFavorite={true}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
