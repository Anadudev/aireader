import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
import toast from "react-hot-toast";
import useAuthStore from "./auth.store";

type TitleType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
};

type TitlePayloadType = {
  title: string;
};

type PostType = {
  id: string;
  title?: TitleType | null;
  createsAt: string;
  updatedAt: string;
  response: string;
  prompt: string;
};

type PostPayloadType = {
  titleId: string;
  chats: { prompt?: string; response?: string }[];
};

type PostStoreType = {
  postGetLoading: boolean;
  postUpdateLoading: boolean;
  postCreateLoading: boolean;
  postDeleteLoading: boolean;
  titleGetLoading: boolean;
  titleUpdateLoading: boolean;
  titleCreateLoading: boolean;
  titleDeleteLoading: boolean;
  posts: PostType[];
  handlePostGet: () => void;
  handlePostCreate: (postPayload: PostPayloadType) => void;
  handlePostDelete: (id: string) => void;
  handlePostUpdate: (id: string, postPayload: PostPayloadType[]) => void;
  handleTitleCreate: (
    titlePayload: TitlePayloadType
  ) => Promise<TitleType> | null;
  handleTitleUpdate: (id: string, titlePayload: TitlePayloadType) => void;
};

const usePostStore = create<PostStoreType>((set) => ({
  postGetLoading: false,
  postUpdateLoading: false,
  postCreateLoading: false,
  postDeleteLoading: false,
  titleGetLoading: false,
  titleUpdateLoading: false,
  titleCreateLoading: false,
  titleDeleteLoading: false,
  posts: [],

  handlePostCreate: async (postPayload: PostPayloadType) => {
    try {
      set({ postCreateLoading: true });
      await axiosInstance.post("/posts", postPayload, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().access_token}`,
        },
      });
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
  handlePostGet: async () => {
    try {
      set({ postGetLoading: true });
      const response = axiosInstance.get("/posts");
      set({ posts: response.data });
      toast.success("Posts fetched successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handlePostGet]: ", error);
    } finally {
      set({ postGetLoading: false });
    }
  },
  handlePostDelete: (id: string) => {
    try {
      set({ postDeleteLoading: true });
      axiosInstance.delete(`/posts/${id}`);
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
  handlePostUpdate: (id: string, postPayload: PostPayloadType[]) => {
    try {
      set({ postUpdateLoading: true });
      axiosInstance.patch(`/posts/${id}`, postPayload);
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
  handleTitleCreate: async (titlePayload: TitlePayloadType) => {
    try {
      set({ titleCreateLoading: true });
      const response = await axiosInstance.post("/posts/title", titlePayload, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().access_token}`,
        },
      });
      toast.success("Title created successfully");
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handleTitleCreate]: ", error);
    } finally {
      set({ titleCreateLoading: false });
    }
    return null;
  },
  handleTitleUpdate: (id: string, titlePayload: TitlePayloadType) => {
    try {
      set({ titleUpdateLoading: true });
      axiosInstance.patch(`/posts/title/${id}`, titlePayload);
      toast.success("Title updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handleTitleUpdate]: ", error);
    } finally {
      set({ titleUpdateLoading: false });
    }
  },
}));

export default usePostStore;
