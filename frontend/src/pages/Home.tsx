import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

function HomePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#020253] overflow-auto pb-10 flex items-center justify-center flex-col gap-4">
      {/* buttons */}
      <button
        className="absolute top-5 right-5 sm:text-lg bg-gradient-to-r from-blue-500 via-blue-800 to-blue-500 font-semibold text-lg px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-900 hover:to-blue-800 mx-auto flex items-center justify-center"
        onClick={() => navigate("/customize")}
      >
        Customize your AI
      </button>
      <button
        className="absolute top-20 right-5 sm:text-lg bg-gradient-to-r from-blue-500 via-blue-800 to-blue-500 font-semibold text-lg px-8 py-3 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-900 hover:to-blue-800 mx-auto flex items-center justify-center"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl gap-3">
        <img
          src={user?.assistant?.image || ""}
          alt="assistant"
          className="w-full h-full object-cover shadow-lg"
        />
      </div>

      <h1 className="font-bold text-white text-xl ">
        I'm {user?.assistant?.name}
      </h1>
    </div>
  );
}

export default HomePage;
