import React from 'react'
import Image from 'next/image'

const LoginBox = () => {
  return (
    <div className='loginbox-container
    flex flex-col w-full h-fit'>
      <div className='login-text
      text-4xl font-medium flex w-full py-3 justify-center'>
        <h1>Login</h1>
      </div>

      <div className='profile-container
      flex w-full my-5 justify-center'>
        <div className='profile-icon bg-gray-200
        flex w-20 h-20 items-center justify-center rounded-full'>
            <Image src={'/profile-icon.svg'} alt='profile-icon' width={70} height={70} />
        </div>
      </div>

      <form className='login-form
      flex flex-col w-full py-2'>
        <div className='email-label
        font-medium flex w-full mb-3'>
            <label>Employee Email</label>
        </div>
        <div className='email-input
        flex w-full mb-3'>
            <input placeholder='email@cbe.com.et' type='email' required
             className='bg-gray-200 flex w-full py-3 px-4 rounded-md placeholder-gray-500
             focus:outline-none focus:bg-fuchsia-100'
            />
        </div>
        <div className='password-label
        font-medium flex w-full mb-3'>
            <label>Password</label>
        </div>
        <div className='password-input
        flex w-full mb-3'>
            <input placeholder='' type='password' required
            className='bg-gray-200 flex w-full py-3 px-4 rounded-md placeholder-gray-500
            focus:outline-none focus:bg-fuchsia-100'
            />
        </div>
        <div className='login-btn
        text-white font-bold flex w-full mt-8 mb-4'>
            <button type='submit'
            className='bg-fuchsia-800 flex w-full py-4 justify-center rounded-4xl shadow-md shadow-purple-300
            hover:opacity-70
            active:shadow-none'>
                Sign in
            </button>
        </div>
      </form>

      <div className='signin-option
      flex w-full justify-center'>
        Dont have an account? Register
      </div>
    </div>
  )
}

export default LoginBox
