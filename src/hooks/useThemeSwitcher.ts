import { useCallback, useEffect, useState } from 'react';

export const useThemeSwitcher = (): [string, (modeValue: 'dark' | 'light') => void] => {
  const [mode, setMode] = useState('');

  useEffect(() => {
    const currentMode = window.localStorage.getItem('themeMode');

    const canvas = document.querySelector('canvas')!;
    const ctx = canvas.getContext('2d')!;

    if (currentMode === 'dark') {
      window.localStorage.setItem('themeMode', 'dark');
      document.documentElement.classList.add('dark');
      ctx.fillStyle = 'black';
      setMode('dark');
    } else if (currentMode === 'light') {
      window.localStorage.setItem('themeMode', 'light');
      document.documentElement.classList.remove('dark');
      ctx.fillStyle = 'rgb(203 213 225)';
      setMode('light');
    }
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas')!;
    const ctx = canvas.getContext('2d')!;

    if (!window.localStorage.getItem('themeMode')) {
      window.localStorage.setItem('themeMode', 'dark');
      document.documentElement.classList.add('dark');
      ctx.fillStyle = 'black';
      setMode('dark');
    }

    if (mode === 'dark') {
      window.localStorage.setItem('themeMode', 'dark');
      document.documentElement.classList.add('dark');
      ctx.fillStyle = 'black';
    } else if (mode === 'light') {
      window.localStorage.setItem('themeMode', 'light');
      document.documentElement.classList.remove('dark');
      ctx.fillStyle = 'rgb(203 213 225)';
    }

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [mode]);

  const handleSetMode = useCallback((modeValue: 'dark' | 'light') => {
    setMode(modeValue);
  }, []);

  return [mode, handleSetMode];
};
