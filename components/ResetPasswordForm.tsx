'use client'

import { useForm } from "react-hook-form";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Lock, ShieldCheck } from "lucide-react";

type ResetInput = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetInput>();

  const password = watch("password");

  const onSubmit = async (data: ResetInput) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4"
    >

      {/* New Password */}
      <div>
        <label className="text-sm font-semibold">
          NEW PASSWORD
        </label>

        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
            })}
            type="password"
            placeholder="Enter new password"
            className="bg-gray-200 w-full p-3 pl-10 rounded-md"
          />
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="text-sm font-semibold">
          CONFIRM NEW PASSWORD
        </label>

        <div className="relative mt-1">
          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            placeholder="Re-enter password"
            className="bg-gray-200 w-full p-3 pl-10 rounded-md"
          />
        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Button */}
      <SubmitBtn
        label={isSubmitting ? "Updating..." : "Update Password"}
        isDisable={isSubmitting}
      />

    </form>
  );
};

export default ResetPasswordForm;