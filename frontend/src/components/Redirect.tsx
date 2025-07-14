import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

function Redirect({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  const navigate = useNavigate();
  const path = window.location.pathname;

  if (user && user?.assistant && (path === "/signin" || path === "/signup"))
    navigate("/");
  if (!user && path === "/") navigate("/signin");
  if (!user?.assistant) navigate("/customize");
  return <>{children}</>;
}

export default Redirect;
