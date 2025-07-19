import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { useEffect, useState } from "react";
import { useGeminiStore } from "../store/gemini.store";
import type { GeminiRespType } from "../types";

function HomePage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
  };
  const { geminiResponse, getGeminiResponse } = useGeminiStore();
  const [userSpeech, setUserSpeech] = useState<string>("");

  // speak function
  const speak = async (text: string) => {
    console.log(text);
    const utterence = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterence);
  };

  // handle commands
  const handleCommand = async (data: GeminiRespType) => {
    const { response, type, userInput } = data;
    await speak(response);

    if (type === "general") {
      const query = encodeURIComponent(userInput);
      (window as any).open(
        `https://www.google.com/search?q=${query}`,
        "_blank"
      );
    }
    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      (window as any).open(
        `https://www.google.com/search?q=${query}`,
        "_blank"
      );
    }
    if (type === "calculator_open") {
      (window as any).open("https://www.calculator.net/", "_blank");
    }
    if (type === "instagram_open") {
      (window as any).open("https://www.instagram.com/", "_blank");
    }
    if (type === "facebook_open") {
      (window as any).open("https://www.facebook.com/", "_blank");
    }
    if (type === "youtube_search") {
      const query = encodeURIComponent(userInput);
      console.log(query);
      (window as any).open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
    if (type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      console.log(query);
      (window as any).open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
    if (type === "weather-show") {
      (window as any).open(`https://www.google.com/search?q=weather`, "_blank");
    }
  };

  // recgonize voice
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-IN";

    recognition.onresult = async (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      setUserSpeech(transcript);
      if (
        transcript.toLowerCase().includes(user?.assistant?.name?.toLowerCase())
      ) {
        const geminiResp = await getGeminiResponse(transcript);
        console.log(geminiResp);

        await handleCommand(geminiResp);
      }
    };

    recognition.start();
  }, []);

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

      {userSpeech && (
        <div>
          <h1 className="font-bold text-white text-xl ">You said: </h1>
          <p className="font-bold text-white text-xl ">{userSpeech}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
