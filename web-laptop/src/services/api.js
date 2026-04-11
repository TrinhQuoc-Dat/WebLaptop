/**
 * API Service Layer — Kết nối React Frontend với Django Backend
 * Base URL: http://localhost:8000/api/
 */

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Fetch wrapper chung — tự xử lý response + error
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `API Error: ${response.status}`);
  }

  return response.json();
}

// ─────────────── CORE APIs ───────────────

/** GET /api/site-config/ — Thông tin cửa hàng (phone, địa chỉ, giờ mở cửa...) */
export async function getSiteConfig() {
  return fetchApi('/site-config/');
}

/** GET /api/services/ — Danh sách dịch vụ chính cho Home.js */
export async function getServices() {
  return fetchApi('/services/');
}

/** GET /api/price-list/ — Bảng giá dịch vụ cho BangGia.js */
export async function getPriceList() {
  return fetchApi('/price-list/');
}

// ─────────────── BLOG APIs ───────────────

/** GET /api/categories/ — Danh mục bài viết (PhanMem sidebar) */
export async function getCategories() {
  return fetchApi('/categories/');
}

/**
 * GET /api/articles/ — Danh sách bài viết
 * @param {string} [categorySlug] - Lọc theo category slug (optional)
 */
export async function getArticles(categorySlug) {
  const params = categorySlug ? `?category=${categorySlug}` : '';
  return fetchApi(`/articles/${params}`);
}

/**
 * GET /api/articles/:slug/ — Chi tiết bài viết
 * @param {string} slug
 */
export async function getArticleDetail(slug) {
  return fetchApi(`/articles/${slug}/`);
}

// ─────────────── CONTACT APIs ───────────────

/**
 * POST /api/contact/ — Gửi yêu cầu tư vấn
 * @param {{ full_name: string, phone: string, message: string }} data
 */
export async function submitContact(data) {
  return fetchApi('/contact/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ─────────────── MEDIA URL Helper ───────────────

const MEDIA_BASE = process.env.REACT_APP_MEDIA_URL || 'http://localhost:8000';

/**
 * Chuyển relative media path thành absolute URL
 * VD: "/media/articles/abc.jpg" → "http://localhost:8000/media/articles/abc.jpg"
 */
export function getMediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${MEDIA_BASE}${path}`;
}
