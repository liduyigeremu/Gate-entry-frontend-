/*
employee parent page - server side
*/

import { redirect } from "next/navigation";

const page = () => {
    redirect('/employee/devices');
}

export default page;