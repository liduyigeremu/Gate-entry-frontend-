import Link from "next/link";

export default function Home() {
  return (
    <div >
      <Link href={'/login'}>
        Log in
      </Link>
      <br></br>
      <Link href={'/signup'}>
        Sign Up
      </Link>
      <br></br>
      <Link href={'/Forget'}>
        Go Forget
      </Link>
      <br></br>
      <Link href={'/Reset'}>
        Go Reset
      </Link>
      <br></br>
      <Link href={'/devices'}>
        Go Dashboard
      </Link>
       <br></br>
      <Link href={'/profile'}>
        Go profile
      </Link>
       <br></br>
      <Link href={'/status'}>
        Device status
      </Link>
       <br></br>
        <Link href={'/GuardManagement'}>
        Guard Management
      </Link>
       <br></br>
 
    </div>
  );
}
