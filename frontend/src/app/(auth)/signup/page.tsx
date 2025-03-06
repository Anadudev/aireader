import SignupForm from "@/components/SignupForm";
import React from "react";

const SignupPage = () => {
  return (
    <div>
      <div className="">
        <div className="flex max-w-4xl mx-auto gap-2 sm:bg-none py-12 px-4">
          <div className="flex-1 border rounded hidden sm:block sm:bg-gradient-to-br from-indigo-500 to-pink-500 opacity-5"></div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
