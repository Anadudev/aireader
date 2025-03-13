import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
// import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import { UserType } from "@/types/User.type";
// import { AccessTokenLocalStorage, RemoveItem } from "../localStorage";


type AuthStore = {
  authUser: UserType | null;
  access_token: string | null;
  loadingSignUp: boolean;
  loadingLogin: boolean;
  setAuthUser: (user: UserType | null) => void;
  loginHandler: (data: { username: string; password: string }) => Promise<void>;
  signupHandler: (data: {
    username: string;
    password: string;
  }) => Promise<void>;
  logoutHandler: () => void;
  logoutLoading: boolean;
  authUserHandler: () => Promise<void>;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
};

// const getLocalStorage = (key: string) => {
//   const item = window.localStorage.getItem(key);
//   return item ? JSON.parse(item) : null;
// };

const useAuthStore = create<AuthStore>((set, get) => ({
  access_token: null,
  loadingSignUp: false,
  loadingLogin: false,
  authUser: null,
  logoutLoading: false,

  setAuthUser: (user: UserType | null) => set({ authUser: user }),

  authUserHandler: async () => {
    try {
      const accessToken = get().access_token;
      const request = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      set({ authUser: request.data });
      localStorage.setItem("authUser", JSON.stringify(request.data));
      // console.log(request);
      // toast.success("Authentication successful");
    } catch (error) {
      console.error("[authUserHandler]: ", error);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
    }
  },

  loginHandler: async (loginPayload) => {
    try {
      set({ loadingLogin: true });
      const response = await axiosInstance.post("/auth/login", loginPayload);
      set({ access_token: response.data.access_token });
      localStorage.setItem("access_token", response.data.access_token);
      // console.log(response.data);
      get().authUserHandler();
      toast.success("Login successful");
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

  logoutHandler: () => {
    set({ logoutLoading: true });
    set({ access_token: null });
    set({ authUser: null });
    window.localStorage.removeItem("access_token");
    localStorage.removeItem("authUser");
    toast.success("Logout successful");
    // window.location.href = "/";
    set({ logoutLoading: false });
  },

  setAccessToken: (token: string) => set({ access_token: token }),
  removeAccessToken: () => {
    set({ access_token: null });
    window.localStorage.removeItem("access_token");
  },
}));

export default useAuthStore;
