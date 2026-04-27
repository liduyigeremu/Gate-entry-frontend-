'use client'

/*
LoginForm component - client side
*/

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/schemas/login.schema";
import SubmitBtn from "@/components/ui/SubmitBtn";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, 
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit"
    });

    const onSubmit = async (data: LoginInput) => {
        
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
                Employee Email
            </label>

            <input {...register("email")}
            id="email"
            type="email"
            placeholder="Your email address"
            className="email-input
            bg-input-auth flex w-full p-3 mb-2 border-2 border-input-auth rounded-md placeholder-placeholder
            focus:outline-none focus:border-input-auth/50 focus:bg-input-auth/50"
            />
            {errors.email
            && <div className="text-red-500 text-sm w-full">
                    {errors.email.message}
                </div>
                }

            <label
            htmlFor="password"
            className="password-label
            text-sm flex w-fit py-2 label">
                Password
            </label>

            <input {...register("password")}
            id="password"
            type="password"
            placeholder="Min. 8 characters"
            className="password-input
            bg-input-auth flex w-full p-3 mb-2 border-2 border-input-auth rounded-md placeholder-placeholder
            focus:outline-none focus:border-input-focus focus:bg-gray-100"
            />
            {!errors.email && errors.password
                && <div className="text-red-500 text-sm w-full">
                        {errors.password.message}
                    </div>
            }

                <div className="flex w-full justify-end">
                    <Link href="/"
                    className="text-accent text-sm font-bold pl-1 cursor-pointer
                    hover:underline
                    active:opacity-50"
                    >Forgot Password?</Link>
                </div>

            <SubmitBtn
            label={isSubmitting ? 'Loging in' : 'Log in'}
            isDisable={isSubmitting ? true : false}
            />
            
        </form>
    )
}

export default LoginForm;