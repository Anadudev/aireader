"use client";
import { useEffect } from "react";
import useAuthStore from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ protect = true }) => {
  const router = useRouter();
  const { authUser, authUserHandler } = useAuthStore();
  useEffect(() => {
    authUserHandler();
  }, [authUserHandler]);

  if (!protect) return null;

  if (!authUser) {
    router.push("/");
  } else {
    // todo: username should be dynamic
    router.push(`/user/${authUser?.username}`);
  }
  return null;
};
export default ProtectedRoute;
