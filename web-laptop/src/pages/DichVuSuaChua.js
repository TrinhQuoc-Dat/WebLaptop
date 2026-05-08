import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const DichVuSuaChua = () => {
  usePageTitle('Dịch vụ sửa chữa');
  return (
    <div className="dich-vu-sua-chua" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <section
        className="hero-banner"
        style={{
          position: 'relative',
          backgroundImage: 'url("https://images.unsplash.com/photo-1593640495253-23196b27a87f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, padding: '0 20px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase' }}>Dịch Vụ Sửa Chữa Laptop Uy Tín</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 20px', lineHeight: '1.6' }}>
            Khắc phục mọi sự cố phần cứng, phần mềm. Chuyên nghiệp, nhanh chóng, bảo hành dài hạn.
          </p>
          <button style={{
            backgroundColor: '#0ea5e9',
            color: '#fff',
            border: 'none',
            padding: '12px 30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>LIÊN HỆ NGAY</button>
        </div>
      </section>

      <section style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#0ea5e9', textTransform: 'uppercase', marginBottom: '20px', fontSize: '2rem' }}>Dịch vụ sửa chữa laptop uy tín - Giá rẻ tại TP.HCM</h2>
          <p style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.2rem' }}>Laptop bạn đang sử dụng có vấn đề, cần tìm kiếm một <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>Dịch vụ sửa chữa Laptop</span> Uy tín - Chuyên nghiệp, có giá cả phải chăng. Nhận sửa đa dạng các hãng như: Dell, HP, Acer, Asus, Lenovo,.... thời gian gian sửa chữa nhanh chóng, cam kết linh kiện chính hãng, báo giá cạnh tranh nhất thị trường hiện nay.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Thay Màn Hình Laptop', img: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { title: 'Thay Pin Chính Hãng', img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { title: 'Sửa Nguồn, Mainboard', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { title: 'Vệ Sinh Laptop', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
            ].map((svc, idx) => (
              <Link key={idx} to="/lien-he" style={{ textDecoration: 'none', display: 'block', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <h3 style={{ padding: '20px 10px', fontSize: '1.2rem', color: '#333', margin: 0 }}>{svc.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 20px', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <Link to="/lien-he" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '200px', backgroundImage: 'url("https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'block', textDecoration: 'none' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '30px' }}>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 10px 0' }}>Sửa Bàn Phím Laptop</h3>
                <p style={{ color: '#ffeb3b', fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>GIẢM NGAY 30%</p>
              </div>
            </Link>
            <Link to="/lien-he" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '200px', backgroundImage: 'url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'block', textDecoration: 'none' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(14, 165, 233, 0.7)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '30px' }}>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', margin: '0 0 10px 0' }}>Sửa Mainboard Máy Tính</h3>
                <p style={{ color: '#ffeb3b', fontSize: '1.4rem', fontWeight: 'bold', margin: 0 }}>GIẢM ĐẾN 10%</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#d32f2f', fontSize: '2rem', marginBottom: '30px', fontWeight: 'bold' }}>Khi nào nên đi kiểm tra, sửa chữa Laptop</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333', fontSize: '1.1rem' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #333', padding: '15px', backgroundColor: '#fff', color: '#333', textAlign: 'center', width: '50%', fontWeight: 'bold' }}>Dấu hiệu</th>
                  <th style={{ border: '1px solid #333', padding: '15px', backgroundColor: '#fff', color: '#333', textAlign: 'center', width: '50%', fontWeight: 'bold' }}>Một số nguyên nhân</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { signal: 'Laptop không lên nguồn, hoặc lên nguồn nhưng không lên hình', reason: 'Hư nút mở nguồn, Lỗi mainboard, hư nút nguồn,....' },
                  { signal: 'Màn hình sọc', reason: 'Hư màn hình, cấn, bể' },
                  { signal: 'Laptop thường đơ, giật lag', reason: 'Lỗi Hệ điều hành, Main,..' },
                  { signal: 'Laptop không dùng được PIN', reason: 'Hư PIN, PIN bị chai, Lỗi mạch sạc PIN,...' },
                  { signal: 'Mở laptop bị trắng màn hình', reason: 'Hư cáp, lỏng cáp màn hình, Hư màn hình, lỗi cáp VGA,...' },
                  { signal: 'Laptop bị treo khi sử dụng', reason: 'Lỗi Windows, lỗi Mainboard,...' },
                  { signal: 'Laptop bị mất âm thanh', reason: 'Hư loa, lỗi chip âm thanh, lỗi Driver' },
                  { signal: 'Phím bấm không được, dính phím', reason: 'Lỗi bàn phím, lỏng cáp, Lỗi chip I/O,...' },
                  { signal: 'Laptop không gập lại được', reason: 'Gãy bản lề laptop' },
                  { signal: 'Laptop không vào được WiFi', reason: 'Hư Card mạng' },
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ border: '1px solid #999', padding: '12px 15px', color: '#444' }}>{item.signal}</td>
                    <td style={{ border: '1px solid #999', padding: '12px 15px', color: '#444' }}>{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section style={{ padding: '60px 20px', backgroundColor: '#f9f9f9' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', lineHeight: '1.8' }}>
          <h2 style={{ textAlign: 'center', color: '#0ea5e9', fontSize: '2rem', marginBottom: '40px', textTransform: 'uppercase' }}>Quy Trình Sửa Chữa Chuyên Nghiệp</h2>

          <h4 style={{ fontSize: '1.3rem', color: '#d32f2f', marginBottom: '10px' }}>Bước 1: Tiếp nhận và kiểm tra</h4>
          <p style={{ marginBottom: '20px', fontSize: '1rem', color: '#555' }}>
            Kỹ thuật viên sẽ tiếp nhận laptop từ khách hàng, lắng nghe các mô tả về lỗi. Sau đó tiến hành kiểm tra tổng thể phần cứng và phần mềm để xác định chính xác nguyên nhân gây bệnh.
          </p>


          <h4 style={{ fontSize: '1.3rem', color: '#d32f2f', marginBottom: '10px' }}>Bước 2: Báo giá và chốt phương án</h4>
          <p style={{ marginBottom: '20px', fontSize: '1rem', color: '#555' }}>
            Dựa trên kết quả kiểm tra, chúng tôi sẽ đưa ra phương án xử lý tối ưu nhất kèm báo giá chi tiết, công khai. Chỉ khi khách hàng đồng ý, kỹ thuật viên mới tiến hành can thiệp vào máy.
          </p>


          <h4 style={{ fontSize: '1.3rem', color: '#d32f2f', marginBottom: '10px' }}>Bước 3: Thực hiện sửa chữa</h4>
          <p style={{ marginBottom: '20px', fontSize: '1rem', color: '#555' }}>
            Kỹ thuật viên sử dụng máy móc chuyên dụng để tiến hành thay thế hoặc sửa chữa linh kiện. Đối với các lỗi đơn giản, khách hàng có thể ngồi đợi và lấy máy ngay trong 30 phút rảnh rỗi chờ đợi.
          </p>
        </div>
      </section>


      <section style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#0ea5e9', fontSize: '2rem', marginBottom: '40px', textTransform: 'uppercase' }}>Các Lỗi Phổ Biến Ở Laptop</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '30px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <div style={{ flex: '1 1 300px', paddingRight: '20px' }}>
                <h3 style={{ color: '#d32f2f', fontSize: '1.5rem', marginBottom: '15px' }}>1. Sửa nguồn laptop</h3>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Dấu hiệu:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px', color: '#555' }}>
                  <li>Máy bật không lên nguồn, quạt không quay.</li>
                  <li>Cắm sạc không sáng đèn báo hiệu.</li>
                </ul>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nguyên nhân:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px', color: '#555' }}>
                  <li>Cháy IC nguồn, lỗi mạch mainboard.</li>
                  <li>Nút nguồn bị liệt hỏng.</li>
                </ul>
                <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Bảng giá tham khảo:</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                  <thead>
                    <tr><th style={{ border: '1px solid #ddd', padding: '8px', background: '#eee' }}>Dịch vụ</th><th style={{ border: '1px solid #ddd', padding: '8px', background: '#eee' }}>Giá</th></tr>
                  </thead>
                  <tbody>
                    <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Sửa nguồn phổ thông</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>300k - 500k</td></tr>
                    <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Sửa nguồn Gaming/Mac</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>600k - 1tr2</td></tr>
                  </tbody>
                </table>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Lưu ý:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', marginBottom: '15px' }}>
                  <li>Không cố gắng cắm lại sạc liên tục để tránh chập mạch nặng hơn.</li>
                </ul>
                <Link to="/lien-he" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0ea5e9', color: '#fff', padding: '10px 18px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none' }}>
                  <MessageCircle size={18} /> LIÊN HỆ SỬA CHỮA NGAY
                </Link>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775146180/matnguonlaptop-9624_xavwie.jpg" alt="Sửa nguồn laptop" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '30px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <div style={{ flex: '1 1 300px', paddingRight: '20px' }}>
                <h3 style={{ color: '#d32f2f', fontSize: '1.5rem', marginBottom: '15px' }}>2. Thay pin laptop</h3>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Dấu hiệu:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px', color: '#555' }}>
                  <li>Rút sạc là tắt máy ngay lập tức.</li>
                  <li>Pin bị phồng đội vỏ ngoài, báo dấu X đỏ ở khay hệ thống.</li>
                </ul>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nguyên nhân:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px', color: '#555' }}>
                  <li>Pin hao mòn, chai sau thời gian dài sử dụng.</li>
                  <li>Máy bị quá nhiệt hoặc thói quen cắm sạc không đúng cách.</li>
                </ul>
                <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Bảng giá tham khảo:</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                  <thead>
                    <tr><th style={{ border: '1px solid #ddd', padding: '8px', background: '#eee' }}>Dịch vụ</th><th style={{ border: '1px solid #ddd', padding: '8px', background: '#eee' }}>Giá</th></tr>
                  </thead>
                  <tbody>
                    <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Thay pin thay thế</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>400k - 600k</td></tr>
                    <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Thay pin zin chính hãng</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>800k - 1tr5</td></tr>
                  </tbody>
                </table>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Lưu ý:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', marginBottom: '15px' }}>
                  <li>Nên tiến hành xả pin (dùng đến 15% rồi sạc đầy) vài lần đầu sau khi châm pin mới.</li>
                </ul>
                <Link to="/lien-he" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0ea5e9', color: '#fff', padding: '10px 18px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none' }}>
                  <MessageCircle size={18} /> LIÊN HỆ SỬA CHỮA NGAY
                </Link>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775146180/dich-vu-thay-pin-laptop-thay-pin-may-tinh-xach-tay-eyihbk9f_rgk0fe.jpg" alt="Thay pin laptop" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '30px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <div style={{ flex: '1 1 300px', paddingRight: '20px' }}>
                <h3 style={{ color: '#d32f2f', fontSize: '1.5rem', marginBottom: '15px' }}>3. Thay bản lề laptop</h3>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Dấu hiệu:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px', color: '#555' }}>
                  <li>Gập mở màn hình thấy chật cứng hoặc quá lỏng lẻo.</li>
                  <li>Bể vỏ nhựa khu vực cắm bản lề, hở khớp máy.</li>
                </ul>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nguyên nhân:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px', color: '#555' }}>
                  <li>Mở gập máy lệch một bên tay hoặc sập máy mạnh.</li>
                  <li>Khô dầu nhớt trục bản lề theo thời gian gây cứng gãy chân ốc.</li>
                </ul>
                <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Bảng giá tham khảo:</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                  <thead>
                    <tr><th style={{ border: '1px solid #ddd', padding: '8px', background: '#eee' }}>Dịch vụ</th><th style={{ border: '1px solid #ddd', padding: '8px', background: '#eee' }}>Giá</th></tr>
                  </thead>
                  <tbody>
                    <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Hàn nhựa, đắp chân ốc</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>200k - 400k</td></tr>
                    <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Thay bản lề mới</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>400k - 800k</td></tr>
                  </tbody>
                </table>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Lưu ý:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', marginBottom: '15px' }}>
                  <li>Khi gập mở, nên cầm chính giữa viền màn hình thay vì gập góc 1 bên.</li>
                </ul>
                <Link to="/lien-he" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0ea5e9', color: '#fff', padding: '10px 18px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none' }}>
                  <MessageCircle size={18} /> LIÊN HỆ SỬA CHỮA NGAY
                </Link>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775146180/gaybanlelaptop-c48d_b9v4jq.jpg" alt="Thay bản lề laptop" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
              <div style={{ flex: '1 1 300px', paddingRight: '20px' }}>
                <h3 style={{ color: '#d32f2f', fontSize: '1.5rem', marginBottom: '15px' }}>4. Thay màn hình laptop</h3>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Dấu hiệu:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px', color: '#555' }}>
                  <li>Xuất hiện kẻ sọc dọc, ngang, đóm sáng.</li>
                  <li>Màn hình bị tối mờ, bể nứt mặt kính, không hiển thị màu.</li>
                </ul>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nguyên nhân:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px', color: '#555' }}>
                  <li>Cấn đồ vật giữa bàn phím và màn hình khi gập chập.</li>
                  <li>Vô ý làm rơi vỡ máy, lỗi từ nhà sản xuất linh kiện.</li>
                </ul>
                <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Bảng giá tham khảo:</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px' }}>
                  <thead>
                    <tr><th style={{ border: '1px solid #ddd', padding: '8px', background: '#eee' }}>Dịch vụ</th><th style={{ border: '1px solid #ddd', padding: '8px', background: '#eee' }}>Giá</th></tr>
                  </thead>
                  <tbody>
                    <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Màn hình thường (LED, FHD)</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>1tr - 1tr8</td></tr>
                    <tr><td style={{ border: '1px solid #ddd', padding: '8px' }}>Màn hình 4K, Cảm ứng, Oled</td><td style={{ border: '1px solid #ddd', padding: '8px' }}>2tr - 4tr5</td></tr>
                  </tbody>
                </table>
                <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>Lưu ý:</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#555', marginBottom: '15px' }}>
                  <li>Dán cường lực (nếu là mặt kính cảm ứng) hoặc chú ý các vật cọ xát trực tiếp.</li>
                </ul>
                <Link to="/lien-he" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0ea5e9', color: '#fff', padding: '10px 18px', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none' }}>
                  <MessageCircle size={18} /> LIÊN HỆ SỬA CHỮA NGAY
                </Link>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775146179/thay-man-hinh-laptop-3_jezjit.jpg" alt="Thay màn hình laptop" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', color: '#444', lineHeight: '1.8' }}>
          <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2rem', marginBottom: '40px', fontWeight: 'bold' }}>Cách dùng Laptop như thế nào để tránh hư hỏng</h2>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#333', marginBottom: '15px', fontWeight: 'bold' }}>1. Sạc PIN đúng cách:</h3>
            <p style={{ marginBottom: '20px', fontSize: '1rem' }}>
              Nhiều người lầm tưởng PIN bị chai là do sạc nhiều lần, thậm chí còn có người dùng đã tháo PIN ra và sử dụng trực tiếp điện nguồn. Nhưng mà bạn có biết hầu như là mọi mẫu Laptop đều có cơ chế <strong>tự động ngắt PIN</strong> và sử dụng điện nguồn khi sạc đầy. Còn việc PIN chai là do tuổi thọ của PIN đã hết thôi. Tuy nhiên, cách tốt nhất là vẫn dùng bình thường, không nên cắm sạc quá lâu, và đừng quên xả PIN cho máy khoảng <strong>3 - 4 lần/tuần</strong> nhé.
            </p>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775146517/sacpin_umirzn.jpg" alt="Sạc PIN đúng cách" style={{ width: '100%', maxWidth: '800px', borderRadius: '4px' }} />
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#333', marginBottom: '15px', fontWeight: 'bold' }}>2. Vệ sinh Laptop định kỳ:</h3>
            <p style={{ marginBottom: '15px', fontSize: '1rem' }}>
              <strong>Vệ sinh Laptop</strong> định kỳ là một điều cực kỳ quan trọng để hạn chế những hư hỏng nặng ở Mainboard, CPU, GPU hay là quạt tản nhiệt,... Máy chạy chậm, phát ra tiếng ồn lớn.
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '40px', marginBottom: '15px', fontSize: '1rem' }}>
              <li style={{ marginBottom: '10px' }}>Nóng máy do hư quạt tản nhiệt.</li>
              <li style={{ marginBottom: '10px' }}>Kẹt bàn phím.</li>
              <li style={{ marginBottom: '10px' }}>Màn hình bị mờ hoặc trầy xước.</li>
            </ul>
            <p style={{ fontSize: '1rem' }}>
              Tùy thuộc và môi trường làm việc của bạn như thế nào mà nên cân nhắc việc vệ sinh máy định kỳ <strong>1 - 2 lần/năm</strong>. Việc vệ sinh máy cũng khá đơn giản, tuy nhiên nếu bạn không quá am hiểu về cấu tạo của Laptop, trong quá vệ sinh nếu không cẩn thận có thể gây hư hỏng cho máy đấy!
            </p>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src="https://res.cloudinary.com/degewiqpj/image/upload/v1775146520/ve-sinh-laptop-nhanh-lay-lien-tai-linh-trung-thu-duc-4-1_uvczsh.png" alt="Sạc PIN đúng cách" style={{ width: '100%', maxWidth: '800px', borderRadius: '4px' }} />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DichVuSuaChua;
