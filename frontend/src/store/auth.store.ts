import { create } from "zustand";
import type { UserLoginType, UserSignupType, UserType } from "../types";
import { BASE_URL } from "../constants/api";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthStore {
  user: UserType | null;
  signup: (input: UserSignupType) => Promise<void>;
  login: (input: UserLoginType) => Promise<void>;
  checkMe: () => Promise<void>;
  logout: () => Promise<boolean>;
  updateAssistant: (input: FormData) => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  //   login controller
  login: async (input) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, input, {
        withCredentials: true,
      });

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
      const response = await axios.post(`${BASE_URL}/auth/signup`, input, {
        withCredentials: true,
      });

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
  // checkAuth
  checkMe: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/getMe`, {
        withCredentials: true,
      });
      set({ user: response.data.user });
    } catch (error: any) {}
  },
  // update user with AI-Assistant
  updateAssistant: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/updateAssistant`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 400) throw new Error(response.data.error);
      set({ user: response.data.user });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || error.message);
      } else {
        toast.error(error.message || "Unknown error");
      }
      return false;
    }
  },
  // logout
  logout: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 400) throw new Error(response.data.error);
      if (response.status === 200) {
        set({ user: null });
        toast.success(response.data.message);
        return true;
      }
      return false;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || error.message);
      } else {
        toast.error(error.message || "Unknown error");
      }
      return false;
    }
  },
}));
