"use client";
import useAuthStore from "@/lib/store/auth.store";
import { useEffect } from "react";

const AccessTokenGet = () => {
  const { setAccessToken, setAuthUser } = useAuthStore();

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    const authUser = window.localStorage.getItem("authUser");
    if (token && authUser) {
      setAuthUser(JSON.parse(authUser));
    }
    if (!token) return;
    setAccessToken(token);
  }, [setAccessToken, setAuthUser]);

  return null;
};

export default AccessTokenGet;
