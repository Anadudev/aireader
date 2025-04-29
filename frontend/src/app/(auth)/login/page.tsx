import React from "react";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex flex-1 my-auto max-w-4xl mx-auto gap-2 sm:bg-none py-12 px-4">
          <div className="flex-1 hidden sm:flex flex-col items-center justify-center border rounded-3xl sm:bg-gradient-to-br from-indigo-500 to-pink-500 bg-opacity-25 font-extrabold text-5xl bg-clip-text text-transparent">
            <h1>Welcome</h1>
            <h1>Back</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
