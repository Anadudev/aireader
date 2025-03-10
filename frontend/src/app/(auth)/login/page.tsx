import React from "react";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {

  return (
    <div>
      <div className="flex items-center justify-center  h-screen ">
        <div className="flex flex-1 my-auto max-w-4xl mx-auto gap-2 sm:bg-none py-12 px-4">
          <div className="flex-1 border rounded hidden sm:block sm:bg-gradient-to-br from-indigo-500 to-pink-500 opacity-5"></div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
