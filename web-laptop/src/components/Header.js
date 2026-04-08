import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo d-flex align-items-center" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <img src="/logo.jpg" alt="Laptop Phú Quốc - Sửa chữa laptop uy tín" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />
          <span>LAPTOP PHÚ QUỐC</span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="nav-menu">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Trang chủ</NavLink>
          <NavLink to="/dich-vu" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Dịch vụ sửa chữa</NavLink>
          <NavLink to="/phan-mem" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Phần mềm</NavLink>
          <NavLink to="/bang-gia" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Bảng giá</NavLink>
          <NavLink to="/lien-he" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Liên hệ</NavLink>
        </nav>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>Trang chủ</NavLink>
          <NavLink to="/dich-vu" className="nav-link" onClick={closeMenu}>Dịch vụ sửa chữa</NavLink>
          <NavLink to="/phan-mem" className="nav-link" onClick={closeMenu}>Phần mềm</NavLink>
          <NavLink to="/bang-gia" className="nav-link" onClick={closeMenu}>Bảng giá</NavLink>
          <NavLink to="/lien-he" className="nav-link" onClick={closeMenu}>Liên hệ</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
