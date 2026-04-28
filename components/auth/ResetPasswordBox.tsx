/*
ResetPasswordBox component - server side
*/

import Link from "next/link";
import { LockKeyhole, RotateCcw } from "lucide-react";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordBox = () => {
  return (
    <div className="main-right-side
    flex w-full h-full p-5 items-center justify-center
    lg:w-1/2 lg:justify-start lg:pl-7">

      <div className="login-box
      bg-card text-muted flex flex-col min-w-80 w-full h-fit p-10 items-center justify-center rounded-3xl
      shadow-input duration-200
      md:w-3/5 md:min-h-fit
      lg:w-full lg:max-w-150 lg:h-4/5">

        <div className="profile-container
        flex py-5 justify-center">
          <div className="profile-icon
          bg-input-auth relative flex size-14 items-center justify-center rounded-full">
              <RotateCcw className="size-4/5 text-auth-icon stroke-1" />
              <LockKeyhole className="absolute size-5 text-auth-icon stroke-2" />
          </div>
        </div>

        <h1 className="login-text
        text-4xl font-medium py-3 justify-center">
          Reset Password
        </h1>

        <p className="text-center text-sm flex flex-wrap w-full p-2 justify-center">
          Create a new secure entry key for your digital vault
        </p>

        <ResetPasswordForm />

        <Link href="/login"
          className="text-accent text-sm font-bold flex cursor-pointer
          hover:underline
          active:opacity-50">
            Cancel and return to security dashboard
          </Link>

      </div>

    </div>
  );
};

export default ResetPasswordBox;