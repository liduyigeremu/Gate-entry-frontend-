/*
NextAuth
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        email?: string;
    }
    interface User {
        accessToken?: string;
        email?: string;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
        email?: string;
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

                const response = await fetch('',
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

                const user = await response.json();

                if(response.ok && user) {
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        accessToken: user.accessToken,
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
            }
            return token;
        },

        async session ({ session, token }) {
            session.accessToken = token.accessToken;
            session.email = token.email;
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };