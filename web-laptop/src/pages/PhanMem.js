import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { getArticles, getCategories, getMediaUrl } from '../services/api';
import { phanMemData } from '../data/phanMemData';

const ITEMS_PER_PAGE = 9;

const PhanMem = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);

  // ─── API State ───
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // Fetch categories + articles từ backend
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const [catData, artData] = await Promise.all([
          getCategories(),
          getArticles(),
        ]);
        if (!cancelled) {
          setCategories(catData);
          setArticles(artData);
          setIsOffline(false);
        }
      } catch (err) {
        console.warn('[PhanMem] API error, dùng data cục bộ:', err.message);
        if (!cancelled) {
          setIsOffline(true);
          setArticles(phanMemData);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Build category list: "Tất cả" + từ API hoặc fallback
  const categoryList = useMemo(() => {
    if (categories.length > 0) {
      return ["Tất cả", ...categories.map(c => c.name)];
    }
    // Fallback từ data cục bộ
    const unique = [...new Set(phanMemData.map(item => item.category))];
    return ["Tất cả", ...unique];
  }, [categories]);

  // Tìm slug của category đã chọn (để filter API data)
  const selectedCategorySlug = useMemo(() => {
    if (selectedCategory === "Tất cả") return null;
    const cat = categories.find(c => c.name === selectedCategory);
    return cat ? cat.slug : null;
  }, [selectedCategory, categories]);

  // Filter data based on category
  const filteredData = useMemo(() => {
    if (selectedCategory === "Tất cả") return articles;

    if (isOffline) {
      // Fallback data: filter theo category name
      return articles.filter(item => item.category === selectedCategory);
    }

    // API data: filter theo category name (server đã trả)
    return articles.filter(item => item.category === selectedCategory);
  }, [selectedCategory, articles, isOffline]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper: lấy link slug cho từng bài viết (API trả slug, fallback trả id)
  const getArticleSlug = (item) => item.slug || item.id;

  // Helper: lấy thumbnail URL
  const getThumbnail = (item) => {
    if (isOffline) return item.thumbnail;
    return getMediaUrl(item.thumbnail);
  };

  // Helper: lấy date object
  const getDate = (item) => {
    if (isOffline) return item.date;
    return item.date || { day: '--', month: '--' };
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', padding: '2rem 0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <Loader size={40} className="spin-animation" style={{ marginBottom: '15px', animation: 'spin 1s linear infinite' }} />
          <p>Đang tải dữ liệu...</p>
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '2rem 0', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">LAPTOP PHÚ QUỐC</Link>
          <span className="separator">/</span>
          <span className="current">Phần mềm</span>
        </nav>

        <div className="news-header-container">
          <h1 className="news-title">TIN TỨC PHẦN MỀM & THỦ THUẬT LAPTOP</h1>
          <div className="news-header-line"></div>
        </div>

        {isOffline && (
          <div style={{ padding: '10px 15px', backgroundColor: '#fef3c7', borderRadius: '4px', marginBottom: '20px', fontSize: '0.9rem', color: '#92400e', border: '1px solid #fde68a' }}>
            ⚠️ Không kết nối được API — đang hiển thị dữ liệu mẫu.
          </div>
        )}

        <div className="news-layout-flex">

          {/* Main Content (80%) */}
          <div className="news-main-content">
            <div className="news-grid">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <Link
                    key={getArticleSlug(item)}
                    to={`/phan-mem/${getArticleSlug(item)}`}
                    className="news-card"
                  >
                    <div className="news-card-img-wrapper">
                      <img
                        src={getThumbnail(item)}
                        alt={item.title}
                        className="news-card-img"
                      />
                    </div>

                    <div className="news-card-body">
                      {/* Thêm phần phân loại danh mục */}
                      <span className="news-card-category">{item.category}</span>

                      <div className="news-card-meta">
                        <div className="news-date-badge">
                          <div className="news-date-day">{getDate(item).day}</div>
                          <div className="news-date-month">{getDate(item).month}</div>
                        </div>
                        <h2 className="news-card-title">
                          {item.title}
                        </h2>
                      </div>
                      <p className="news-card-desc">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', color: '#666', gridColumn: '1 / -1' }}>
                  Không có bài viết nào trong danh mục này.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn pagination-nav"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="pagination-btn pagination-nav"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar (20%) */}
          <div className="news-sidebar">
            <div className="sidebar-container">
              <div className="sidebar-title-wrapper">
                <h3 className="sidebar-title">Danh mục</h3>
              </div>
              <div className="sidebar-list">
                {categoryList.map((cat) => (
                  <div
                    key={cat}
                    className={`sidebar-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PhanMem;
