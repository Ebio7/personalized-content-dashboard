'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleDarkMode, setLanguage } from '@/store/slices/preferencesSlice';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLoginClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, onLoginClick }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const language = useAppSelector((state) => state.preferences.language);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const sections = [
    { id: 'feed', label: t('sidebar.feed'), icon: '📰' },
    { id: 'trending', label: t('sidebar.trending'), icon: '🔥' },
    { id: 'favorites', label: t('sidebar.favorites'), icon: '⭐' },
    { id: 'settings', label: t('sidebar.settings'), icon: '⚙️' },
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 fixed h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('sidebar.title')}
        </h1>
      </div>

      <nav className="space-y-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-xl mr-3">{section.icon}</span>
            <span className="font-medium">{section.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button
          onClick={handleDarkModeToggle}
          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl mr-3">{darkMode ? '☀️' : '🌙'}</span>
          <span className="font-medium">
            {darkMode ? t('sidebar.lightMode') : t('sidebar.darkMode')}
          </span>
        </button>

        <div className="px-4 py-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('settings.language')}
          </p>
          <div className="flex space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-2 py-1 rounded text-sm transition-colors ${
                  language === lang.code
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onLoginClick}
          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-xl mr-3">{isAuthenticated ? '👤' : '🔐'}</span>
          <span className="font-medium">
            {isAuthenticated ? user?.name : t('auth.login')}
          </span>
        </button>
      </div>
    </aside>
  );
};
