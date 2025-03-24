import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
import toast from "react-hot-toast";
import useAuthStore from "@/lib/store/auth.store";
import {
  PostStoreType,
  PostPayloadType,
  PostQueryType,
  ChatPayload,
} from "@/types/Post.type";

const usePostStore = create<PostStoreType>((set) => ({
  postGetLoading: false,
  postUpdateLoading: false,
  postCreateLoading: false,
  postDeleteLoading: false,
  posts: [],

  handlePostCreate: async (postPayload: PostPayloadType) => {
    try {
      set({ postCreateLoading: true });
      await axiosInstance.post("/posts", postPayload);
      toast.success("Post created successfully");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handlePostCreate]: ", error);
    } finally {
      set({ postCreateLoading: false });
    }
  },
  handlePostsGet: async (query?: PostQueryType) => {
    try {
      set({ postGetLoading: true });
      const response = await axiosInstance.get("/posts", {
        params: query,
      });
      set({ posts: response.data });
      toast.success("Posts fetched successfully", {
        id: "get-many",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handlePostsGet]: ", error);
    } finally {
      set({ postGetLoading: false });
    }
  },
  handlePostDelete: async (id: string) => {
    try {
      set({ postDeleteLoading: true });
      await axiosInstance.delete(`/posts/${id}`);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handlePostDelete]: ", error);
    } finally {
      set({ postDeleteLoading: false });
    }
  },
  handlePostUpdate: async (postPayload: ChatPayload) => {
    try {
      set({ postUpdateLoading: true });
      await axiosInstance.patch(`/posts/${postPayload.id}`, postPayload);
      toast.success("Post updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handlePostUpdate]: ", error);
    } finally {
      set({ postUpdateLoading: false });
    }
  },
}));

export default usePostStore;
