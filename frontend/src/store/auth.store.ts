import { create } from "zustand";
import type { UserLoginType, UserSignupType, UserType } from "../types";
import { BASE_URL } from "../constants/api";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthStore {
  user: UserType | null;
  signup: (input: UserSignupType) => Promise<void>;
  login: (input: UserLoginType) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  //   login controller
  login: async (input) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, input);

      if (response.status === 400) {
        throw new Error(response.data.error);
      }
      set({ user: response.data.user });
      toast.success(response.data.message);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || error.message);
      } else {
        toast.error(error.message || "Unknown error");
      }
    }
  },
  //   signup controller
  signup: async (input) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, input);

      if (response.status == 400) {
        throw new Error(response.data.error);
      }
      set({ user: response.data.user });
      toast.success(response.data.message);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || error.message);
      } else {
        toast.error(error.message || "Unknown error");
      }
    }
  },
  logout: () => {},
}));
