import { useEffect, useRef, useState } from "react";
export function usePollingFetch(fetchFn, { maxRetries = 5, interval = 3000, skip = false, validateData } = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const retryRef = useRef(null);
    useEffect(() => {
        if (skip)
            return;
        let isCancelled = false;
        const attemptFetch = async (attempt) => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchFn();
                console.log("result", result);
                console.log("result.completed", result.completed);
                console.log("result.data", result.data);
                if (!isCancelled) {
                    // Check if we have valid data
                    let hasValidData = false;
                    if (result.data !== null && result.data !== undefined) {
                        if (validateData) {
                            // Use custom validation function
                            hasValidData = validateData(result.data);
                        }
                        else {
                            // Default validation for backward compatibility
                            hasValidData = typeof result.data === 'object' && Array.isArray(result.data) && result.data.length > 0;
                        }
                    }
                    // Continue polling if:
                    // 1. We don't have valid data yet (regardless of completed status)
                    // 2. We haven't exceeded max retries
                    const shouldContinuePolling = !hasValidData && attempt < maxRetries;
                    if (shouldContinuePolling) {
                        setRetryCount(attempt);
                        retryRef.current = setTimeout(() => attemptFetch(attempt + 1), interval);
                    }
                    else {
                        // Stop polling - either we have valid data or we've exceeded max retries
                        setData(result.data);
                        setLoading(false);
                        setRetryCount(0);
                        // If we stopped due to max retries without valid data, set an error
                        if (!hasValidData && attempt >= maxRetries) {
                            console.warn("Polling stopped due to max retries without valid data");
                            // Uncomment if you want to show an error message
                            // setError("Failed to fetch complete data after several retries.");
                        }
                    }
                }
            }
            catch (err) {
                console.error(`Fetch attempt ${attempt} failed`, err);
                if (!isCancelled && attempt < maxRetries) {
                    setRetryCount(attempt);
                    retryRef.current = setTimeout(() => attemptFetch(attempt + 1), interval);
                }
                else if (!isCancelled) {
                    setError("Fetch failed after several retries.");
                    setLoading(false);
                }
            }
        };
        attemptFetch(1);
        return () => {
            isCancelled = true;
            if (retryRef.current)
                clearTimeout(retryRef.current);
        };
    }, [fetchFn, maxRetries, interval, skip, validateData]);
    return { data, loading, error, retryCount };
}
