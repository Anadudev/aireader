"use client";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";

const ProtectedRoute = () => {
  const router = useRouter();
  const { authUserHandler, authUser } = useAuthStore();

  useEffect(() => {
    authUserHandler();

    if (!authUser) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUserHandler, router]);

  return null;
};

export default ProtectedRoute;
