'use client'

/*
LoginForm component - client side
*/

import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/schemas/login.schema";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [serverError, setServerError] = useState("");
    const router = useRouter();
    const [pendingLogin, setPendingLogin] = useState(false);
    const { data: session } = useSession();
    const role = session?.user?.role;

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
        setServerError("");

        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if(result?.error) {
            setServerError("Invalid email or password");
            console.log(serverError);
        } else {
            setPendingLogin(true);
        }
    };

    useEffect(() => {
        if(pendingLogin && role) {
            if(role === 'employee') router.push('/employee');
            else if(role === 'admin') router.push('/admin');
        }
    }, [role, pendingLogin, router]);
    
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

            <label
            htmlFor="password"
            className="password-label
            text-sm flex w-fit py-2 label">
                Password
            </label>

            <div className="relative flex w-full mb-2 items-center">
                <LockKeyhole className="absolute left-2 text-auth-icon size-5
                md:left-4
                lg:left-6"
                />
                <input {...register("password")}
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                className="email-input
                bg-input-auth flex w-full p-3 pl-8 border-2 border-input-auth rounded-md placeholder-placeholder
                focus:outline-none focus:border-input-auth/50 focus:bg-input-auth/50
                md:pl-12
                lg:pl-14"
                />
            </div>
            {!errors.email && errors.password
                && <div className="text-red-500 text-sm w-full">
                        {errors.password.message}
                    </div>
            }
            {serverError
                &&  <div className="text-red-500 text-sm w-full">
                        {serverError}
                    </div>
                
            }

                <div className="flex w-full justify-end">
                    <Link href="/forgot"
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