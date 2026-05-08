import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Send, ShieldCheck, Award, Users, CheckCircle, Loader } from 'lucide-react';
import { submitContact, getSiteConfig } from '../services/api';
import usePageTitle from '../hooks/usePageTitle';

const LienHe = () => {
  usePageTitle('Liên hệ & Giới thiệu');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    message: '',
  });
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // ─── Fetch site config (phone, address, giờ mở cửa) ───
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const data = await getSiteConfig();
        setSiteConfig(data);
      } catch (err) {
        console.warn('[LienHe] Không tải được cấu hình site:', err.message);
      }
    }
    fetchConfig();
  }, []);

  // ─── Helper: lấy thông tin từ config hoặc fallback ───
  const shopPhone = siteConfig?.phone || '0815 774 668';
  const shopZalo = siteConfig?.zalo || '0815 774 668';
  const shopAddress = siteConfig?.address || '41C Lý Thường Kiệt, Dương Đông, Phú Quốc';
  const morningHours = siteConfig?.morning_hours || '8h - 12h';
  const afternoonHours = siteConfig?.afternoon_hours || '14h - 19h';
  const workingDays = siteConfig?.working_days || 'Tất cả các ngày trong tuần';
  const mapUrl = siteConfig?.google_map_embed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125646.65348812896!2d103.86406068069593!3d10.224602600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78b8eb1bb774f%3A0x46f1fc0b2b010ac9!2zTGFwdG9wIFBow7ogUXXhu5Fj!5e0!3m2!1svi!2s!4v1775486474591!5m2!1svi!2s';

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState('loading');
    setErrorMsg('');

    try {
      await submitContact(formData);
      setSubmitState('success');
      setFormData({ full_name: '', phone: '', message: '' });
    } catch (err) {
      console.error('[LienHe] Submit error:', err);
      setSubmitState('error');
      setErrorMsg(err.message || 'Gửi yêu cầu thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* 1. HERO SECTION (GIỚI THIỆU) */}
      <section style={{
        backgroundColor: '#0b5e9d',
        color: '#fff',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>
            VỀ CHÚNG TÔI - LAPTOP PHÚ QUỐC
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: '0.9', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
            Hơn 10 năm kinh nghiệm trong lĩnh vực sửa chữa Laptop chuyên nghiệp tại Phú Quốc.
            Chúng tôi cam kết đem lại giải pháp tốt nhất, nhanh nhất và an tâm nhất cho mọi khách hàng.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1200px', marginTop: '80px' }}>

        {/* 2. GIÁ TRỊ CỐT LÕI (GIỚI THIỆU) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '100px' }}>
          {[
            {
              icon: <Award size={32} />,
              title: "Kỹ thuật chuyên sâu",
              desc: "Đội ngũ giàu kinh nghiệm, xử lý được các ca lỗi khó nhất trên mainboard."
            },
            {
              icon: <ShieldCheck size={32} />,
              title: "Linh kiện chính hãng",
              desc: "Chỉ sử dụng linh kiện có nguồn gốc rõ ràng, bảo hành từ 6-36 tháng."
            },
            {
              icon: <Users size={32} />,
              title: "Tận tâm hỗ trợ",
              desc: "Lắng nghe và tư vấn giải pháp tối ưu chi phí cho từng nhu cầu thực tế."
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '4px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ color: '#0b5e9d', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 3. THÔNG TIN LIÊN HỆ & FORM (LIÊN HỆ) */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#1a1a1a', marginBottom: '15px' }}>THÔNG TIN LIÊN HỆ</h2>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#ef4444', margin: '0 auto' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>

          {/* CỘT TRÁI: Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', color: '#0b5e9d' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '5px' }}>Trụ sở chính</h4>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>{shopAddress}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', color: '#0b5e9d' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '5px' }}>Điện thoại & Hotline</h4>
                  <p style={{ color: '#0b5e9d', fontWeight: '800', fontSize: '1.2rem' }}>{shopPhone} - Zalo: {shopZalo}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', color: '#0b5e9d' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '5px' }}>Giờ phục vụ</h4>
                  <p style={{ color: '#666' }}>Sáng: {morningHours}</p>
                  <p style={{ color: '#666' }}>Chiều: {afternoonHours}</p>
                  <p style={{ color: '#666' }}>{workingDays}</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '4px', border: '1px solid #dbeafe' }}>
              <h4 style={{ fontWeight: '800', marginBottom: '10px', color: '#0b5e9d' }}>Hỗ trợ tận nơi?</h4>
              <p style={{ fontSize: '0.95rem', color: '#1e40af', lineHeight: '1.6' }}>
                Kỹ thuật viên của chúng tôi có thể đến tận nhà hoặc văn phòng của bạn tại khu vực Phú Quốc nhanh nhất.
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: Form */}
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            {submitState === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <CheckCircle size={60} style={{ color: '#10b981', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111', marginBottom: '10px' }}>
                  Gửi thành công!
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                  Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                </p>
                <button
                  onClick={() => setSubmitState('idle')}
                  style={{
                    backgroundColor: '#0b5e9d',
                    color: '#fff',
                    padding: '12px 25px',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#374151' }}>Họ tên khách hàng *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Nhập tên"
                    required
                    style={{ border: '1px solid #d1d5db', padding: '12px 15px', borderRadius: '4px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#374151' }}>Số điện thoại *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ví dụ: 0912xxxxxx"
                    required
                    style={{ border: '1px solid #d1d5db', padding: '12px 15px', borderRadius: '4px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#374151' }}>Nội dung cần hỗ trợ *</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mô tả lỗi máy hoặc dịch vụ bạn quan tâm..."
                    required
                    style={{ border: '1px solid #d1d5db', padding: '12px 15px', borderRadius: '4px', outline: 'none', resize: 'none' }}
                  ></textarea>
                </div>

                {submitState === 'error' && (
                  <div style={{ padding: '10px 15px', backgroundColor: '#fef2f2', borderRadius: '4px', fontSize: '0.9rem', color: '#dc2626', border: '1px solid #fecaca' }}>
                    ❌ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  style={{
                    backgroundColor: submitState === 'loading' ? '#93c5fd' : '#0b5e9d',
                    color: '#fff',
                    padding: '15px',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '800',
                    fontFamily: 'inherit',
                    cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  {submitState === 'loading' ? (
                    <>
                      <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                      ĐANG GỬI...
                    </>
                  ) : (
                    <>
                      GỬI YÊU CẦU TƯ VẤN <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4. MAP */}
        <div style={{ marginTop: '80px', height: '400px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="LAPTOP PHÚ QUỐC"
          ></iframe>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        input:focus, textarea:focus { border-color: #0b5e9d !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default LienHe;
