import Link from "next/link";

export default function Home() {
  return (
    <div>

      <label className="font-bold">auth pages</label><br />
      <Link href={'/login'}>
        login
      </Link><br />
      <Link href={'/signup'}>
        signup
      </Link><br />
      <Link href={'/forgot'}>
        forgot
      </Link><br />
      <Link href={'/reset'}>
        reset
      </Link><br />

      <label className="font-bold">employee pages</label><br />
      <Link href={'/devices'}>
        devices
      </Link><br />
      <Link href={'/profile'}>
        profile
      </Link><br />
      <Link href={'/status'}>
        status
      </Link><br />

      <label className="font-bold">admin pages</label><br />
      <Link href={'/guard-management'}>
        guard-management
      </Link><br />
 
    </div>
  );
}
