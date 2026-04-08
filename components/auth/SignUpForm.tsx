'use client'

/*
SignUpForm component - client side
*/

import { useForm } from "react-hook-form";
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
            font-semibold text-sm flex w-fit py-2 tracking-wider">
                FULL NAME
            </label>

            <input {...register("fullname")}
            id="fullname"
            type="text"
            placeholder="Your full name"           
            className="name-input
            bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />
            {errors.fullname
            && <div className="text-red-500 text-sm w-full">
                    {errors.fullname.message}
                </div>
                }

            <label
            htmlFor="email"
            className="email-label
            font-semibold text-sm flex w-fit py-2 tracking-wider">
                EMAIL
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

            <div className="password-box
            flex flex-col w-full mt-3">

                <div className="flex w-full">

                    <label
                    htmlFor="password"
                    className="password-label
                    font-semibold text-sm flex w-1/2 pr-3 tracking-wide">
                        PASSWORD
                    </label>

                    <label 
                    htmlFor="confirmPassword"
                    className="confirm-password-label
                    font-semibold text-sm flex w-1/2 pl-3 tracking-wide">
                        CONFIRM PASSWORD
                    </label>

                </div>

                <div className="flex w-full">

                    <div className="flex flex-col w-1/2 mr-3">
                        <input {...register("password")}
                        id="password"
                        type="password"
                        placeholder="Min. 8 characters"
                        className="password-input
                        bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500
                        focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
                        />
                        {errors.password
                        && <div className="text-red-500 text-sm w-full">
                                {errors.password.message}
                            </div>
                            }
                    </div>
                    
                    <div className="flex flex-col w-1/2 mr-3">
                        <input {...register("confirmPassword")}
                        id="confirmPassword"
                        type="password"
                        placeholder="Min. 8 characters"
                        className="confirm-password-input
                        bg-gray-200 flex w-full p-3  border-2 border-gray-200 rounded-md placeholder-gray-500
                        focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
                        />
                        {!errors.password && errors.confirmPassword
                            && <div className="text-red-500 text-sm w-full">
                                    {errors.confirmPassword.message}
                                </div>
                        }
                    </div>

                </div>

            </div>

            <div className="terms-policy
            text-sm flex w-full py-4 items-center">
                
                <input required
                id="TermsPolicy"
                type='checkbox'
                className='h-4 w-4 rounded-md border-gray-400 border accent-primary
                hover:cursor-pointer'/>
                <label
                htmlFor="TermsPolicy"
                className='pl-2 hover:cursor-pointer'>
                    I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Security Protocols</span>
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