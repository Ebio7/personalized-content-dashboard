'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCategory, toggleDarkMode, resetPreferences } from '@/store/slices/preferencesSlice';

const AVAILABLE_CATEGORIES = [
  { id: 'technology', icon: '💻' },
  { id: 'sports', icon: '⚽' },
  { id: 'finance', icon: '💰' },
  { id: 'movies', icon: '🎬' },
  { id: 'social', icon: '📱' },
];

export const SettingsSection: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { categories, darkMode } = useAppSelector((state) => state.preferences);

  const handleToggleCategory = (categoryId: string) => {
    dispatch(toggleCategory(categoryId));
  };

  const handleResetPreferences = () => {
    if (confirm('Are you sure you want to reset all preferences?')) {
      dispatch(resetPreferences());
    }
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold mb-2" style={{ color: darkMode ? '#ededed' : '#111827' }}>
          {t('settings.title')}
        </h2>
        <p className="text-lg" style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}>
          {t('settings.description')}
        </p>
      </motion.div>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.contentPreferences')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('settings.contentPreferencesDesc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AVAILABLE_CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleToggleCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  categories.includes(category.id)
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {t(`categories.${category.id}`)}
                </div>
                {categories.includes(category.id) && (
                  <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                    ✓ Selected
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.appearance')}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-white font-medium">{t('sidebar.darkMode')}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('settings.darkModeDesc')}
              </p>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('settings.resetPreferences')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('settings.resetPreferencesDesc')}
          </p>
          <button
            onClick={handleResetPreferences}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('settings.resetButton')}
          </button>
        </motion.div>
      </div>
    </div>
  );
};
