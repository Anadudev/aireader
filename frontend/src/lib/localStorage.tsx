"use client";
export const accessTokenLocalStorage = localStorage.getItem("access_token");
export const removeItem = (key: string) => localStorage.removeItem(key);
