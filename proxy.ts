/*
proxy.ts - protect all pages from unauthorized access
*/

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function proxy(req) {
        const token = req.nextauth.token;

        const userRole = token?.role as string | undefined;
        const { pathname } = req.nextUrl;

        if(!userRole) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        if(pathname.startsWith('/admin') && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        if(pathname.startsWith('/employee') && userRole !== 'employee') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        return NextResponse.next();
    },
    {
        secret: process.env.NEXTAUTH_SECRET,

        pages: {
            signIn: "/login",
        },

        callbacks: {
            authorized({ token }) {
                if (!token || token.error) return false;
                return true;
            }
        },
    }
)

export const config = {
    matcher: [
        '/admin/:path*',
        '/employee/:path*',
    ],
};