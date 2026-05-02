/*
admin parent page - server side
*/

import { redirect } from "next/navigation";

const page = () => {
    redirect('/admin/dashboard');
}

export default page;