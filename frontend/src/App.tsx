import { Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;