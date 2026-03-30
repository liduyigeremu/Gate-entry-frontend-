/*
Login Page - server side
*/

import LoginBox from '@/components/LoginBox';
import SideInfoBox from '@/components/SideInfoBox';

const page = () => {
  return (
    <div className='bg-primary-bg
    flex w-full h-screen items-center justify-center'>
      <SideInfoBox />
      <LoginBox />
    </div>
  )
}

export default page;