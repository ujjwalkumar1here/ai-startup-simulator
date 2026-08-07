import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import PageLoader from "../components/ui/PageLoader.jsx";

export default function PublicOnlyRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
