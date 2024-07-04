export default interface FetchOptions
{
    formData?: FormData;
    json?: Record<string, unknown>;
    method?: string;
}