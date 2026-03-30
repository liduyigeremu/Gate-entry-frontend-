'use client'
/*
LoginForm component - client side
*/

const LoginForm = () => {
  return (
    <form className="login-form
    flex flex-col w-full py-2">

        <div className="email-label
        font-bold flex w-fit py-2">
            <label>Employee Email</label>
        </div>

        <div className="email-input
        flex w-full">
            <input placeholder="Your email address" type="email" required
            className="bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100"
            />
        </div>

        <div className="password-label
        font-bold flex w-fit py-2">
            <label>Password</label>
        </div>

        <div className="password-input
        flex w-full mb-3">
            <input placeholder="Min. 8 characters" type="password" required
            className="bg-gray-200 flex w-full p-3 border-2 border-gray-200 rounded-md placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200 focus:bg-gray-100 focus:placeholder-transparent"
            />
        </div>

        <div className="login-btn
        text-white text-lg font-bold flex w-full py-4">
            <button type="submit"
            className="bg-primary flex w-full py-4 justify-center rounded-4xl shadow-md shadow-purple-300 duration-200
            hover:opacity-70 hover:cursor-pointer hover:duration-200
            active:shadow-none active:opacity-30">
                Sign in
            </button>
        </div>
        
    </form>
  )
}

export default LoginForm;
