'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { FeedSection } from '@/components/dashboard/FeedSection';
import { TrendingSection } from '@/components/dashboard/TrendingSection';
import { FavoritesSection } from '@/components/dashboard/FavoritesSection';
import { SettingsSection } from '@/components/dashboard/SettingsSection';
import { SearchResults } from '@/components/dashboard/SearchResults';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchContent } from '@/store/thunks/contentThunks';
import { clearSearch } from '@/store/slices/searchSlice';
import { logout } from '@/store/slices/authSlice';

export default function Home() {
  const [activeSection, setActiveSection] = useState('feed');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Auto-show login modal on first visit if not authenticated
  useEffect(() => {
    const hasSeenLoginPrompt = localStorage.getItem('hasSeenLoginPrompt');
    if (!isAuthenticated && !hasSeenLoginPrompt) {
      setTimeout(() => {
        setIsLoginModalOpen(true);
        localStorage.setItem('hasSeenLoginPrompt', 'true');
      }, 2000); // Show after 2 seconds
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (darkMode) {
      html.classList.add('dark');
      body.style.backgroundColor = '#0a0a0a';
      body.style.color = '#ededed';
    } else {
      html.classList.remove('dark');
      body.style.backgroundColor = 'white';
      body.style.color = '#171717';
    }
  }, [darkMode]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      dispatch(searchContent(query));
      setShowSearchResults(true);
    } else {
      dispatch(clearSearch());
      setShowSearchResults(false);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setShowSearchResults(false);
    dispatch(clearSearch());
  };

  const handleProfileClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('hasSeenLoginPrompt');
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: darkMode ? '#0a0a0a' : '#f9fafb', color: darkMode ? '#ededed' : '#171717' }}>
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} onLoginClick={handleProfileClick} />

      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <Header onSearch={handleSearch} onProfileClick={handleProfileClick} />

        <main className="flex-1 overflow-y-auto">
          {showSearchResults ? (
            <SearchResults />
          ) : (
            <>
              {activeSection === 'feed' && <FeedSection />}
              {activeSection === 'trending' && <TrendingSection />}
              {activeSection === 'favorites' && <FavoritesSection />}
              {activeSection === 'settings' && <SettingsSection />}
            </>
          )}
        </main>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogout={handleLogout} />
    </div>
  );
}
