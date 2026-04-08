'use client'

/*
LoginForm component - client side
*/

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
            font-semibold text-sm flex w-fit py-2 tracking-wider">
                EMPLOYEE EMAIL
            </label>

            <input {...register("email")}
            id="email"
            type="email"
            placeholder="Your email address"
            className="email-input
            bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />
            {errors.email
            && <div className="text-red-500 text-sm w-full">
                    {errors.email.message}
                </div>
                }

            <label
            htmlFor="password"
            className="password-label
            font-semibold text-sm flex w-fit py-2 tracking-wider">
                PASSWORD
            </label>

            <input {...register("password")}
            id="password"
            type="password"
            placeholder="Min. 8 characters"
            className="password-input
            bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />
            {!errors.email && errors.password
                && <div className="text-red-500 text-sm w-full">
                        {errors.password.message}
                    </div>
            }

            <SubmitBtn
            label={isSubmitting ? 'Signing in' : 'Sign in'}
            isDisable={isSubmitting ? true : false}
            />
            
        </form>
    )
}

export default LoginForm;