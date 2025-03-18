"use client";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";
// todo: remove if not needed
const ProtectedRoute = () => {
  const router = useRouter();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser) {
      router.push("/");
    }
  }, [authUser, router]);

  return null;
};

export default ProtectedRoute;
