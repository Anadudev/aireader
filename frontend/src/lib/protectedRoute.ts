"use client";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";

const ProtectedRoute = () => {
  const router = useRouter();
  const { authUserHandler } = useAuthStore();

  useEffect(() => {
    authUserHandler();
  }, [authUserHandler, router]);

  return null;
};

export default ProtectedRoute;
