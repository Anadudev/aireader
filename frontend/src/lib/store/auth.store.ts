import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
// import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

type AuthStore = {
  user: any;
  access_token: string | null;
  loadingSignUp: boolean;
  loadingLogin: boolean;
  authUser: any;
  loginHandler: (data: any) => Promise<void>;
  signupHandler: (data: any) => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  access_token: localStorage.getItem("access_token") || null,
  loadingSignUp: false,
  loadingLogin: false,
  authUser: null,

  loginHandler: async (data) => {
    try {
      set({ loadingLogin: true });
      const response = await axiosInstance.post("/auth/login", data);
      set({ access_token: response.data.access_token });
      localStorage.setItem("access_token", response.data.access_token);
      console.log(response.data);
      toast.success("Login successful");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ loadingLogin: false });
    }
  },

  signupHandler: async (data) => {
    try {
      set({ loadingSignUp: true });
      await axiosInstance.post("/auth/signup", data);
      set({ user: null });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("[signupHandler]: ", error);
    } finally {
      set({ loadingSignUp: false });
    }
  },
}));

export default useAuthStore;
