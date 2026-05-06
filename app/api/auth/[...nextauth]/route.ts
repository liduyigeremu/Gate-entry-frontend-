/*
NextAuth
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { apiFetch } from "@/lib/api";

declare module 'next-auth' {
    interface Session {
        user: {
            userId?: string;
            role?: string;
            email?: string;
            fullName?: string;
            employeeId?: string;
            error?: string;
        },
        
    }
    interface User {
        userId?: string;
        role?: string;
        email?: string;
        fullName?: string;
        employeeId?: string;
        accessToken?: string;
        refreshToken?: string;
        expireIn: number;
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        userId?: string;
        role?: string;
        email?: string;
        fullName?: string;
        employeeId?: string;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: string;
    }
}

async function refreshAccessToken (token: JWT):Promise<JWT> {
    try {
        const response = await apiFetch('/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh_token: token.refreshToken,
            }),
        });

        const refreshedToken = await response.json();

        if(!response.ok || !refreshedToken?.success || !refreshedToken?.data) {
            throw new Error(refreshedToken?.message || "RefreshFailed");
        }

        const { 
            data: {
                access_token: newAccessToken,
                expires_at: newExpireIn,
                refresh_token: newRefreshToken,
            }
        } = refreshedToken;

        return {
            ...token,
            accessToken: newAccessToken,
            accessTokenExpires: Date.now() + (newExpireIn * 1000),
            refreshToken: newRefreshToken,
            error: undefined,
        }
    } catch(error) {
        console.error("Error refreshing access token:", error);
        delete token.accessToken;
        delete token.refreshToken;
        delete token.accessTokenExpires;
        return {
            ...token,
            error: "RefreshedAccessTokenError",
        }
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password'},
            },
            async authorize(credentials) {
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
                    const {
                        data: {
                            access_token: accessToken,
                            expires_at: expireIn,
                            refresh_token: refreshToken,
                            user: {
                                email: email,
                                employee_id: employeeId,
                                full_name: fullName,
                                id: userId,
                                role: role,
                            },
                        },
                    } = responseData;
                    
                    return {
                        id: userId,
                        name: fullName,
                        email: email,

                        userId: userId,
                        fullName: fullName,
                        role: role,
                        employeeId: employeeId,
                        accessToken: accessToken,
                        expireIn: expireIn,
                        refreshToken: refreshToken,
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
                token.userId = user.id;
                token.role = user.role;
                token.email = user.email;
                token.fullName = user.fullName;
                token.employeeId = user.employeeId;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpires = Date.now() + (user.expireIn * 1000);
                token.error = undefined;

                return token;
            }

            if(Date.now() < (token.accessTokenExpires ?? 0)) {
                return token;
            }

            token.error = "AccessTokenExpired";
            console.log(token.error, "refreshing...");

            if(token.refreshToken) {
                return refreshAccessToken(token);
            }

            token.error = "RefreshTokenNotFound";
            console.log(token.error);
            delete token.accessToken;
            delete token.accessTokenExpires;

            return token;
        },

        async session ({ session, token }) {
            session.user.userId = token.userId;
            session.user.role = token.role;
            session.user.email = token.email;
            session.user.fullName = token.fullName;
            session.user.employeeId = token.employeeId;
            session.user.error = token.error;

            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };