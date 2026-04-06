import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { phanMemData } from '../data/phanMemData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  "Tất cả",
  "Thay màn hình",
  "Thay pin",
  "Sửa nguồn",
  "Sửa main",
  "Vệ sinh laptop"
];

const ITEMS_PER_PAGE = 9;

const PhanMem = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Filter data based on category
  const filteredData = useMemo(() => {
    if (selectedCategory === "Tất cả") return phanMemData;
    return phanMemData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

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

        <div className="news-layout-flex">

          {/* Main Content (80%) */}
          <div className="news-main-content">
            <div className="news-grid">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/phan-mem/${item.id}`}
                    className="news-card"
                  >
                    <div className="news-card-img-wrapper">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="news-card-img"
                      />
                    </div>

                    <div className="news-card-body">
                      {/* Thêm phần phân loại danh mục */}
                      <span className="news-card-category">{item.category}</span>

                      <div className="news-card-meta">
                        <div className="news-date-badge">
                          <div className="news-date-day">{item.date.day}</div>
                          <div className="news-date-month">{item.date.month}</div>
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
                {CATEGORIES.map((cat) => (
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
