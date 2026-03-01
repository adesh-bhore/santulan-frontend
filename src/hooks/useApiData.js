import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for fetching API data with loading, error handling, and auto-refresh
 * 
 * @param {Function} apiFunction - API function to call
 * @param {Object} options - Configuration options
 * @param {number} options.refreshInterval - Auto-refresh interval in ms (0 = disabled)
 * @param {boolean} options.fetchOnMount - Fetch data on component mount
 * @param {Array} options.dependencies - Dependencies to trigger refetch
 * @returns {Object} { data, loading, error, refetch, isRefreshing }
 */
export const useApiData = (apiFunction, options = {}) => {
  const {
    refreshInterval = 0,
    fetchOnMount = true,
    dependencies = []
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(fetchOnMount);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const intervalRef = useRef(null);
  const mountedRef = useRef(true);
  const apiFunctionRef = useRef(apiFunction);

  // Update the ref when apiFunction changes
  useEffect(() => {
    apiFunctionRef.current = apiFunction;
  }, [apiFunction]);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const result = await apiFunctionRef.current();
      
      if (mountedRef.current) {
        setData(result);
        setError(null);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err.message || 'Failed to fetch data');
        console.error('API Error:', err);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []); // No dependencies - uses ref instead

  // Initial fetch
  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, [fetchData, fetchOnMount, ...dependencies]);

  // Auto-refresh
  useEffect(() => {
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        fetchData(true);
      }, refreshInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refreshInterval, fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const refetch = useCallback(() => {
    fetchData(false);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    isRefreshing
  };
};

/**
 * Hook for paginated data
 */
export const usePaginatedData = (apiFunction, pageSize = 10) => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, loading, error, refetch } = useApiData(
    () => apiFunction(page, pageSize),
    { dependencies: [page] }
  );

  useEffect(() => {
    if (data) {
      setAllData(prev => page === 1 ? data : [...prev, ...data]);
      setHasMore(data.length === pageSize);
    }
  }, [data, page, pageSize]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
  }, []);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    refetch
  };
};
