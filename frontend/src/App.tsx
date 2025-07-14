import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";
import HomePage from "./pages/Home";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import CustomizePage from "./pages/CustomizePage";

function App() {
  const { user, checkMe } = useAuthStore();

  useEffect(() => {
    checkMe();
  }, [user, checkMe]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/customize" element={<CustomizePage />} />
      </Routes>
    </>
  );
}

export default App;
