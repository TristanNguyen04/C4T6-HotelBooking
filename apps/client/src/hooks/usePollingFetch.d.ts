interface UsePollingFetchOptions<T> {
    maxRetries?: number;
    interval?: number;
    skip?: boolean;
    validateData?: (data: T) => boolean;
}
interface UsePollingFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    retryCount: number;
}
interface PollingResponse<T> {
    data: T;
    completed: boolean;
}
export declare function usePollingFetch<T>(fetchFn: () => Promise<PollingResponse<T>>, { maxRetries, interval, skip, validateData }?: UsePollingFetchOptions<T>): UsePollingFetchResult<T>;
export {};
