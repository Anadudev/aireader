import React from "react";
import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <div>
      <div className="">
        <div className="flex max-w-5xl mx-auto gap-2 sm:bg-none py-12 px-4">
          <div className="flex-1 hidden sm:flex flex-col items-center justify-center border rounded-3xl sm:bg-gradient-to-br from-indigo-500 to-pink-500 bg-opacity-25 font-extrabold text-5xl bg-clip-text text-transparent capitalize text-center space-y-4">
            <h1>Create an account</h1>
            <h1>to continue</h1>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
