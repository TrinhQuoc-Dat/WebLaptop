import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook để gọi API với loading/error state.
 * Dùng cho mọi trang cần fetch data từ backend.
 *
 * @param {Function} apiFn  — hàm async gọi API từ services/api.js
 * @param {Array}    deps   — dependency array để re-fetch (mặc định [])
 * @param {boolean}  immediate — tự động fetch ngay khi mount (mặc định true)
 * @returns {{ data, loading, error, refetch }}
 */
export function useApi(apiFn, deps = [], immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu.');
      console.error('[useApi]', err);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
