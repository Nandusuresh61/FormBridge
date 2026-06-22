import { Navigate, Outlet } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAdminStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div 
          className="animate-spin rounded-full h-8 w-8 border-t-2" 
          style={{ borderColor: "oklch(0.72 0.19 145) transparent transparent transparent" }} 
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
