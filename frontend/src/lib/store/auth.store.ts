import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
// import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { accessTokenLocalStorage, removeItem } from "../localStorage";
type AuthUserType = {
  username: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};
type AuthStore = {
  authUser: AuthUserType | null;
  access_token: string | null;
  loadingSignUp: boolean;
  loadingLogin: boolean;
  loginHandler: (data: any) => Promise<void>;
  signupHandler: (data: any) => Promise<void>;
  logoutHandler: () => void;
  logoutLoading: boolean;
  authUserHandler: () => Promise<void>;
};

const useAuthStore = create<AuthStore>((set, get) => ({
  access_token: accessTokenLocalStorage || null,
  loadingSignUp: false,
  loadingLogin: false,
  authUser: null,
  logoutLoading: false,

  authUserHandler: async () => {
    try {
      const accessToken = get().access_token;
      const request = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ authUser: request.data });
      console.log(request);
      // toast.success("Authentication successful");
    } catch (error) {
      console.error("[authUserHandler]: ", error);
      toast.error(error.response.data.message);
    }
  },

  loginHandler: async (loginPayload) => {
    try {
      set({ loadingLogin: true });
      const response = await axiosInstance.post("/auth/login", loginPayload);
      set({ access_token: response.data.access_token });
      localStorage.setItem("access_token", response.data.access_token);
      console.log(response.data);
      get().authUserHandler();
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
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("[signupHandler]: ", error);
    } finally {
      set({ loadingSignUp: false });
    }
  },

  logoutHandler: () => {
    set({ logoutLoading: true });
    removeItem("access_token");
    set({ access_token: null });
    toast.success("Logout successful");
    set({ logoutLoading: false });
  },
}));

export default useAuthStore;
