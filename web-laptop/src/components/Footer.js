import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Thông tin công ty</h4>
            <p style={{ marginBottom: '1rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              LaptopCare chuyên cung cấp các dịch vụ sửa chữa và bảo dưỡng laptop uy tín, chất lượng tại Việt Nam.
            </p>
          </div>
          <div className="footer-col">
            <h4>Dịch vụ</h4>
            <ul>
              <li><Link to="/dich-vu">Sửa laptop văn phòng</Link></li>
              <li><Link to="/dich-vu">Sửa Macbook</Link></li>
              <li><Link to="/phan-mem">Cài đặt phần mềm</Link></li>
              <li><Link to="/dich-vu">Bảo dưỡng định kỳ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Thông tin chung</h4>
            <ul>
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/bang-gia">Bảng giá tham khảo</Link></li>
              <li><Link to="/lien-he">Chính sách bảo hành</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Liên hệ</h4>
            <ul style={{ gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MapPin size={18} /> 123 Đường Điện Biên Phủ, Quận 1, TP. HCM
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} /> Hotline: 1900 6868
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} /> cskh@laptopcare.vn
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} LaptopCare. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
