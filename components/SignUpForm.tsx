'use client'

/*
SignUpForm component - client side
*/

const SignUpForm = () => {

    return (
        <form
        className="login-form
        flex flex-col w-full py-2">

            <label
            htmlFor="Fullname"
            className="name-label
            font-semibold text-sm flex w-fit py-2 tracking-wider">
                FULL NAME
            </label>

            <input required
            id="Fullname"
            placeholder="Your full name"
            type="text"
            name="fullname"
            className="name-input
            bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />

            <label
            htmlFor="Email"
            className="email-label
            font-semibold text-sm flex w-fit py-2 tracking-wider">
                EMAIL
            </label>

            <input required
            id="Email"
            placeholder="Your email address"
            type="email"
            name="email"
            className="email-input
            bg-gray-200 flex w-full p-3 mb-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />

            <div className="password-box
            flex flex-col w-full">

                <div className="flex w-full">

                    <label
                    htmlFor="Password"
                    className="password-label
                    font-semibold text-sm flex w-1/2 pr-3 tracking-wide">
                        PASSWORD
                    </label>

                    <label 
                    htmlFor="ConfirmPassword"
                    className="confirm-password-label
                    font-semibold text-sm flex w-1/2 pl-3 tracking-wide">
                        CONFIRM PASSWORD
                    </label>

                </div>

                <div className="flex w-full">

                    <input required
                    id="Password"
                    placeholder="Min. 8 characters"
                    type="password"
                    name="password"
                    className="password-input
                    bg-gray-200 flex w-1/2 p-3 mr-3 border-2 border-gray-200 rounded-md placeholder-gray-500
                    focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
                    />

                    <input required
                    id="ConfirmPassword"
                    placeholder="Min. 8 characters"
                    type="password"
                    className="confirm-password-input
                    bg-gray-200 flex w-1/2 p-3 ml-3 border-2 border-gray-200 rounded-md placeholder-gray-500
                    focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
                    />
    
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

            <button type="submit"
            className="text-white text-lg font-bold bg-primary flex w-full py-4 my-4 justify-center
            rounded-4xl shadow-md shadow-primary/50 duration-200
            hover:opacity-70 hover:cursor-pointer hover:duration-200
            active:shadow-none active:opacity-30">
                Create Portal Account
            </button>
            
        </form>
    )
}

export default SignUpForm;
