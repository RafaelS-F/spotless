'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react'; // ícones modernos

export default function DarkModePopup() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferred = stored || 'light';
    setTheme(preferred);
    document.documentElement.setAttribute('data-theme', preferred);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: theme === 'dark' ? '#333' : '#fff',
        border: '1px solid rgba(0,0,0,0.1)',
        color: theme === 'dark' ? '#f4f4f4' : '#333',
        borderRadius: '50%',
        width: '52px',
        height: '52px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        zIndex: 9999,
      }}
    >
      {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
    </button>
  );

  
}
