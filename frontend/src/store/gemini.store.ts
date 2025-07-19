import axios, { type AxiosResponse } from "axios";
import { create } from "zustand";
import { BASE_URL } from "../constants/api";
import toast from "react-hot-toast";
import type { GeminiRespType } from "../types";


interface GeminiInterface {
  geminiResponse: GeminiRespType | null;
  getGeminiResponse: (question: string) => Promise<GeminiRespType>;
}

export const useGeminiStore = create<GeminiInterface>((set) => ({
  geminiResponse: null,
  getGeminiResponse: async (question) => {
    try {
      const response:AxiosResponse = await axios.get(
        `${BASE_URL}/auth/askToAssistant?question=${question}`,
        {
          withCredentials: true,
        }
      );
      set({ geminiResponse: response.data });
      return response.data;
    } catch (error:any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || error.message);
      } else {
        toast.error(error.message || "Unknown error");
      }
      return "";
    }
  },
}));
