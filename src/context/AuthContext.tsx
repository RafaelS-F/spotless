'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Função segura para SSR (não acessa document no servidor)
const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined;
};

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Correção: Garantir que só roda no cliente
  useEffect(() => {
    setIsClient(true);
    const token = getCookie('sessionToken');
    setIsAuthenticated(!!token);
  }, [pathname]);

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setIsAuthenticated(false);
    }
  }

  const contextValue = {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isClient ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}