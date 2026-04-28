'use client'

/*
SignUpForm component - client side
*/

import { useForm } from "react-hook-form";
import { UserRound, LockKeyhole, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/schemas/signup.schema";
import SubmitBtn from "@/components/ui/SubmitBtn";

const SignUpForm = () => {
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
        
    }

    return (
        <form noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="login-form
        flex flex-col w-full py-2">

            <label
            htmlFor="fullname"
            className="name-label
            text-sm flex w-fit py-2 label">
                Full Name
            </label>

            <div className="relative flex w-full mb-2 items-center">
                <UserRound className="absolute left-2 text-auth-icon size-5
                md:left-4
                lg:left-6"/>
                <input {...register("fullname")}
                id="fullname"
                type="text"
                placeholder="Your full name"           
                className="email-input
                bg-input-auth flex w-full p-3 pl-8 border-2 border-input-auth rounded-md placeholder-placeholder
                focus:outline-none focus:border-input-auth/50 focus:bg-input-auth/50
                md:pl-12
                lg:pl-14"
                />
            </div>
            
            {errors.fullname
            && <div className="text-red-500 text-sm w-full">
                    {errors.fullname.message}
                </div>
                }

            <label
            htmlFor="email"
            className="email-label
            text-sm flex w-fit py-2 label">
                Email
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

            <div className="password-box
            flex flex-col w-full">

                <div className="flex w-full">

                    <label
                    htmlFor="password"
                    className="password-label
                    text-sm flex w-1/2 py-2 mr-2 label">
                        Password
                    </label>

                    <label 
                    htmlFor="confirmPassword"
                    className="confirm-password-label
                    text-sm flex w-1/2 py-2 ml-2 label">
                        Confirm Password
                    </label>

                </div>

                <div className="flex w-full">

                    <div className="flex flex-col w-1/2 mr-2">

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
                        
                        {errors.password
                        && <div className="text-red-500 text-sm w-full">
                                {errors.password.message}
                            </div>
                            }
                    </div>
                    
                    <div className="flex flex-col w-1/2 ml-2">
                    
                        <div className="relative flex w-full mb-2 items-center">
                            <LockKeyhole className="absolute left-2 text-auth-icon size-5
                            md:left-4
                            lg:left-6"
                            />
                            <input {...register("confirmPassword")}
                            id="confirmPassword"
                            type="password"
                            placeholder="Min. 8 characters"
                            className="email-input
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
                    </div>

                </div>

            </div>

            <div className="terms-policy
            text-sm flex w-full py-3 items-center">
                
                <input required
                id="TermsPolicy"
                type='checkbox'
                className='h-4 w-4 ml-0.5 rounded-md accent-accent
                hover:cursor-pointer'/>
                <label
                htmlFor="TermsPolicy"
                className='pl-2 hover:cursor-pointer'>
                    I agree to the <span className="text-accent font-bold">Terms of Service</span> and <span className="text-accent font-bold">Security Protocols</span>
                </label>

            </div>

            <SubmitBtn
            label={isSubmitting ? 'Creating Portal Account' : 'Create Portal Account'}
            isDisable={isSubmitting ? true : false}
            />
            
        </form>
    )
}

export default SignUpForm;