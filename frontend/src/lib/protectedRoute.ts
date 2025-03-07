"use client";
import { useEffect } from "react";
import useAuthStore from "./store/auth.store";
import { useRouter } from "next/navigation";

export const ProtectedRoute = () => {
  const router = useRouter();
  const { access_token } = useAuthStore();
  useEffect(() => {}, [access_token]);
  if (!access_token) {
    router.push("/login");
  }
  return null;
};

export const PublicRoute = () => {
  const router = useRouter();
  const { access_token } = useAuthStore();
  useEffect(() => {}, [access_token]);
  if (access_token) {
    router.push("/dashboard");
  }
  return null;
};
