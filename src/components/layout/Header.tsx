'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { debounce } from '@/utils/debounce';
import { useRealTimeUpdates } from '@/hooks/useRealTimeUpdates';
import { useAppSelector } from '@/store/hooks';

interface HeaderProps {
  onSearch: (query: string) => void;
  onProfileClick: () => void;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onProfileClick, onMenuClick, showMenuButton = false }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const { refresh } = useRealTimeUpdates(30000);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const debouncedSearch = debounce((query: string) => {
    onSearch(query);
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refresh}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Refresh content"
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </motion.button>

          <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
            onClick={onProfileClick}
          >
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-blue-500"
                />
                <div className="hidden sm:block">
                  <p className="text-gray-900 dark:text-white font-medium text-sm lg:text-base">{user.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg text-sm lg:text-base">
                  U
                </div>
                <div className="hidden sm:block">
                  <p className="text-gray-900 dark:text-white font-medium text-sm lg:text-base">Guest User</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm">Sign in to personalize</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
