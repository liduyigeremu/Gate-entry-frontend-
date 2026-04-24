/*
LoginBox component - server side
*/
import Link from "next/link";
import LoginForm from "./LoginForm";
import { CircleUserRound } from "lucide-react";

const LoginBox = () => {
  return (
    <div className="main-right-side
    flex w-full h-full p-5 items-center justify-center
    lg:w-1/2 lg:pl-0 lg:justify-start">

      <div className="login-box
      bg-white flex flex-col min-w-80 w-full h-fit p-5 items-center justify-center rounded-3xl
      shadow-[3px_3px_5px_-3px_rgba(0,0,0,0.5)] duration-200
      md:w-3/5 md:min-h-fit
      lg:w-full lg:max-w-150 lg:h-4/5 lg:rounded-l-none">

        <h1 className="login-text
        text-4xl font-medium py-3 justify-center">
          Login
        </h1>

        <div className="profile-container
        flex py-5 justify-center">
          <div className="profile-icon
          bg-gray-200 flex w-18 h-18 items-center justify-center rounded-full">
              <CircleUserRound className="size-4/5 text-gray-400 stroke-1" />
          </div>
        </div>

        <LoginForm />

        <div className="signup-option
        flex justify-center">
          Dont have an account?
          <Link href="/signup"
          className="text-primary font-bold pl-1 cursor-pointer
          hover:underline
          active:opacity-50">
            Register
          </Link>
        </div>

      </div>

    </div>
  )
}

export default LoginBox;
