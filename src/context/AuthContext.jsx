import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { authApi } from "@/api/auth";

const AuthContext = createContext(null);
const STORAGE_KEY = "auth_token";

function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem(STORAGE_KEY, token);
  } else {
    delete apiClient.defaults.headers.common.Authorization;
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const { user } = await authApi.me();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (credentials) => {
    const { user, token } = await authApi.login(credentials);
    setAuthToken(token);
    setUser(user);
    return user;
  }, []);

  const register = useCallback(async (payload) => {
    const { user, token } = await authApi.register(payload);
    setAuthToken(token);
    setUser(user);
    return user;
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const { user } = await authApi.updateProfile(payload);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAuthToken(null);
      setUser(null);
      queryClient.clear();
    }
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
