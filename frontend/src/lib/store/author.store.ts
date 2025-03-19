import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
import toast from "react-hot-toast";
import {
  AuthorStoreType,
  AuthorQueryType,
  AuthorIncludeType,
} from "@/types/Author.type";

const useAuthorStore = create<AuthorStoreType>((set) => ({
  authorGetLoading: false,
  authorUpdateLoading: false,
  authors: [],
  author: null,

  handleAuthorsGet: async (query?: AuthorQueryType) => {
    try {
      set({ authorGetLoading: true });
      const response = await axiosInstance.get("/users", {
        params: query,
      });
      set({ authors: response.data });
      toast.success("Authors fetched successfully", {
        id: "get-many",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handleAuthorsGet]: ", error);
    } finally {
      set({ authorGetLoading: false });
    }
  },

  handleAuthorGet: async (
    include: AuthorIncludeType,
    username?: string,
    authorId?: string
  ) => {
    // return;
    try {
      set({ authorGetLoading: true });
      const response = await axiosInstance.get(
        `/users/${authorId || username}`,
        {
          params: include,
        }
      );
      set({ author: response.data });
      toast.success("Author updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handleAuthorUpdate]: ", error);
    } finally {
      set({ authorGetLoading: false });
    }
  },
}));

export default useAuthorStore;
