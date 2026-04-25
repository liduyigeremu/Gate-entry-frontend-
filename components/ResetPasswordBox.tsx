import ResetPasswordForm from "./ResetPasswordForm";
import { CircleUserRound } from "lucide-react";
import { Lock } from "lucide-react";


<Lock className="w-6 h-6 text-gray-500" />


const ResetPasswordBox = () => {
  return (
   
        <div className="resetpassword-box
      bg-white flex flex-col min-w-80 w-full h-fit p-5 items-center justify-center rounded-3xl
      shadow-[3px_3px_5px_-3px_rgba(0,0,0,0.5)] duration-200
      md:w-3/5 md:min-h-fit
      lg:w-full lg:max-w-150 lg:h-4/5 lg:rounded-l-none">

        <h1 className="login-text
        text-4xl font-medium py-3 justify-center">
          ResetPassword
        </h1>
<p className="text-sm mt-4 text-gray-500 ">
          Create a new secure entry key for digital vault.
        </p>
        <div className="profile-container
        flex py-5 justify-center">
         <div className="flex justify-center mb-4">
  <div className="bg-gray-200 flex w-16 h-16 items-center justify-center rounded-full">
    <Lock className="w-8 h-8 text-gray-400" />
  </div>
</div>
        </div>

        
        <ResetPasswordForm />

        {/* Cancel */}
        <p className="text-sm mt-4 text-gray-500 cursor-pointer hover:underline">
          Cancel and return to security dashboard
        </p>

      </div>
  );
};

export default ResetPasswordBox;