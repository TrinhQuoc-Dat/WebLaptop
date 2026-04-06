import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <h1 className="hero-title">Laptop Phú Quốc – Chuyên Sửa Mainboard Laptop, MacBook, PC, Card VGA</h1>
        <p className="hero-desc">Sửa chữa Mainboard – Uy tín tại Phú Quốc.</p>
        <Link to="/lien-he">
          <button className="btn-primary" style={{ padding: '15px 32px', fontSize: '1.1rem' }}>Tư vấn ngay</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
