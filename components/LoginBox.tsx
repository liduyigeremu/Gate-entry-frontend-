/*
LoginBox component - server side
*/

import Image from "next/image";
import LoginForm from "./LoginForm";

const LoginBox = () => {
  return (
    <div className="main-right-side
    text-gray-600 flex w-full h-full p-5 items-center justify-center
    lg:w-1/2 lg:pl-0 lg:justify-start">

      <div className="login-box
      bg-white flex flex-col w-full h-fit p-5 items-center justify-center rounded-3xl
      shadow-[3px_3px_5px_-3px_rgba(0,0,0,0.5)] duration-200
      md:w-3/5 md:min-h-fit
      lg:w-full lg:max-w-150 lg:h-4/5 lg:rounded-l-none">

          <div className="login-text
          text-4xl font-medium py-3 justify-center">
            <h1>Login</h1>
          </div>

          <div className="profile-container
          flex py-5 justify-center">
            <div className="profile-icon
            bg-gray-200 flex w-18 h-18 items-center justify-center rounded-full">
                <Image src={'/profile-icon.svg'} alt="profile-icon" width={50} height={50} />
            </div>
          </div>

          <LoginForm />

          <div className="signin-option
          flex justify-center">
            Dont have an account? <p className="text-primary font-bold pl-1 cursor-pointer hover:underline">Register</p>
          </div>

      </div>

    </div>
  )
}

export default LoginBox;
