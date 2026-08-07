import { createContext, useCallback, useEffect, useState } from "react";
import authService from "../services/authService";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  const checkAuth = useCallback(async () => { try { const response = await authService.getCurrentUser(); setUser(response.data); } catch { setUser(null); } finally { setLoading(false); } }, []);
  useEffect(() => { checkAuth(); }, [checkAuth]);
  const login = async (credentials) => { const response = await authService.login(credentials); setUser(response.data); return response; };
  const register = async (payload) => { const response = await authService.register(payload); setUser(response.data); return response; };
  const logout = async () => { await authService.logout(); setUser(null); };
  const deleteAccount = async () => { await authService.deleteAccount(); setUser(null); localStorage.clear(); };
  return <AuthContext.Provider value={{ user, loading, isAuthenticated: Boolean(user), login, register, logout, deleteAccount }}>{children}</AuthContext.Provider>;
};
