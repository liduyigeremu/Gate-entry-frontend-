/*
clientFetch - automatically adds access_token to header on fetch function by using the proxy
*/

import { assertResponseOk } from "@/lib/fetch-errors";
import { ClientFetchOptions } from "@/lib/fetch-types";

export async function clientFetch(
    endpoint: string,
    options: ClientFetchOptions = {}
): Promise<Response> {
    const { authRequired = true, headers: userHeaders, ...restOptions } = options;
    const proxyURL = `/api/proxy${endpoint}`;

    const mergedHeaders: Record<string, string> = {
        ...(userHeaders as Record<string, string> | undefined),
    };

    if(!authRequired) {
        mergedHeaders['x-auth-required'] = 'false'
    }
    
    const response = await fetch(proxyURL, {
        ...restOptions,
        headers: mergedHeaders,
    });

    await assertResponseOk(response);

    return response;
}