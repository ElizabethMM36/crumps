// src/AdminRoute.jsx
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // show while checking auth
  if (!user || !isAdmin) return <Navigate to="/" replace />; // block non-admins

  return children;
}
