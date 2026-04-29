/*
api.ts - server side - for automatically setting up the base url
*/

const BASE_URL = process.env.API_BASE_URL;

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const { headers, ...restOptions } = options;
    const url = `${BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...restOptions,
    });

    return response;
}