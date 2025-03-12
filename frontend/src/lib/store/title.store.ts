import { create } from "zustand";
import axiosInstance from "@/lib/axios.config";
import toast from "react-hot-toast";
import useAuthStore from "@/lib/store/auth.store";
import { TitleStoreType, TitlePayloadType } from "@/types/Title.type";

const useTitleStore = create<TitleStoreType>((set) => ({
  titleGetLoading: false,
  titleUpdateLoading: false,
  titleCreateLoading: false,
  titleDeleteLoading: false,
  titles: [],

  handleTitleGet: async () => {
    try {
      set({ titleGetLoading: true });
      const response = await axiosInstance.get("/titles");
      set({ titles: response.data });
      toast.success("Posts fetched successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handlePostGet]: ", error);
    } finally {
      set({ titleGetLoading: false });
    }
  },
  handleTitleDelete: async () => {
    try {
      set({ titleDeleteLoading: true });
      //   const response =
      await axiosInstance.delete("/titles");
      //   set({ titles: response.data });
      toast.success("Posts fetched successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      error.response && error.response.data.message
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      console.error("[handlePostGet]: ", error);
    } finally {
      set({ titleDeleteLoading: false });
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

export default useTitleStore;
