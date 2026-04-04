import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, Award, Users, Trash2 } from 'lucide-react';

const LienHe = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
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
            VỀ CHÚNG TÔI - LAPTOPCARE
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: '0.9', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
            Hơn 10 năm kinh nghiệm trong lĩnh vực sửa chữa Laptop chuyên nghiệp tại TP. Hồ Chí Minh.
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
                  <p style={{ color: '#666', lineHeight: '1.6' }}>Số 102 Đường Cách Mạng Tháng 8, Phường 15, Quận 10, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', color: '#0b5e9d' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '5px' }}>Điện thoại & Hotline</h4>
                  <p style={{ color: '#0b5e9d', fontWeight: '800', fontSize: '1.2rem' }}>09xx.xxx.xxx - 028.xxxx.xxxx</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e5e7eb', color: '#0b5e9d' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '5px' }}>Giờ phục vụ</h4>
                  <p style={{ color: '#666' }}>Thứ Hai - Thứ Bảy: 8:00 - 19:30</p>
                  <p style={{ color: '#666' }}>Chủ Nhật: 8:30 - 17:30</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '4px', border: '1px solid #dbeafe' }}>
              <h4 style={{ fontWeight: '800', marginBottom: '10px', color: '#0b5e9d' }}>Hỗ trợ tận nơi?</h4>
              <p style={{ fontSize: '0.95rem', color: '#1e40af', lineHeight: '1.6' }}>
                Kỹ thuật viên của chúng tôi có thể đến tận nhà hoặc văn phòng của bạn tại khu vực TP.HCM trong vòng 30-45 phút.
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: Form */}
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#374151' }}>Họ tên khách hàng *</label>
                <input type="text" placeholder="Nhập tên" required style={{ border: '1px solid #d1d5db', padding: '12px 15px', borderRadius: '4px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#374151' }}>Số điện thoại *</label>
                <input type="tel" placeholder="Ví dụ: 0912xxxxxx" required style={{ border: '1px solid #d1d5db', padding: '12px 15px', borderRadius: '4px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#374151' }}>Nội dung cần hỗ trợ *</label>
                <textarea rows="4" placeholder="Mô tả lỗi máy hoặc dịch vụ bạn quan tâm..." required style={{ border: '1px solid #d1d5db', padding: '12px 15px', borderRadius: '4px', outline: 'none', resize: 'none' }}></textarea>
              </div>
              <button type="submit" style={{
                backgroundColor: '#0b5e9d',
                color: '#fff',
                padding: '15px',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '800',
                fontFamily: 'inherit',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}>
                GỬI YÊU CẦU TƯ VẤN <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* 4. MAP */}
        <div style={{ marginTop: '80px', height: '400px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4602324283146!2d106.66521571474883!3d10.776019392321855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f205c065f49%3A0xc3f606349944d15d!2zMTAyIMSQLiBDw6FjaCBN4bqhbmcgVGjDoW5nIDgsIFBoxrDhu51uZyAxNSwgUXXhuq1uIDEwLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1617439123456!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="LaptopCare"
          ></iframe>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        input:focus, textarea:focus { border-color: #0b5e9d !important; }
      `}} />
    </div>
  );
};

export default LienHe;
