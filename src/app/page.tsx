'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.preferences.darkMode);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      body.style.backgroundColor = '#e0f2fe';
      body.style.color = '#0c4a6e';
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: darkMode ? '#0a0a0a' : '#e0f2fe', color: darkMode ? '#ededed' : '#0c4a6e' }}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {isMobile ? (
        <motion.div
          initial={false}
          animate={{
            x: isSidebarOpen ? 0 : -256,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed z-50"
        >
          <Sidebar
            activeSection={activeSection}
            onSectionChange={(section) => {
              handleSectionChange(section);
              setIsSidebarOpen(false);
            }}
            onLoginClick={handleProfileClick}
            isMobile={true}
          />
        </motion.div>
      ) : (
        <div className="hidden lg:block">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onLoginClick={handleProfileClick}
            isMobile={false}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300 relative">
        <Header
          onSearch={handleSearch}
          onProfileClick={handleProfileClick}
          onMenuClick={toggleSidebar}
          showMenuButton={isMobile}
        />

        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </main>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogout={handleLogout} />
    </div>
  );
}
