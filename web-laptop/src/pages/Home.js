import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import {
  mainServices as fallbackServices,
  strengths,
  warningSigns,
  processSteps,
  commitments,
  supportItems
} from '../data/homeData';
import { getServices, getMediaUrl } from '../services/api';

import { ChevronRight } from 'lucide-react';

const Home = () => {
  // ─── Fetch dịch vụ chính từ API ───
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchServices() {
      try {
        const data = await getServices();
        if (!cancelled) {
          // Map API fields → ServiceCard props (image, title, desc)
          const mapped = data.map(svc => ({
            id: svc.id,
            image: getMediaUrl(svc.image),
            title: svc.title,
            desc: svc.description,
          }));
          setServices(mapped);
        }
      } catch (err) {
        console.warn('[Home] API services error, dùng data cục bộ:', err.message);
        if (!cancelled) {
          setServices(fallbackServices);
        }
      } finally {
        if (!cancelled) setServicesLoaded(true);
      }
    }

    fetchServices();
    return () => { cancelled = true; };
  }, []);

  // Dùng fallback nếu chưa load xong hoặc API trả rỗng
  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="home-page">
      <Hero />
      <section className="services-section" style={{ backgroundColor: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ color: '#d32f2f', textTransform: 'uppercase', fontSize: '2rem', marginBottom: '10px' }}>DỊCH VỤ CHÍNH</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: '#d32f2f', margin: '0 auto' }}></div>
          </div>
          <div className="services-grid">
            {displayServices.map((svc) => (
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
            <p style={{ color: '#475569', fontSize: '1.1rem' }}>Sự tin tưởng của khách hàng là động lực phát triển của Laptop Phú Quốc</p>
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
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
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
      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ color: '#d32f2f', textTransform: 'uppercase', fontSize: '2rem', marginBottom: '10px' }}>QUY TRÌNH SỬA CHỮA</h2>
            <div style={{ width: '60px', height: '4px', backgroundColor: '#d32f2f', margin: '0 auto' }}></div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            {processSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div style={{
                  flex: '1 1 200px',
                  padding: '20px',
                  textAlign: 'center',
                  position: 'relative',
                  maxWidth: '260px'
                }}>
                  <div style={{
                    width: '80px', height: '80px',
                    backgroundColor: '#0b5e9d', color: '#fff',
                    borderRadius: '50%', margin: '0 auto 25px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2, position: 'relative',
                    boxShadow: '0 10px 15px -3px rgba(11, 94, 157, 0.3)',
                    border: '4px solid #fff'
                  }}>
                    {step.icon}
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      width: '28px',
                      height: '28px',
                      backgroundColor: '#ef4444',
                      borderRadius: '50%',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #fff'
                    }}>
                      {idx + 1}
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '12px', color: '#1a365d' }}>{step.title}</h4>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '45px 0',
                    color: '#cbd5e1',
                    display: 'none'
                  }} className="process-arrow">
                    <ChevronRight size={30} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <style>{`
          .process-arrow {
            display: flex !important;
          }
          @media (max-width: 1024px) {
            .process-arrow {
              display: none !important;
            }
            .container > div {
              justify-content: center !important;
            }
          }
        `}</style>
      </section>

      <section className="support-bar" style={{ backgroundColor: '#0284c7', color: '#fff', padding: '25px 0' }}>
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

          <div style={{ marginTop: '4rem', padding: '40px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px', color: '#fff' }}>
              Hệ thống sửa chữa laptop, mainboard uy tín hàng đầu Đảo Ngọc
            </h3>

            <p style={{ marginBottom: '15px' }}>
              Trung tâm Laptop Phú Quốc chuyên cung cấp dịch vụ sửa chữa laptop chuyên nghiệp, lấy liền tại chỗ với quy trình rõ ràng và minh bạch. Chúng tôi tiếp nhận và xử lý đa dạng các lỗi từ cơ bản đến phức tạp như laptop không lên nguồn, sập nguồn đột ngột, lỗi mainboard, lỗi chip, hư màn hình, chai pin, lỗi bàn phím, laptop bị vào nước hoặc hoạt động không ổn định.
            </p>

            <p style={{ marginBottom: '15px' }}>
              Với đội ngũ kỹ thuật viên giàu kinh nghiệm, được đào tạo chuyên sâu, chúng tôi có khả năng sửa chữa trên nhiều dòng máy khác nhau như Dell, HP, Asus, Acer, Lenovo và đặc biệt là MacBook với các lỗi chuyên sâu về main, IC nguồn, VGA và chipset. Mỗi thiết bị trước khi sửa đều được kiểm tra kỹ lưỡng để xác định đúng nguyên nhân, từ đó đưa ra phương án tối ưu nhất giúp tiết kiệm chi phí cho khách hàng.
            </p>

            <p style={{ marginBottom: '15px' }}>
              Trung tâm cam kết sử dụng linh kiện chính hãng, chất lượng cao, có nguồn gốc rõ ràng. Kho linh kiện luôn sẵn sàng từ màn hình, pin, bàn phím đến các linh kiện mainboard giúp rút ngắn thời gian sửa chữa và đảm bảo độ bền sau khi thay thế. Tất cả dịch vụ đều được báo giá trước, không phát sinh chi phí ngoài dự kiến.
            </p>

            <p style={{ marginBottom: '15px' }}>
              Bên cạnh đó, chúng tôi còn cung cấp các dịch vụ bảo trì, vệ sinh laptop định kỳ, thay keo tản nhiệt, nâng cấp SSD, RAM giúp máy hoạt động mượt mà, ổn định và kéo dài tuổi thọ. Đây là giải pháp hiệu quả giúp hạn chế hư hỏng và tiết kiệm chi phí sửa chữa về lâu dài.
            </p>

            <p style={{ marginBottom: '15px' }}>
              Chính sách bảo hành rõ ràng từ 6 đến 36 tháng tùy theo dịch vụ và linh kiện thay thế. Khách hàng sẽ được hỗ trợ kiểm tra miễn phí, tư vấn tận tình và hướng dẫn sử dụng sau khi sửa chữa để tránh lỗi lặp lại.
            </p>

            <p>
              Nếu bạn đang tìm kiếm một địa chỉ sửa laptop uy tín tại Phú Quốc, nhanh chóng, giá tốt và chuyên xử lý các lỗi khó, Trung tâm Laptop Phú Quốc chính là lựa chọn đáng tin cậy dành cho bạn. Chúng tôi luôn đặt chất lượng dịch vụ và sự hài lòng của khách hàng lên hàng đầu.
            </p>
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
