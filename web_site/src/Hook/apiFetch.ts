import { API_BACKEND_URL } from "../utils/config";

export async function apiFetch<T>(
    url: string,
    { formData, json, method }: { formData?: FormData; json?: Record<string, unknown>; method?: string } = {}
): Promise<T> {
    method ??= formData ? "POST" : json ? "POST" : "GET";
    const body = formData ?? JSON.stringify(json);
    const headers: Record<string, string> = { accept: "application/json" };
    if (json) {
        headers["content-type"] = "application/json";
    }
    if (formData) {
        delete headers["content-type"];
    }
    const r = await fetch(API_BACKEND_URL + url, {
        method,
        credentials: "include",
        body,
        headers,
    });

    if (r.ok) {
        return r.json() as Promise<T>;
    }
    const data = await r.json();
    throw new ApiError(r.status, data, data.message || 'Une erreur s\'est produite');
}

export class ApiError extends Error {
    constructor(public status: number, public data: Record<string, unknown>, public message: string) {
        super(message);
    }
}