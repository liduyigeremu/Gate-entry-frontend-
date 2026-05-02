/*
LoginBox component - server side
*/

import Link from "next/link";
import LoginForm from "./LoginForm";
import { CircleUserRound } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const LoginBox = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  if(session) {
    if(role === 'employee') {
      redirect('/employee');
    } else if(role === 'admin') {
      redirect('/admin');
    }
  }

  return (
    <div className="main-right-side
    flex w-full h-full p-5 items-center justify-center
    lg:w-1/2 lg:justify-start lg:pl-7">

      <div className="login-box
      bg-card text-muted flex flex-col min-w-80 w-full h-fit p-10 items-center justify-center rounded-3xl
      shadow-input duration-200
      md:w-3/5 md:min-h-fit
      lg:w-full lg:max-w-150 lg:h-4/5">

        <h1 className="login-text
        text-4xl font-medium py-3 justify-center">
          Login
        </h1>

        <div className="profile-container
        flex py-5 justify-center">
          <div className="profile-icon
          bg-input-auth flex size-14 items-center justify-center rounded-full">
              <CircleUserRound className="size-4/5 text-auth-icon stroke-1" />
          </div>
        </div>

        <LoginForm />

        <div className="signup-option
        text-sm flex justify-center">
          Dont have an account?
          <Link href="/signup"
          className="text-accent font-bold pl-1 cursor-pointer
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