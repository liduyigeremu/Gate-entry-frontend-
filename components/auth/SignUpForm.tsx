'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/schemas/signup.schema";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { useState } from "react";

const SignUpForm = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: "onTouched",
        reValidateMode: "onSubmit"
    });

    const onSubmit = async (data: SignupInput) => {
        setServerError(null);
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    full_name: data.fullname,
                    email: data.email,
                    password: data.password,
                    phone_number: data.phoneNumber,
                    employee_id: data.employeeId
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Registration failed");
            }

            setSuccess(true);
            console.log("User registered:", result);

        } catch (error: any) {
            setServerError(error.message);
        }
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full py-2"
        >

            {/* FULL NAME */}
            <label className="font-semibold text-sm py-2 tracking-wider">
                FULL NAME
            </label>
            <input
                {...register("fullname")}
                type="text"
                placeholder="Your full name"
                className="bg-gray-200 p-3 border-2 rounded-md"
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}

            {/* EMAIL */}
            <label className="font-semibold text-sm py-2 tracking-wider">
                EMAIL
            </label>
            <input
                {...register("email")}
                type="email"
                placeholder="Your email"
                className="bg-gray-200 p-3 border-2 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* PHONE NUMBER */}
            <label className="font-semibold text-sm py-2 tracking-wider">
                PHONE NUMBER
            </label>
            <input
                {...register("phoneNumber")}
                type="text"
                placeholder="+1234567890"
                className="bg-gray-200 p-3 border-2 rounded-md"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}

            {/* EMPLOYEE ID */}
            <label className="font-semibold text-sm py-2 tracking-wider">
                EMPLOYEE ID
            </label>
            <input
                {...register("employeeId")}
                type="text"
                placeholder="EMP001"
                className="bg-gray-200 p-3 border-2 rounded-md"
            />
            {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId.message}</p>}

            {/* PASSWORDS */}
            <div className="flex gap-3 mt-3">
                <div className="flex flex-col w-1/2">
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="bg-gray-200 p-3 border-2 rounded-md"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="flex flex-col w-1/2">
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="Confirm password"
                        className="bg-gray-200 p-3 border-2 rounded-md"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
            </div>

            {/* TERMS */}
            <div className="flex items-center py-4 text-sm">
                <input type="checkbox" required className="mr-2" />
                <span>I agree to Terms</span>
            </div>

            {/* SERVER ERROR */}
            {serverError && (
                <div className="text-red-600 text-sm mb-2">
                    {serverError}
                </div>
            )}

            {/* SUCCESS */}
            {success && (
                <div className="text-green-600 text-sm mb-2">
                    Account created successfully!
                </div>
            )}

            <SubmitBtn
                label={isSubmitting ? 'Creating Account...' : 'Create Account'}
                isDisable={isSubmitting}
            />
        </form>
    );
};

export default SignUpForm;
