import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
import toast from "react-hot-toast";
import { AuthStore } from "@/types";

const useAuthStore = create<AuthStore>((set, get) => ({
  loadingSignUp: false,
  loadingLogin: false,
  authUser: null,
  logoutLoading: false,

  authUserHandler: async () => {
    try {
      const request = await axiosInstance.get("/auth/profile");
      console.log(request.data);
      if (!request.data) {
        toast.error("You are not logged in");
        set({ authUser: null });
        if (window.location.pathname !== "/auth/login") {
          window.location.href = "/auth/login";
        }
      }
      set({ authUser: request.data || null });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
      // error.response && error.response.data.message
      //   ? toast.error(error.response.data.message)
      //   : toast.error("Something went wrong");
    }
  },

  loginHandler: async (loginPayload) => {
    try {
      set({ loadingLogin: true });
      const response = await axiosInstance.post("/auth/login", loginPayload);
      // console.log(response.data);
      get().authUserHandler();
      toast.success(response.data.message);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[signupHandler]: ", error);
    } finally {
      set({ loadingSignUp: false });
    }
  },

  logoutHandler: async () => {
    set({ logoutLoading: true });
    set({ authUser: null });
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(response.data.message);
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("[logoutHandler]: ", error);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
    } finally {
      set({ logoutLoading: false });
    }
  },
}));

export default useAuthStore;
