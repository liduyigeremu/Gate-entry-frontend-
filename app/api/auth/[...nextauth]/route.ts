/*
NextAuth
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { apiFetch } from "@/lib/api";

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        email?: string;
        role: string;
    }
    interface User {
        accessToken?: string;
        email?: string;
        role: string;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
        email?: string;
        role: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password'},
            },
            async authorize(credentials) {
                console.log('Login attempt...');

                const response = await apiFetch('/auth/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password:credentials?.password,
                        }),
                    });

                const responseData = await response.json();

                if(response.ok && responseData?.success && responseData?.data) {
                    const { token, user } = responseData.data;

                    return {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        accessToken: token,
                    }
                }
                return null;
            }
        })
    ],

    pages: {
        signIn: '/login'
    },

    callbacks: {
        async jwt ({ token, user }) {
            if(user) {
                token.accessToken = user.accessToken;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },

        async session ({ session, token }) {
            session.accessToken = token.accessToken;
            session.email = token.email;
            session.role = token.role;
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };