import React, { useState, useEffect } from 'react';
import { getPriceList } from '../services/api';
import { Loader } from 'lucide-react';

const FALLBACK_DATA = [
  {
    tinhTrang: "Laptop cắm sạc đèn báo sáng nhưng không lên nguồn",
    loi: "Lỗi nhẹ: Hư nút mở nguồn",
    gia: "Từ 100.000đ",
    baoHanh: "3 tháng"
  },
  {
    tinhTrang: "Laptop không nhận sạc, sạc lúc được lúc không",
    loi: "Hỏng jack nguồn (DC Jack) hoặc đứt dây sạc",
    gia: "250.000đ - 450.000đ",
    baoHanh: "6 tháng"
  },
  {
    tinhTrang: "Màn hình laptop bị sọc ngang, dọc hoặc nhòe màu",
    loi: "Lỗi cáp màn hình hoặc hỏng tấm nền LCD",
    gia: "Từ 850.000đ",
    baoHanh: "6-12 tháng"
  },
  {
    tinhTrang: "Bàn phím không gõ được một số phím hoặc nhảy phím",
    loi: "Chập mạch bàn phím hoặc hỏng socket",
    gia: "200.000đ - 450.000đ",
    baoHanh: "6 tháng"
  },
  {
    tinhTrang: "Laptop chạy rất nóng, quạt kêu to rồi tắt máy",
    loi: "Khô keo tản nhiệt, quạt bẩn hoặc hỏng quạt",
    gia: "150.000đ - 350.000đ",
    baoHanh: "1 tháng"
  },
  {
    tinhTrang: "Laptop không vào được Windows, báo lỗi 'No bootable device'",
    loi: "Hỏng ổ cứng hoặc lỗi phân vùng hệ điều hành",
    gia: "Từ 550.000đ (SSD mới)",
    baoHanh: "36 tháng"
  },
  {
    tinhTrang: "Máy tính không nhận Wifi hoặc bắt sóng yếu",
    loi: "Lỗi card Wifi hoặc lỏng dây anten",
    gia: "250.000đ - 550.000đ",
    baoHanh: "6 tháng"
  },
  {
    tinhTrang: "Loa laptop bị rè, nhỏ hoặc mất tiếng hoàn toàn",
    loi: "Rách màng loa hoặc hỏng chip âm thanh",
    gia: "250.000đ - 450.000đ",
    baoHanh: "3 tháng"
  },
  {
    tinhTrang: "Laptop bị đổ nước, chất lỏng vào máy",
    loi: "Chạm mạch mainboard, oxi hóa linh kiện",
    gia: "Kiểm tra báo giá sau",
    baoHanh: "3-6 tháng"
  },
  {
    tinhTrang: "Máy đang dùng tự tắt đột ngột, bật lại không lên",
    loi: "Lỗi chipset, IO hoặc nguồn trên mainboard",
    gia: "Từ 450.000đ",
    baoHanh: "3 tháng"
  },
  {
    tinhTrang: "Không nhận USB, chuột cảm ứng (Touchpad) không dùng được",
    loi: "Lỗi cổng kết nối hoặc controller trên main",
    gia: "250.000đ - 650.000đ",
    baoHanh: "3 tháng"
  },
  {
    tinhTrang: "Laptop không giữ được pin, rút sạc tắt máy ngay",
    loi: "Pin bị chai hoàn toàn hoặc hỏng mạch sạc",
    gia: "Từ 450.000đ",
    baoHanh: "6-12 tháng"
  },
  {
    tinhTrang: "Máy chạy chậm, treo máy thường xuyên",
    loi: "Thiếu RAM hoặc ổ cứng HDD cũ chạy chậm",
    gia: "Từ 350.000đ",
    baoHanh: "36 tháng"
  },
  {
    tinhTrang: "Vỡ bản lề, gập mở máy khó khăn",
    loi: "Gãy chân ốc bản lề hoặc gãy thanh sắt bản lề",
    gia: "200.000đ - 450.000đ",
    baoHanh: "Vĩnh viễn (gia cố)"
  },
  {
    tinhTrang: "Laptop bị quên mật khẩu BIOS hoặc mật khẩu Windows",
    loi: "Lỗi bảo mật phần mềm/phần cứng",
    gia: "100.000đ - 300.000đ",
    baoHanh: "Theo máy"
  }
];

