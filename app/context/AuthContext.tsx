'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  loggedIn: boolean;
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  role: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  // app/context/AuthContext.tsx (di dalam useEffect)
  useEffect(() => {
    async function checkSession() {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        setLoggedIn(data.isLoggedIn);
        setRole(data.role);
      }
    }
    checkSession();
  }, []);

  const login = (newRole: string) => {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('role', newRole);
    setLoggedIn(true);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
    setLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
