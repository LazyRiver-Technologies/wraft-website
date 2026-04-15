import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const AuthContext = createContext(null);

// Configure axios
axios.defaults.withCredentials = true;

function formatError(detail) {
  if (!detail) return "Something went wrong";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map(e => e?.msg || JSON.stringify(e)).join(" ");
  if (detail?.msg) return detail.msg;
  return String(detail);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = checking, false = not auth
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/auth/me`);
      setUser(data);
    } catch {
      setUser(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      // Also store token in localStorage as backup
      if (data.access_token) localStorage.setItem("access_token", data.access_token);
      setUser(data);
      return { success: true };
    } catch (e) {
      return { success: false, error: formatError(e.response?.data?.detail) };
    }
  };

  const register = async (email, password, name) => {
    try {
      const { data } = await axios.post(`${API}/auth/register`, { email, password, name });
      if (data.access_token) localStorage.setItem("access_token", data.access_token);
      setUser(data);
      return { success: true };
    } catch (e) {
      return { success: false, error: formatError(e.response?.data?.detail) };
    }
  };

  const logout = async () => {
    try { await axios.post(`${API}/auth/logout`); } catch {}
    localStorage.removeItem("access_token");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Axios interceptor to add token from localStorage as fallback
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
