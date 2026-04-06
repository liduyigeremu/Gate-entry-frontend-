'use client'

/*
LoginForm component - client side
*/

const LoginForm = () => {

    return (
        <form
        className="login-form
        flex flex-col w-full py-2">

            <label
            htmlFor="Email"
            className="email-label
            font-semibold text-sm flex w-fit py-2 tracking-wider">
                EMPLOYEE EMAIL
            </label>

            <input required
            id="Email"
            placeholder="Your email address"
            type="email"
            name="email"
            className="email-input
            bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />

            <label
            htmlFor="Password"
            className="password-label
            font-semibold text-sm flex w-fit py-2 tracking-wider">
                PASSWORD
            </label>

            <input required
            id="Password"
            placeholder="Min. 8 characters"
            type="password"
            name="password"
            className="password-input
            bg-gray-200 flex w-full p-3 mb-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />

            <button type="submit"
            className="login-btn
            text-white text-lg font-bold bg-primary flex w-full py-4 my-4 justify-center rounded-4xl shadow-md shadow-primary/50 duration-200
            hover:opacity-70 hover:cursor-pointer hover:duration-200
            active:shadow-none active:opacity-30">
                Sign in
            </button>
            
        </form>
    )
}

export default LoginForm;