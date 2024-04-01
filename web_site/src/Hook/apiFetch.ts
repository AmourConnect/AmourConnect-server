import dotenv from 'dotenv';
dotenv.config();

export async function apiFetch<T> (
url: string,
{ json, method }: {json?: Record<string, unknown>; method?: string } = {}
): Promise<T> {
    console.log(process.env.IP_API_BACKEND + url);
    method ??= json ? "POST" : "GET";
    const body = json ? JSON.stringify(json) : undefined;
    const r = await fetch("http://192.168.1.21:5002/amourconnect/api/" + url, {
        method,
        credentials: "include",
        body,
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
    });

    console.log(await r.json());

    if(r.ok) {
        return r.json() as Promise<T>;
    }
    throw new ApiError(r.status, await r.json());
}

class ApiError extends Error {
    constructor(public status: number, public data: Record<string, unknown>)
    {
        super();
    }
}