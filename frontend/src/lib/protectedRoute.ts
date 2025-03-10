"use client";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ protect = true }) => {
  if (!protect) return null;
  const router = useRouter();
  const { authUser, authUserHandler } = useAuthStore();
  useEffect(() => {
    authUserHandler();
  }, [authUserHandler]);

  if (!authUser) {
    router.push("/login");
  } else {
    // todo: username should be dynamic
    router.push(`/user/${authUser?.username}`);
  }
  return null;
};
export default ProtectedRoute;
