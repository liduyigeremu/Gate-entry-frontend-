'use client'

/*
ResetPasswordForm component - client side
*/

import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema, ResetInput } from "@/schemas/reset.schema";
import SubmitBtn from "@/components/ui/SubmitBtn";

const ResetPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, 
    } = useForm<ResetInput>({
        resolver: zodResolver(resetSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit"
    });
        
    const onSubmit = async (data: ResetInput) => {
        
    }
    return (
        <form noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="login-form
        flex flex-col w-full py-2">

            <label
            htmlFor="password"
            className="password-label
            text-sm flex w-fit py-2 label">
                New Password
            </label>

            <div className="relative flex w-full mb-2 items-center">
                <LockKeyhole className="absolute left-2 text-auth-icon size-5
                md:left-4
                lg:left-6"
                />
                <input {...register("password")}
                id="password"
                type="password"
                placeholder="Your email address"
                className="password-input
                bg-input-auth flex w-full p-3 pl-8 border-2 border-input-auth rounded-md placeholder-placeholder
                focus:outline-none focus:border-input-auth/50 focus:bg-input-auth/50
                md:pl-12
                lg:pl-14"
                />
            </div>
            {errors.password
            && <div className="text-red-500 text-sm w-full">
                    {errors.password.message}
                </div>
            }

            <label
            htmlFor="confirmPassword"
            className="confirmPassword-label
            text-sm flex w-fit py-2 label">
                Confrim New Password
            </label>

            <div className="relative flex w-full mb-2 items-center">
                <LockKeyhole className="absolute left-2 text-auth-icon size-5
                md:left-4
                lg:left-6"
                />
                <input {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="Your email address"
                className="confirmPassword-input
                bg-input-auth flex w-full p-3 pl-8 border-2 border-input-auth rounded-md placeholder-placeholder
                focus:outline-none focus:border-input-auth/50 focus:bg-input-auth/50
                md:pl-12
                lg:pl-14"
                />
            </div>
            {!errors.password && errors.confirmPassword
            && <div className="text-red-500 text-sm w-full">
                    {errors.confirmPassword.message}
                </div>
            }

            <SubmitBtn
            label={isSubmitting ? 'Updating Password' : 'Update Password'}
            isDisable={isSubmitting ? true : false}
            />

        </form>
    )
}

export default ResetPasswordForm;
