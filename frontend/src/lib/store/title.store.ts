import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
import toast from "react-hot-toast";
import {
  TitleStoreType,
  TitlePayloadType,
  TitleQueryType,
  TitleIncludeType,
} from "@/types";

const useTitleStore = create<TitleStoreType>((set) => ({
  titleGetLoading: false,
  titleUpdateLoading: false,
  titleCreateLoading: false,
  titleDeleteLoading: false,
  titles: [],
  post: null,

  handleTitlesGet: async (queries?: TitleQueryType) => {
    try {
      set({ titleGetLoading: true });
      const response = await axiosInstance.get("/titles", {
        params: queries,
      });
      set({ titles: response.data });
      // toast.success("Posts fetched successfully", {
      //   id: "get-many",
      // });
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handleTitlesGet]: ", error);
    } finally {
      set({ titleGetLoading: false });
    }
  },

  handleTitleGet: async (slug: string, include?: TitleIncludeType) => {
    try {
      set({ titleGetLoading: true });
      // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate a 5 seconds delay
      const response = await axiosInstance.get(`/titles/${slug}`, {
        params: include,
      });
      set({ post: response.data });
      // console.log(response.data);
      // toast.success("Post fetched successfully", {
      //   id: "get-one",
      // });
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handleTitlesGet]: ", error);
    } finally {
      set({ titleGetLoading: false });
    }
  },

  handleTitleDelete: async (id: string) => {
    try {
      set({ titleDeleteLoading: true });
      //   const response =
      await axiosInstance.delete(`/titles/${id}`);
      //   set({ titles: response.data });
      // toast.success("Posts fetched successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handleTitlesGet]: ", error);
    } finally {
      set({ titleDeleteLoading: false });
    }
  },

  handleTitleCreate: async (titlePayload: { title: string }) => {
    try {
      set({ titleCreateLoading: true });
      const response = await axiosInstance.post("/titles", titlePayload);
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

  handleTitleUpdate: async (titlePayload: TitlePayloadType) => {
    try {
      set({ titleUpdateLoading: true });
      await axiosInstance.patch(`/titles/${titlePayload.id}`, titlePayload);
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

export default useTitleStore;
