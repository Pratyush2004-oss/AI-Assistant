import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

function Redirect({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  const path = window.location.pathname;

  if (user && user?.assistant && (path === "/signin" || path === "/signup"))
    return <Navigate to="/" />;
  if (!user && path === "/") return <Navigate to="/signin" />;
  if (!user?.assistant && path === "/") return <Navigate to="/customize" />;
  return <>{children}</>;
}

export default Redirect;
