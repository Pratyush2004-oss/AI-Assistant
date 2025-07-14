import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/authBg.png";
import { useAuthStore } from "../../store/auth.store";
import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";
function Signup() {
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup } = useAuthStore();
  const navigate = useNavigate();
  const handleChange = (name: string, value: string) => {
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setloading(true);
      e.preventDefault();
      await signup(input);
    } catch (error) {
      
    }
    finally{
      setloading(false);
    }
  };
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000039] backdrop-blur rounded-md shadow-lg shadow-black flex flex-col justify-center items-center gap-5 px-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-2xl sm:text-3xl font-semibold text-center mb-5">
          Register to{" "}
          <span className="bg-gradient-to-r from-blue-500 via-blue-800 to-blue-500 bg-clip-text text-transparent font-bold">
            Virtual Assistant
          </span>
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full outline-none bg-transparent text-white border-white border-2 px-5 py-2.5 placeholder:text-gray-300 rounded-full sm:text-lg"
          value={input.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-full outline-none bg-transparent text-white border-white border-2 px-5 py-2.5 placeholder:text-gray-300 rounded-full sm:text-lg"
          value={input.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <div className="relative w-full">
          {input.password ? (
            showPassword ? (
              <EyeOff
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                size={24}
                onClick={() => setshowPassword(false)}
              />
            ) : (
              <Eye
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                size={24}
                onClick={() => setshowPassword(true)}
              />
            )
          ) : null}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            minLength={6}
            className="w-full outline-none bg-transparent text-white border-white border-2 px-5 py-2.5 placeholder:text-gray-300 rounded-full sm:text-lg"
            value={input.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className=" sm:text-lg bg-gradient-to-r from-blue-500 via-blue-800 to-blue-500 font-semibold text-lg px-8 py-2 rounded-full text-white mt-6"
        >
          {loading ? <Spiral size="20" speed="0.9" color="white" /> : "Sign up"}
        </button>
        <p className="text-white font-bold">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-blue-400 text-lg cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
