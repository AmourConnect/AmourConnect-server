import { servicesTools } from "@/services/Tools";
import FetchOptions from "@/entities/FetchOptions";

export class apiClient
{
    public static async FetchData<T>(
        url: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const method = options.method ?? (options.formData ? "POST" : options.json ? "POST" : "GET");
        const body = options.formData ?? JSON.stringify(options.json);
        const headers: Record<string, string> = { accept: "application/json" };
        if (options.json) {
            headers["content-type"] = "application/json";
        }
        if (options.formData) {
            delete headers["content-type"];
        }
        const r = await fetch(servicesTools.Tools.API_BACKEND_URL + url, {
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
}
        
export class ApiError extends Error 
{
    constructor(public status: number, public data: Record<string, unknown>, public message: string) 
    {
        super(message);
    }
}