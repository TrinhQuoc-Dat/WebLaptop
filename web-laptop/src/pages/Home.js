import React from 'react';
import { Clock, DollarSign, Wrench, MonitorCheck, Truck, ShoppingCart, RefreshCw, Phone } from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  const mainServices = [
    { id: 1, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "SỬA LAPTOP VĂN PHÒNG", desc: "Sửa chữa phần cứng, khắc phục các vấn đề máy chậm, giật lag." },
    { id: 2, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "SỬA MACBOOK UY TÍN", desc: "Xử lý triệt để lỗi phần cứng, phần mềm trên các dòng Macbook." },
    { id: 3, image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "SỬA SURFACE & LAPTOP", desc: "Kỹ thuật chuyên sâu xử lý laptop mỏng nhẹ, cao cấp và máy gaming." }
  ];

  const newServices = [
    { id: 1, image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "THAY MÀN HÌNH LAPTOP", desc: "Thay màn hình laptop chính hãng, lấy liền, phân giải cao, bảo hành dài." },
    { id: 2, image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "SỬA BẢN LỀ LAPTOP", desc: "Phục hồi ngoại hình và độ chắc chắn cho laptop bị hư bản lề, gãy vỏ." },
    { id: 3, image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "THAY PIN CHÍNH HÃNG", desc: "Cung cấp pin các dòng Dell, HP, Asus bảo hành 12-36 tháng đầy đủ." }
  ];

  return (
    <div className="home-page">
      <Hero />

      {/* Dịch vụ Section */}
      <section className="services-section" style={{ backgroundColor: '#fff', padding: '3rem 0' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: '#d32f2f', textTransform: 'uppercase', fontSize: '1.8rem' }}>DỊCH VỤ CỦA CHÚNG TÔI</h2>
          <div className="services-grid">
            {mainServices.map((svc) => (
              <ServiceCard key={svc.id} {...svc} />
            ))}
          </div>
        </div>
      </section>

      {/* Điểm mạnh Section (Theo hình) */}
      <section className="features-section" style={{ backgroundColor: '#fff', padding: '1rem 0 3rem' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: '#d32f2f', textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.8rem' }}>ĐIỂM MẠNH CỦA CHÚNG TÔI</h2>

          <div className="features-grid-layout">
            <div className="features-content">
              <p style={{ marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6', color: '#555' }}>
                Với uy tín hơn 10 năm, trên 500 ngàn khách hàng trong và ngoài nước đã tin tưởng sử dụng dịch vụ sửa chữa laptop lấy liền, thay thế linh kiện chính hãng tại trung tâm chúng tôi. Sự hài lòng của khách hàng là niềm tự hào và động lực để chúng tôi phát triển.
              </p>

              <div className="features-points">
                <div className="feature-item">
                  <div className="icon-circle">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>Bảo hành dài hạn</h4>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>Bảo hành từ 6 đến 36 tháng đối với các dịch vụ thay thế linh kiện.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="icon-circle">
                    <Wrench size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>Thay linh kiện lấy liền</h4>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>Kho linh kiện đầy đủ, thay thế nhanh chóng 10-15 phút có thể lấy máy.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="icon-circle">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>Giá cả hợp lý</h4>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>Báo giá rõ ràng, minh bạch trước khi sửa. Chi phí luôn cạnh tranh.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="icon-circle">
                    <MonitorCheck size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>Sửa chữa chuyên nghiệp</h4>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>Bắt đúng bệnh, vệ sinh tản nhiệt cẩn thận, máy móc hàn chip hiện đại.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-img-container">
              <img src="https://images.unsplash.com/photo-1593640495253-23196b27a87f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Cửa hàng sửa chữa" style={{ width: '100%', borderRadius: '4px', height: '100%', minHeight: '300px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Button Arrows Row */}
      <section className="arrows-banner" style={{ background: '#f8f9fa', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {['SỬA MACBOOK', 'SỬA LAPTOP DELL', 'SỬA LAPTOP ASUS', 'SỬA LAPTOP HP', 'SỬA SURFACE'].map((txt, idx) => (
            <div key={idx} className="arrow-btn" style={{
              backgroundColor: '#0ea5e9',
              color: '#fff',
              padding: '10px 15px',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              textAlign: 'center',
              clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)',
              cursor: 'pointer',
              flex: '1 1 auto',
              minWidth: '150px'
            }}>
              {txt}
            </div>
          ))}
        </div>
      </section>

      {/* Blue Support Bar */}
      <section className="support-bar" style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '25px 0' }}>
        <div className="container support-grid">
          <div className="support-item">
            <Truck size={36} />
            <span>Giao Hàng Tận Nơi<br />Trên Toàn Quốc</span>
          </div>
          <div className="support-item">
            <ShoppingCart size={36} />
            <span>Đặt Hàng Trực Tuyến<br />Nhanh Chóng, Dễ Dàng</span>
          </div>
          <div className="support-item">
            <RefreshCw size={36} />
            <span>Đổi Trả Dễ Dàng<br />Sản Phẩm Trong 7 Ngày</span>
          </div>
          <div className="support-item">
            <Phone size={36} />
            <span>Hotline Hỗ Trợ 24/7<br />Giao Tại TPHCM 24h</span>
          </div>
        </div>
      </section>

      {/* Dịch vụ mới Section */}
      <section className="services-section" style={{ backgroundColor: '#fff', padding: '3rem 0' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: '#d32f2f', textTransform: 'uppercase', fontSize: '1.8rem' }}>DỊCH VỤ MỚI</h2>
          <div className="services-grid">
            {newServices.map((svc) => (
              <ServiceCard key={svc.id} {...svc} link="/dich-vu" />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="brands-section" style={{ padding: '2rem 0', borderTop: '1px solid #eee' }}>
        <div className="container">
          <div className="brands-container" style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg" alt="Dell" height="40" style={{ opacity: 0.7, width: '80px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" alt="HP" height="40" style={{ opacity: 0.7, width: '40px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg" alt="Asus" height="40" style={{ opacity: 0.7, width: '100px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Acer_Logo.svg" alt="Acer" height="40" style={{ opacity: 0.7, width: '100px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Apple_macbook_logo.svg" alt="Macbook" height="40" style={{ opacity: 0.7, width: '120px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" height="40" style={{ opacity: 0.7, width: '120px' }} />
          </div>
        </div>
      </section>

      {/* SEO Viết text giới thiệu */}
      <section className="seo-text-section" style={{ backgroundColor: '#f9f9f9', padding: '3rem 0', fontSize: '0.85rem', color: '#444', lineHeight: '1.6', textAlign: 'left' }}>
        <div className="container">
          <h3 style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>Trung tâm sửa chữa laptop thay linh kiện uy tín tại khu vực TPHCM</h3>
          <p style={{ marginBottom: '15px' }}>Trung tâm phục hồi dữ liệu chuyên nghiệp, cài đặt phần mềm miễn phí và nâng cấp nhanh chóng, thay pin macbook lấy ngay. Khi laptop / macbook của bạn gặp sự cố, hãy đến ngay với hệ thống sửa chữa uy tín của chúng tôi.</p>
          <p style={{ marginBottom: '15px' }}>Tại sao khách hàng luôn tin tưởng sử dụng dịch vụ? Chúng tôi nhập khẩu linh kiện zin loại 1, quy trình tháo ráp rõ ràng minh bạch. Đội ngũ kỹ thuật viên kinh nghiệm lâu năm.</p>

          <h3 style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1rem', marginTop: '20px', marginBottom: '10px' }}>
            Dịch vụ sửa chữa thay thế linh kiện chuyên nghiệp:
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
            <li>Thay màn hình laptop bị sọc, đen, nhòe màu (chờ lấy ngay 15 phút).</li>
            <li>Thay bàn phím bị kẹt phím, đứt cáp, nước vào.</li>
            <li>Thay pin laptop chính hãng bảo hành dài hạn.</li>
            <li>Sửa nhanh các lỗi nguồn mạch mainboard laptop.</li>
            <li>Bảo dưỡng máy, tra keo tản nhiệt định kỳ.</li>
          </ul>

          <h3 style={{ color: '#0d6efd', fontWeight: 'bold', fontSize: '1rem', marginTop: '20px', marginBottom: '10px' }}>Bảng giá dịch vụ sửa chữa laptop</h3>
          <p style={{ marginBottom: '10px' }}>Tùy thuộc vào model và từng loại thế hệ máy (Đời cũ, đời Gen mới nhất...) giá linh kiện có thể thay đổi liên tục. Vui lòng liên hệ Hotline trực tiếp để được kỹ thuật viên báo giá chính xác nhất.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