const BangGia = () => {
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchPrices() {
      setLoading(true);
      try {
        const data = await getPriceList();
        if (!cancelled) {
          setPriceData(data);
          setIsOffline(false);
        }
      } catch (err) {
        console.warn('[BangGia] API error, dùng data cục bộ:', err.message);
        if (!cancelled) {
          setPriceData(FALLBACK_DATA);
          setIsOffline(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPrices();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f8f9fa', padding: '40px 0', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <Loader size={40} style={{ marginBottom: '15px', animation: 'spin 1s linear infinite' }} />
          <p>Đang tải bảng giá...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '40px 0', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            color: '#1a1a1a', 
            marginBottom: '15px',
            textTransform: 'uppercase'
          }}>
            Bảng giá dịch vụ sửa chữa Laptop
          </h1>
          <div style={{ 
            width: '60px', 
            height: '4px', 
            backgroundColor: '#ef4444', 
            margin: '0 auto 20px' 
          }}></div>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            color: '#666', 
            lineHeight: '1.7',
            fontSize: '1.05rem'
          }}>
            <p>LAPTOP PHÚ QUỐC cam kết minh bạch về giá cả dịch vụ. Tất cả các thiết bị đều được kỹ thuật viên kiểm tra kỹ lưỡng và báo giá chính xác cho khách hàng trước khi tiến hành sửa chữa.</p>
            <p>Mức giá thực tế có thể thay đổi tùy thuộc vào tình trạng hư hỏng, linh kiện thay thế và độ hiếm của dòng máy.</p>
          </div>
        </div>

        {isOffline && (
          <div style={{ padding: '10px 15px', backgroundColor: '#fef3c7', borderRadius: '4px', marginBottom: '20px', fontSize: '0.9rem', color: '#92400e', border: '1px solid #fde68a' }}>
            ⚠️ Không kết nối được API — đang hiển thị dữ liệu mẫu.
          </div>
        )}

        <div style={{ 
          backgroundColor: '#fff', 
          borderRadius: '4px', 
          overflow: 'hidden', 
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              textAlign: 'left',
              minWidth: '800px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#0b5e9d', color: '#fff' }}>
                  <th style={{ padding: '20px 24px', fontWeight: '700', borderBottom: '2px solid #084a7a' }}>Tình trạng thiết bị</th>
                  <th style={{ padding: '20px 24px', fontWeight: '700', borderBottom: '2px solid #084a7a' }}>Dự đoán lỗi</th>
                  <th style={{ padding: '20px 24px', fontWeight: '700', borderBottom: '2px solid #084a7a' }}>Chi phí dự kiến</th>
                  <th style={{ padding: '20px 24px', fontWeight: '700', borderBottom: '2px solid #084a7a' }}>Thời hạn bảo hành</th>
                </tr>
              </thead>
              <tbody>
                {priceData.map((item, index) => (
                  <tr 
                    key={item.id || index} 
                    style={{ 
                      borderBottom: '1px solid #eee',
                      transition: 'background-color 0.2s',
                    }}
                    className="price-table-row"
                  >
                    <td style={{ padding: '18px 24px', fontWeight: '600', color: '#111827' }}>{item.tinhTrang}</td>
                    <td style={{ padding: '18px 24px', color: '#4b5563' }}>{item.loi}</td>
                    <td style={{ padding: '18px 24px', color: '#0b5e9d', fontWeight: '700' }}>{item.gia}</td>
                    <td style={{ padding: '18px 24px', color: '#059669', fontWeight: '600' }}>{item.baoHanh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem', fontStyle: 'italic' }}>
          * Lưu ý: Bảng giá trên chỉ mang tính chất tham khảo. Vui lòng liên hệ Hotline: 0815 774 668 để được hỗ trợ báo giá chính xác nhất.
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .price-table-row:hover {
          background-color: #f8fafc;
        }
        @media (max-width: 768px) {
          .container {
            padding: 0 15px;
          }
        }
      `}} />
    </div>
  );
};

export default BangGia;
