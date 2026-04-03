import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { phanMemData } from '../data/phanMemData';
import {
  ChevronLeft, Info, Wrench, CheckCircle, Package,
  ShieldCheck, ListOrdered, DollarSign, Clock,
  Calendar, Tag, PhoneCall, MessageCircle, ArrowRight,
  Share2, Printer, MapPin, Award
} from 'lucide-react';

const PhanMemDetail = () => {
  const { id } = useParams();
  const article = phanMemData.find((item) => item.id === id);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (!article) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h1 className="detail-h2" style={{ color: '#666' }}>Không tìm thấy nội dung bài viết.</h1>
        <Link to="/phan-mem" className="toc-link-btn" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <ChevronLeft size={20} /> Quay lại trang danh sách
        </Link>
      </div>
    );
  }

  const { content, title, thumbnail, category, date } = article;

  const tableOfContents = [
    { id: 'section-1', title: 'Dấu hiệu nhận biết', icon: <Info size={16} /> },
    { id: 'section-2', title: 'Giải pháp xử lý', icon: <Wrench size={16} /> },
    { id: 'section-3', title: 'Báo giá tham khảo', icon: <DollarSign size={16} /> },
    { id: 'section-4', title: 'Chi tiết dịch vụ', icon: <Package size={16} /> },
    { id: 'section-5', title: 'Lợi ích khách hàng', icon: <ShieldCheck size={16} /> },
    { id: 'section-6', title: 'Quy trình thực hiện', icon: <ListOrdered size={16} /> },
  ];

  return (
    <article className="detail-article-page">
      {/* Reading Progress Bar */}
      <div className="detail-progress-bar">
        <div className="detail-progress-inner" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="detail-container">
        {/* Breadcrumb */}
        <nav className="detail-breadcrumb-nav">
          <Link to="/" style={{ color: '#666' }}>Trang chủ</Link>
          <span style={{ color: '#ccc' }}>/</span>
          <Link to="/phan-mem" style={{ color: '#666' }}>Phần mềm</Link>
          <span style={{ color: '#ccc' }}>/</span>
          <span style={{ color: '#0d6efd', fontWeight: '700' }}>{category}</span>
        </nav>

        <div className="detail-layout-grid">
          {/* LEFT: Main Content Area */}
          <section className="detail-main">
            <header className="detail-header">
              {/* Meta information row */}
              <div className="detail-meta-tags">
                <span className="tag-badge">
                  <Tag size={12} style={{ marginRight: '6px' }} />
                  {category}
                </span>
                <span className="meta-info-item">
                  <Calendar size={14} />
                  Ngày {date.day}, Th {date.month}
                </span>
                <span className="meta-info-item">
                  <Clock size={14} />
                  ~8 Phút đọc
                </span>
              </div>

              <h1 className="detail-h1">{title}</h1>

              {/* Intro Section */}
              <div className="detail-intro-card">
                <div className="intro-badge">Lời khuyên chuyên gia</div>
                <p className="intro-text">
                  "{content.intro}"
                </p>
              </div>

              {/* Main Featured Image */}
              <div className="detail-img-section">
                <div className="featured-img-container">
                  <img src={thumbnail} alt={title} className="featured-img" />
                </div>
                <div className="img-caption">
                  <Info size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  Hình ảnh minh họa về quy trình chuẩn đoán và xử lý tại LaptopCare
                </div>
              </div>
            </header>

            {/* ARTICE SECTIONS */}

            {/* SECTION 1: SIGNS */}
            <section id="section-1">
              <div className="detail-section-head">
                <div className="head-icon-box"><Info size={28} /></div>
                <h2 className="detail-h2">Dấu hiệu nhận biết lỗi sớm</h2>
              </div>
              <div className="info-card-grid">
                {content.signs.map((sign, idx) => (
                  <div key={idx} className="info-item-card">
                    <div className="info-card-icon"><ShieldCheck size={20} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#ef4444', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>
                        Cảnh báo #{idx + 1}
                      </div>
                      <p style={{ margin: 0, fontWeight: '700', lineHeight: '1.5' }}>{sign}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 2: FIXES */}
            <section id="section-2">
              <div className="detail-section-head">
                <div className="head-icon-box" style={{ transform: 'rotate(-5deg)' }}><Wrench size={28} /></div>
                <h2 className="detail-h2">Phương pháp xử lý triệt để</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {content.fixes.map((fix, idx) => (
                  <div key={idx} className="solution-block">
                    <div>
                      <div className="sol-num-badge">{idx + 1}</div>
                      <h4 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '15px' }}>
                        Giải pháp {idx === 0 ? 'ưu tiên số 1' : 'bổ sung'}
                      </h4>
                      <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.7', fontStyle: 'italic' }}>
                        {fix}
                      </p>
                    </div>
                    {idx === 1 && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80"
                          alt="Minh họa"
                          style={{ borderRadius: '20px', width: '100%', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: COST */}
            <section id="section-3">
              <div className="price-black-card">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <div className="tag-badge" style={{ background: '#0d6efd', color: '#fff', border: 'none', marginBottom: '15px' }}>Bảng giá niêm yết</div>
                  <h2 className="detail-h1" style={{ color: '#fff', fontSize: '3rem', margin: 0 }}>Chi phí dịch vụ dự kiến</h2>
                </div>

                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                  {content.cost.map((item, idx) => {
                    const parts = item.split(':');
                    return (
                      <div key={idx} className="price-row-item">
                        <div className="price-name">
                          <CheckCircle size={20} style={{ color: '#10b981' }} />
                          {parts[0]}
                        </div>
                        {parts[1] && <div className="price-amount">{parts[1].trim()}</div>}
                      </div>
                    )
                  })}
                </div>

                <div style={{ marginTop: '50px', background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <Info size={32} style={{ color: '#fbbf24' }} />
                  <p style={{ fontSize: '0.9rem', color: '#ccc', fontStyle: 'italic', margin: 0 }}>
                    Lưu ý: Giá trên áp dụng cho hầu hết các dòng laptop phổ thông. Với các dòng Gaming, Macbook đời mới, vui lòng liên hệ trực tiếp để có giá chính xác theo linh kiện thực tế.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: SERVICE INFO */}
            <section id="section-4">
              <div className="detail-section-head">
                <div className="head-icon-box"><Package size={28} /></div>
                <h2 className="detail-h2">Chi tiết dịch vụ tại LaptopCare</h2>
              </div>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&q=80"
                    alt="Technical Support"
                    style={{ width: '100%', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  />
                </div>
                <div style={{ flex: '1.2', minWidth: '300px' }}>
                  <div style={{ color: '#0d6efd', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', marginBottom: '15px' }}>Trách nhiệm & Tận tâm</div>
                  <p style={{ fontSize: '1.4rem', fontStyle: 'italic', color: '#1f2937', fontWeight: '600', lineHeight: '1.6' }}>
                    "{content.service}"
                  </p>
                  <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
                    <div>
                      <div style={{ color: '#0d6efd', fontSize: '2.5rem', fontWeight: '900' }}>99%</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#999', textTransform: 'uppercase' }}>Hài lòng tuyệt đối</div>
                    </div>
                    <div style={{ width: '1px', background: '#ddd' }}></div>
                    <div>
                      <div style={{ color: '#0d6efd', fontSize: '2.5rem', fontWeight: '900' }}>10+</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: '800', color: '#999', textTransform: 'uppercase' }}>Máy/Ngày</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: BENEFITS */}
            <section id="section-5">
              <div style={{ background: '#eff6ff', borderRadius: '50px', padding: '60px', marginTop: '80px', border: '1px solid #dbeafe' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2 className="detail-h2" style={{ fontSize: '2.5rem' }}>Cam kết vàng của LaptopCare</h2>
                  <p style={{ color: '#666', fontStyle: 'italic', fontWeight: '500', marginTop: '10px' }}>Sự tin tưởng của khách hàng là ưu tiên hàng đầu</p>
                </div>
                <div className="info-card-grid">
                  {content.benefits.map((benefit, idx) => (
                    <div key={idx} className="info-item-card" style={{ padding: '25px', border: 'none', shadow: 'none' }}>
                      <div className="info-card-icon" style={{ background: '#fff', boxShadow: '0 5px 10px rgba(0,0,0,0.05)' }}>
                        <ShieldCheck size={24} />
                      </div>
                      <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#333' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6: STEPS */}
            <section id="section-6">
              <div style={{ textAlign: 'center', margin: '80px 0 60px' }}>
                <h2 className="detail-h2" style={{ fontSize: '2.5rem' }}>Quy trình xử lý chuyên nghiệp</h2>
                <div style={{ width: '60px', height: '6px', background: '#0d6efd', margin: '20px auto', borderRadius: '3px' }}></div>
              </div>
              <div className="timeline-vertical">
                {content.steps.map((step, idx) => (
                  <div key={idx} className="timeline-step">
                    <div className="step-num-box">{idx + 1}</div>
                    <div className="step-body-card">
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#111827', marginBottom: '10px' }}>
                        Giai đoạn {idx + 1}
                      </h4>
                      <p style={{ margin: 0, color: '#555', fontWeight: '500', lineHeight: '1.6' }}>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* UPGRADED FOOTER CTA */}
            <div className="detail-footer-cta">
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '20px' }}>Bạn cần kỹ thuật viên tư vấn ngay?</h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto 40px' }}>
                Hệ thống trực kỹ thuật luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc của bạn về tình trạng máy tính.
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="cta-button-white">
                  <PhoneCall size={24} /> 09xx.xxx.xxx
                </button>
                <button className="cta-button-white" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <MessageCircle size={24} /> LIÊN HỆ ZALO
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT: STICKY SIDEBAR */}
          <aside className="article-sticky-sidebar">
            <div className="sidebar-sticky-wrap">
              {/* Table of Contents */}
              <div className="detail-sidebar-box">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
                  Mục lục bài viết
                </h3>
                <nav>
                  {tableOfContents.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="toc-link-btn">
                      <div className="toc-icon-dot"></div>
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sidebar Quick Contact */}
              <div className="detail-sidebar-box" style={{ background: '#111827', color: '#fff', border: 'none' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '15px', color: '#fff' }}>Hỗ trợ tận nơi</h3>
                <p style={{ color: '#9ca3af', fontWeight: '500', marginBottom: '30px' }}>Phục vụ khu vực TP.HCM, kỹ thuật đến tận nhà trong 30-45 phút.</p>

                <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MapPin size={18} style={{ color: '#60a5fa', shrink: '0' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Cơ sở 1: Quận 1, Tp. HCM</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MapPin size={18} style={{ color: '#60a5fa', shrink: '0' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Cơ sở 2: Quận 10, Tp. HCM</span>
                  </div>
                </div>

                <button className="cta-button-white" style={{ width: '100%', marginTop: '0', fontSize: '1rem', padding: '15px' }}>
                  ĐẶT LỊCH SỬA CHỮA <ArrowRight size={18} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="detail-sidebar-box" style={{ border: '2px dashed #0d6efd', background: '#f0f7ff' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#0d6efd', marginBottom: '15px' }}>Chuyên gia tư vấn</h4>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #0d6efd' }}>
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80" alt="Specialist" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>Phú Cường</div>
                    <div style={{ fontSize: '0.7rem', color: '#0d6efd', fontWeight: '700' }}>Trưởng nhóm kỹ thuật</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic', margin: 0, lineHeight: '1.5' }}>
                  "Chúng tôi cam kết sử dụng linh kiện chính hãng và bảo hành trách nhiệm cao cho mọi khách hàng."
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default PhanMemDetail;
