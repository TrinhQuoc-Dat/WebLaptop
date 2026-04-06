import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import {
  mainServices,
  strengths,
  warningSigns,
  processSteps,
  commitments,
  arrowButtons,
  supportItems
} from '../data/homeData';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />

      {/* 2. DỊCH VỤ CHÍNH */}
      <section className="services-section" style={{ backgroundColor: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ color: '#d32f2f', textTransform: 'uppercase', fontSize: '2rem', marginBottom: '10px' }}>DỊCH VỤ CHÍNH</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: '#d32f2f', margin: '0 auto' }}></div>
          </div>
          <div className="services-grid">
            {mainServices.map((svc) => (
              <ServiceCard key={svc.id} {...svc} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. TẠI SAO CHỌN CHÚNG TÔI */}
      <section className="features-section" style={{ backgroundColor: '#f1f5f9', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ color: '#0b5e9d', textTransform: 'uppercase', fontSize: '2rem', marginBottom: '10px' }}>TẠI SAO CHỌN CHÚNG TÔI</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Sự tin tưởng của khách hàng là động lực phát triển của Laptop Phú Quốc</p>
          </div>

          <div className="features-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '35px' }}>
            {strengths.map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center', padding: '20px' }}>
                <div className="icon-circle" style={{
                  margin: '0 auto 20px',
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#fff',
                  color: '#0b5e9d',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px', color: '#1a365d' }}>{item.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Button Arrows Row (Restored) */}
      {/* <section className="arrows-banner" style={{ background: '#f8f9fa', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {arrowButtons.map((txt, idx) => (
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
      </section> */}

      {/* 4. KHI NÀO NÊN MANG MÁY RA CỬA HÀNG */}
      <section style={{ backgroundColor: '#1e293b', color: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '15px', color: '#f8fafc' }}>KHI NÀO NÊN MANG MÁY RA CỬA HÀNG KIỂM TRA?</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Đừng để tình trạng tệ hơn, hãy mang máy đi kiểm tra ngay khi gặp các dấu hiệu sau:</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {warningSigns.map((sign, idx) => (
              <div key={idx} style={{
                flex: '1 1 200px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '25px',
                borderRadius: '4px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ color: '#ef4444', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{sign.icon}</div>
                <span style={{ fontWeight: 'bold' }}>{sign.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUY TRÌNH SỬA CHỮA */}
      <section style={{ backgroundColor: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ color: '#d32f2f', textTransform: 'uppercase', fontSize: '2rem', marginBottom: '10px' }}>QUY TRÌNH SỬA CHỮA</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: '#d32f2f', margin: '0 auto' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
            {processSteps.map((step, idx) => (
              <div key={idx} style={{ padding: '30px', textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: '60px', height: '60px',
                  backgroundColor: '#0b5e9d', color: '#fff',
                  borderRadius: '50%', margin: '0 auto 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2, position: 'relative'
                }}>
                  {step.icon}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{step.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue Support Bar (Restored) */}
      <section className="support-bar" style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '25px 0' }}>
        <div className="container support-grid">
          {supportItems.map((item, idx) => (
            <div key={idx} className="support-item">
              <div style={{ marginBottom: '10px' }}>{item.icon}</div>
              <span>{item.title}<br />{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CAM KẾT TẠI CỬA HÀNG LAPTOP PHÚ QUỐC */}
      <section className="commitments-section" style={{ backgroundColor: '#0f172a', color: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '15px' }}>CAM KẾT TẠI CỬA HÀNG LAPTOP PHÚ QUỐC</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>Chất lượng là danh dự - Uy tín là sự sống còn</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {commitments.map((com, idx) => (
              <div key={idx} style={{ padding: '30px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ marginBottom: '20px', color: '#38bdf8' }}>{com.icon}</div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px' }}>{com.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6' }}>{com.desc}</p>
              </div>
            ))}
          </div>

          {/* Integrated SEO Content */}
          <div style={{ marginTop: '4rem', padding: '40px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>Hệ thống sửa chữa laptop, mainboard uy tín hàng đầu Đảo Ngọc</h3>
            <p style={{ marginBottom: '15px' }}>Trung tâm Laptop Phú Quốc tự hào mang đến giải pháp sửa chữa laptop chuyên nghiệp lấy liền tại chỗ. Chúng tôi chuyên xử lý các ca lỗi phần cứng khó nhất như mất nguồn mainboard, sập nguồn đột ngột, máy dính nước hoặc hư hỏng linh kiện trên các dòng máy Dell, HP, Asus, Acer và đặc biệt là MacBook chuyên biệt.</p>
            <p>Với kho linh kiện đầy đủ từ màn hình, bàn phím đến pin chính hãng, chúng tôi cam kết bảo hành dài hạn từ 6-36 tháng, giúp quý khách hoàn toàn an tâm khi sử dụng dịch vụ tại cửa hàng.</p>
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="brands-section" style={{ padding: '3rem 0', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
        <div className="container">
          <div className="brands-container" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775128490/dell-1_khlgss.png" alt="Dell" height="35" style={{ opacity: 0.5, width: '110px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" alt="HP" height="40" style={{ opacity: 0.5, width: '40px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg" alt="Asus" height="35" style={{ opacity: 0.5, width: '90px' }} />
            <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775128490/acer-5_jvk29s.png" alt="Acer" height="35" style={{ opacity: 0.5, width: '110px' }} />
            <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775128490/macbook_yim54e.png" alt="Macbook" height="35" style={{ opacity: 0.5, width: '130px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" height="35" style={{ opacity: 0.5, width: '110px' }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
