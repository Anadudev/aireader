"use client";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const share = async (shareData: any) => {
  try {
    await navigator.share(shareData);
    toast.success("Shared successfully");
  } catch (err) {
    toast.error(err.message);
	console.error("[share]: ", err);
  }
};

export default share;
