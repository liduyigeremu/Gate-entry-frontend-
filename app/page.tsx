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
      <Link href={'/devices'}>
        Go Dashboard
      </Link>
       <br></br>
      <Link href={'/profile'}>
        Go profile
      </Link>
    </div>
  );
}
