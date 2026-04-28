'use client'

/*
ForgotPasswordForm component - client side
*/

import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema, ForgotInput } from "@/schemas/forgot.schema";
import SubmitBtn from "@/components/ui/SubmitBtn";

const ForgotPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, 
    } = useForm<ForgotInput>({
        resolver: zodResolver(forgotSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit"
    });
    
    const onSubmit = async (data: ForgotInput) => {
        
    }
        
    return (
        <form noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="login-form
        flex flex-col w-full py-2">

            <label
            htmlFor="email"
            className="email-label
            text-sm flex w-fit py-2 label">
                Email Address
            </label>

            <div className="relative flex w-full mb-2 items-center">
                <Mail className="absolute left-2 text-auth-icon size-5
                md:left-4
                lg:left-6"
                />
                <input {...register("email")}
                id="email"
                type="email"
                placeholder="Your email address"
                className="email-input
                bg-input-auth flex w-full p-3 pl-8 border-2 border-input-auth rounded-md placeholder-placeholder
                focus:outline-none focus:border-input-auth/50 focus:bg-input-auth/50
                md:pl-12
                lg:pl-14"
                />
            </div>
            {errors.email
            && <div className="text-red-500 text-sm w-full">
                    {errors.email.message}
                </div>
                }

            <SubmitBtn
            label={isSubmitting ? 'Sending' : 'Send Reset Link'}
            isDisable={isSubmitting ? true : false}
            />

        </form>
    )
}

export default ForgotPasswordForm;
