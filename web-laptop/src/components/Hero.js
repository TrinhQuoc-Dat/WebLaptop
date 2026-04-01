import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <h1 className="hero-title">SỬA CHỮA LAPTOP UY TÍN</h1>
        <p className="hero-desc">Kết nối giải pháp - Phục hồi sức mạnh. Dịch vụ sửa chữa phần cứng và phần mềm chuyên nghiệp, nhanh gọn, bảo hành dài hạn.</p>
        <Link to="/lien-he">
          <button className="btn-primary" style={{ padding: '15px 32px', fontSize: '1.1rem' }}>Tư vấn ngay</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
