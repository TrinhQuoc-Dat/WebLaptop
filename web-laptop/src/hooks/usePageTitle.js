import { useEffect } from 'react';

const SITE_NAME = 'Laptop Phú Quốc';

/**
 * Hook set document.title theo từng trang.
 * @param {string} title - Tiêu đề riêng của trang (không cần thêm tên site)
 */
const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = SITE_NAME;
    };
  }, [title]);
};

export default usePageTitle;
