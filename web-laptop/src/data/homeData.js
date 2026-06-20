import React from 'react';
import {
  Clock, DollarSign, Wrench, ShieldCheck,
  Search,
  PowerOff, MonitorOff, ZapOff, Droplets, BatteryWarning,
  ClipboardList, CheckCircle, Eye, Lock, Tag,
  Truck, ShoppingCart, RefreshCw, Phone
} from 'lucide-react';

export const mainServices = [
  { id: 1, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Sửa mainboard laptop", desc: "Mất nguồn, chập cháy, không lên hình." },
  { id: 2, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Sửa MacBook mất nguồn", desc: "Xử lý triệt để lỗi không lên, phần cứng chuyên sâu." },
  { id: 3, image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Sửa PC & Desktop", desc: "Mất nguồn, khởi động lại, quạt quay không hình." },
  { id: 4, image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Cài Win & Vệ sinh", desc: "Thay keo tản nhiệt, nâng cấp SSD/RAM nhanh chóng." },
  { id: 5, image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", title: "Thay phím & Màn hình", desc: "Thay linh kiện lấy liền, gia cố bản lề laptop." },
  { id: 6, image: "https://res.cloudinary.com/degewiqpj/image/upload/v1775487551/ve-sinh-laptop-6-thang_x2zbef.webp", title: "Kiểm tra lỗi Miễn Phí", desc: "Khám bệnh máy và báo lỗi hoàn toàn miễn phí." }
];

export const strengths = [
  { icon: <Clock size={40} />, title: "Kinh nghiệm 10+ năm", desc: "Chuyên sâu về sửa chữa mainboard với kỹ thuật tay nghề cao tại Phú Quốc." },
  { icon: <Search size={40} />, title: "Báo đúng bệnh", desc: "Kiểm tra minh bạch, không vẽ thêm lỗi, báo giá rõ ràng." },
  { icon: <Tag size={40} />, title: "Giá cả hợp lý", desc: "Chi phí cạnh tranh đi kèm chế độ bảo hành hậu mãi dài hạn." },
  { icon: <CheckCircle size={40} />, title: "Test kỹ trước khi giao", desc: "Máy được kiểm tra ổn định nghiêm ngặt trước khi bàn giao cho khách." }
];

export const arrowButtons = [
  'SỬA MACBOOK', 'SỬA LAPTOP DELL', 'SỬA LAPTOP ASUS', 'SỬA LAPTOP HP', 'SỬA SURFACE'
];

export const warningSigns = [
  { icon: <PowerOff size={32} />, text: "Laptop không lên nguồn" },
  { icon: <MonitorOff size={32} />, text: "Máy lên nhưng không hiển thị" },
  { icon: <ZapOff size={32} />, text: "Sập nguồn đột ngột" },
  { icon: <Droplets size={32} />, text: "Dính nước (MacBook/Laptop)" },
  { icon: <BatteryWarning size={32} />, text: "Không nhận sạc" }
];

export const processSteps = [
  { icon: <ClipboardList size={28} />, title: "Nhận máy & Kiểm tra", desc: "Ghi nhận hiện trạng và kiểm tra tổng quát lỗi máy." },
  { icon: <DollarSign size={28} />, title: "Báo lỗi & Báo giá", desc: "Thông báo chính xác nguyên nhân và chi phí sửa chữa." },
  { icon: <Wrench size={28} />, title: "Tiến hành sửa", desc: "Sửa chữa nhanh chóng, chuyên nghiệp bởi kỹ thuật viên." },
  { icon: <CheckCircle size={28} />, title: "Test kỹ & Bàn giao", desc: "Kiểm tra độ ổn định và bàn giao máy hoàn thiện." }
];

export const supportItems = [
  { icon: <Truck size={36} />, title: "Giao Hàng Tận Nơi", desc: "Trên Toàn Quốc" },
  { icon: <ShoppingCart size={36} />, title: "Đặt Hàng Trực Tuyến", desc: "Nhanh Chóng, Dễ Dàng" },
  { icon: <RefreshCw size={36} />, title: "Đổi Trả Dễ Dàng", desc: "Sản Phẩm Trong 7 Ngày" },
  { icon: <Phone size={36} />, title: "Hotline Hỗ Trợ 24/7", desc: "Giao Tại Phú Quốc 24h" }
];

export const commitments = [
  { icon: <ShieldCheck size={36} />, title: "Không tráo linh kiện", desc: "Minh bạch tuyệt đối, khách hàng có thể ký tên lên linh kiện." },
  { icon: <Eye size={36} />, title: "Sửa chữa minh bạch", desc: "Báo giá rõ ràng, không vẻ bệnh, bảo hành đúng cam kết." },
  { icon: <Lock size={36} />, title: "Bảo mật dữ liệu", desc: "Cam kết an toàn tuyệt đối cho dữ liệu cá nhân của khách." },
  { icon: <Tag size={36} />, title: "Giá cả tối ưu", desc: "Luôn mang lại mức giá tốt nhất đi cùng chất lượng dịch vụ." }
];
