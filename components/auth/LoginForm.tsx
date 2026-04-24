'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/schemas/login.schema";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();
    
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
        setServerError(null);

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            });

            const result = await response.json();
            
            // Log the full response to see what your backend returns
            console.log("Full server response:", result);
            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            // Check what fields are actually in the response
            console.log("Available fields in response:", Object.keys(result));
            
            // Check your actual response structure
            if (result.token) {
                console.log("Token found:", result.token.substring(0, 20) + "...");
            } else if (result.access_token) {
                console.log("Access token found:", result.access_token.substring(0, 20) + "...");
            } else if (result.data?.token) {
                console.log("Nested token found:", result.data.token);
            }
            
            if (result.user) {
                console.log("User object found:", result.user);
            } else if (result.data?.user) {
                console.log("Nested user found:", result.data.user);
            }

            // Store the token - adjust based on your actual response structure
            // Try different possible response structures
            const token = result.token || result.access_token || result.data?.token;
            const user = result.user || result.data?.user;
            
            if (!token || !user) {
                console.error("Response structure doesn't match expected format:", result);
                throw new Error(`Invalid response from server. Expected token and user, got: ${Object.keys(result).join(', ')}`);
            }

            // Store the data
            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));
            
            console.log("Login successful! Redirecting to devices page...");
            
            // Redirect to devices page
            router.push("/devices");
            
        } catch (error: any) {
            setServerError(error.message);
            console.error("Login error details:", error);
        }
    }

    return (
        <form 
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="login-form flex flex-col w-full py-2"
        >
            {serverError && (
                <div className="text-red-600 text-sm mb-4 text-center">
                    {serverError}
                </div>
            )}

            <label htmlFor="email" className="font-semibold text-sm flex w-fit py-2 tracking-wider">
                EMPLOYEE EMAIL
            </label>
            <input 
                {...register("email")}
                id="email"
                type="email"
                placeholder="Your email address"
                className="bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500 focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />
            {errors.email && (
                <div className="text-red-500 text-sm w-full">
                    {errors.email.message}
                </div>
            )}

            <label htmlFor="password" className="font-semibold text-sm flex w-fit py-2 tracking-wider">
                PASSWORD
            </label>
            <input 
                {...register("password")}
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                className="bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500 focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />
            {!errors.email && errors.password && (
                <div className="text-red-500 text-sm w-full">
                    {errors.password.message}
                </div>
            )}

            <SubmitBtn
                label={isSubmitting ? 'Signing in...' : 'Sign in'}
                isDisable={isSubmitting}
            />
        </form>
    )
}

export default LoginForm;