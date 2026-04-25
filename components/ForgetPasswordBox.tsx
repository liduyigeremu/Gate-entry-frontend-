'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import SubmitBtn from "@/components/ui/SubmitBtn";

const ForgotPasswordBox = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Later here you can call your API for sending reset email

    router.push("/resetpassword");
  };

  return (
    <div
      className="forgetpassword-box
      bg-white flex flex-col min-w-80 w-full h-fit p-5 items-center justify-center rounded-3xl
      shadow-[3px_3px_5px_-3px_rgba(0,0,0,0.5)] duration-200
      md:w-3/5 md:min-h-fit
      lg:w-full lg:max-w-150 lg:h-4/5 lg:rounded-l-none"
    >
      {/* Top Lock Icon */}
      <div className="profile-container flex py-5 justify-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 flex w-16 h-16 items-center justify-center rounded-full">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1
        className="login-text
        text-4xl font-medium py-3 text-center"
      >
        Forgot Password
      </h1>

      {/* Description */}
      <p className="text-center text-gray-500 text-sm mb-6">
        Enter your registered email address and we&apos;ll send you secure
        instructions to reset your credentials.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4"
      >
        {/* Email Label */}
        <label className="text-sm font-semibold">
          EMAIL ADDRESS
        </label>

        {/* Input with Icon */}
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="email"
            placeholder="name@vault.com"
            className="bg-gray-200 w-full p-3 pl-10 rounded-md
            focus:outline-none focus:bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <SubmitBtn
          label="Send Reset Link"
          isDisable={false}
        />
      </form>

      {/* Back to Login */}
      <div className="text-center mt-6">
        <Link
          href="/login"
          className="text-sm text-gray-500 cursor-pointer hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordBox;