import { useEffect, useRef, useState } from "react";

interface UsePollingFetchOptions {
  maxRetries?: number;
  interval?: number;
  skip?: boolean; // to delay the first call not satisfy condition(s)
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

export function usePollingFetch<T>(
  fetchFn: () => Promise<PollingResponse<T>>,
  { maxRetries = 5, interval = 3000, skip = false }: UsePollingFetchOptions = {}
): UsePollingFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (skip) return;

    let isCancelled = false;

    const attemptFetch = async (attempt: number) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn();
        console.log("result", result);
        console.log("result.completed", result.completed);

        if (!isCancelled) {
          if (!result.completed && attempt < maxRetries) {
            retryRef.current = setTimeout(() => attemptFetch(attempt + 1), interval);
          } else {
            setData(result.data);
            setLoading(false);
            setRetryCount(0);
          }
        }
      } catch (err) {
        console.error(`Fetch attempt ${attempt} failed`, err);
        if (!isCancelled && attempt < maxRetries) {
          setRetryCount(attempt);
          retryRef.current = setTimeout(() => attemptFetch(attempt + 1), interval);
        } else if (!isCancelled) {
          setError("Fetch failed after several retries.");
          setLoading(false);
        }
      }
    };

    attemptFetch(1);

    return () => {
      isCancelled = true;
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [fetchFn, maxRetries, interval, skip]);

  return { data, loading, error, retryCount };
}