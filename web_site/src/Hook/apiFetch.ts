import { API_BACKEND_URL } from "../lib/config";

export async function apiFetch<T>(
url: string,
{ json, method }: {json?: Record<string, unknown>; method?: string } = {}
): Promise<T> {
    method ??= json ? "POST" : "GET";
    const body = json ? JSON.stringify(json) : undefined;
    const r = await fetch(API_BACKEND_URL + url, {
        method,
        credentials: "include",
        body,
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
    });

    if(r.ok) {
        return r.json() as Promise<T>;
    }
    const data = await r.json();
    throw new ApiError(r.status, data, data.message || 'Une erreur s\'est produite');
}

export class ApiError extends Error {
    constructor(public status: number, public data: Record<string, unknown>, public message: string)
    {
        super(message);
    }
}