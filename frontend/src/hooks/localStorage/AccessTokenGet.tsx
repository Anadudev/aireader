"use client";
import useAuthStore from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AccessTokenGet = () => {
  const router = useRouter();
  const { setAccessToken, setAuthUser } = useAuthStore();

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    const authUser = window.localStorage.getItem("authUser");
    if (token && authUser) {
      setAuthUser(JSON.parse(authUser));
    } else {
      router.push("/");
    }
    if (!token) return;
    setAccessToken(token);
  }, [setAccessToken, setAuthUser, router]);

  return null;
};

export default AccessTokenGet;
