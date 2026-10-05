'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { useAppSelector } from '@/store/hooks';
import { I18nProvider } from './I18nProvider';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Remove all existing classes first
    html.classList.remove('dark');
    body.style.backgroundColor = '';
    body.style.color = '';

    // Apply dark mode
    if (darkMode) {
      html.classList.add('dark');
      body.style.backgroundColor = '#0a0a0a';
      body.style.color = '#ededed';
    } else {
      body.style.backgroundColor = 'white';
      body.style.color = '#171717';
    }

    // Force reflow
    void body.offsetHeight;
  }, [darkMode]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </I18nProvider>
      </PersistGate>
    </Provider>
  );
}
