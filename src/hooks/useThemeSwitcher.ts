import { useCallback, useEffect, useState } from 'react';

export const useThemeSwitcher = (): [string, (modeValue: 'dark' | 'light') => void] => {
  const preferDarkQuery = '(prefer-color-scheme: dark)';

  const [mode, setMode] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);

    const currentMode = window.localStorage.getItem('themeMode');

    const handleChangeMode = () => {
      if (currentMode) {
        const currentModeValue = currentMode === 'dark' ? 'dark' : 'light';
        setMode(currentModeValue);

        if (currentModeValue === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        const currentModeValue = mediaQuery.matches ? 'dark' : 'light';
        setMode(currentModeValue);

        if (currentModeValue === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChangeMode);
  }, []);

  useEffect(() => {
    if (mode === 'dark') {
      window.localStorage.setItem('themeMode', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      window.localStorage.setItem('themeMode', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const handleSetMode = useCallback((modeValue: 'dark' | 'light') => {
    setMode(modeValue);
  }, []);

  return [mode, handleSetMode];
};
