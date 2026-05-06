/*
route.ts - proxy for automatically adding access_token to a request
*/

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { apiFetch } from "@/lib/api";

async function proxyHandler(
    req: NextRequest,
    { params }: { params: { path: string[] } },
) {
    const authRequired = req.headers.get('x-auth-required') !== 'false';
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (authRequired && !token?.accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let endpointPath = params.path.join("/");

    if(!endpointPath.startsWith('/')) {
        endpointPath = '/' + endpointPath;
    }
    if(endpointPath.includes('..')) {
        return NextResponse.json({ error: "Invalid path"}, { status: 400 });
    }
    
    const searchParams = req.nextUrl.search;
    const fullEndpoint = `${endpointPath}${searchParams}`;

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    let body: BodyInit | undefined = undefined;
    if(hasBody) {
        const contentType = req.headers.get('Content-Type') || '';
        if(contentType.includes('application/json') || contentType.includes('text/')) {
            body = await req.text();
        } else {
            body = req.body ?? undefined;
        }
    }

    try {
        const forwardHeaders = new Headers(req.headers);
        forwardHeaders.delete('host');
        forwardHeaders.delete('connection');
        forwardHeaders.delete('x-auth-required');
        if(!forwardHeaders.has('Content-Type')) {
            forwardHeaders.set('Content-Type', 'application/json');
        }

        if(authRequired && token?.accessToken) {
            forwardHeaders.set('Authorization', `Bearer ${token.accessToken}`)
        }

        const backendRes = await apiFetch(fullEndpoint, {
            method: req.method,
            headers: Object.fromEntries(forwardHeaders),
            body,
        });

        const data = await backendRes.text();
        const responseHeaders = new Headers(backendRes.headers);

        return new NextResponse(data, {
            status: backendRes.status,
            headers: responseHeaders,
        });
    } catch (error) {
        console.error("Proxy Error:", error);

        return NextResponse.json(
            { error: "Internal Server Error"},
            { status: 500 },
        );
    }
}

export {
    proxyHandler as GET,
    proxyHandler as POST,
    proxyHandler as PUT,
    proxyHandler as PATCH,
    proxyHandler as DELETE,
};