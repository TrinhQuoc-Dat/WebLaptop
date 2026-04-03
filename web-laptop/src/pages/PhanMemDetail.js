import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { phanMemData } from '../data/phanMemData';
import { ChevronLeft, Info, Wrench, CheckCircle, Package, ShieldCheck, ListOrdered, DollarSign } from 'lucide-react';

const PhanMemDetail = () => {
  const { id } = useParams();
  const article = phanMemData.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy nội dung bài viết.</h1>
        <Link to="/phan-mem" className="text-blue-600 hover:underline mt-4 inline-block"> Quay lại trang danh sách </Link>
      </div>
    );
  }

  const { content, title, thumbnail } = article;

  return (
    <article className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 max-w-[850px]">
        {/* Breadcrumbs */}
        <nav className="breadcrumb py-6">
          <Link to="/">LaptopCare</Link>
          <span className="separator">/</span>
          <Link to="/phan-mem">Phần mềm</Link>
          <span className="separator">/</span>
          <span className="current">{title}</span>
        </nav>

        {/* Content Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            {title}
          </h1>
          <div className="bg-gray-100 p-6 rounded-xl border-l-4 border-blue-600 italic text-gray-700 leading-relaxed">
            {content.intro}
          </div>
        </header>

        {/* Feature Image */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg aspect-video">
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* SECTION 1: DẤU HIỆU */}
        <section id="section-1" className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center mb-6 pb-2 border-b">
            <Info className="w-6 h-6 mr-3 text-blue-600" />
            Dấu hiệu cần lưu ý
          </h2>
          <ul className="space-y-4">
            {content.signs.map((sign, idx) => (
              <li key={idx} className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2.5 mr-4 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg leading-relaxed">{sign}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 2: CÁCH KHẮC PHỤC (Mỗi ý là 1 đoạn text) */}
        <section id="section-2" className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center mb-6 pb-2 border-b">
            <Wrench className="w-6 h-6 mr-3 text-blue-600" />
            Cách khắc phục hiệu quả
          </h2>
          <div className="space-y-6">
            {content.fixes.map((fix, idx) => (
              <div key={idx}>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                   {fix}
                </p>
                {/* Interleaved placeholders if needed, or just more text */}
                {idx === 1 && (
                  <div className="my-8 rounded-xl overflow-hidden shadow-md">
                    <img src={`https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&idx=${idx}`} alt="Diagnostic" className="w-full h-auto" />
                    <p className="text-sm text-center text-gray-500 py-2 bg-gray-50">Hình ảnh minh họa quá trình kiểm tra phần cứng</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: CHI PHÍ */}
        <section id="section-3" className="mb-12 bg-blue-50 p-8 rounded-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center mb-6">
            <DollarSign className="w-6 h-6 mr-2 text-blue-600" />
            Báo giá dịch vụ tham khảo
          </h2>
          <ul className="space-y-3">
            {content.cost.map((item, idx) => (
              <li key={idx} className="flex items-center text-gray-800 text-lg font-medium">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-500 italic">
            * Lưu ý: Giá có thể thay đổi tùy vào đời máy và tình trạng linh kiện thực tế.
          </p>
        </section>

        {/* SECTION 4: GIỚI THIỆU DỊCH VỤ */}
        <section id="section-4" className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center mb-6 pb-2 border-b">
            <Package className="w-6 h-6 mr-3 text-blue-600" />
            Dịch vụ của chúng tôi
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed px-2">
            {content.service}
          </p>
          <div className="my-8 rounded-xl overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1597733336794-12d05021d510?w=800&q=80" alt="Repair Service" className="w-full h-auto" />
            <p className="text-sm text-center text-gray-500 py-2 bg-gray-50">Trung tâm sửa chữa chuyên nghiệp tận tâm</p>
          </div>
        </section>

        {/* SECTION 5: LỢI ÍCH */}
        <section id="section-5" className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center mb-6 pb-2 border-b">
            <ShieldCheck className="w-6 h-6 mr-3 text-blue-600" />
            Lợi ích khi chọn dịch vụ
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.benefits.map((benefit, idx) => (
              <li key={idx} className="bg-gray-50 p-4 rounded-xl flex items-start border border-gray-100">
                <CheckCircle className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 6: QUY TRÌNH */}
        <section id="section-6" className="mb-12">
          <h2 className="text-2xl font-bold text-blue-900 flex items-center mb-8 pb-2 border-b">
            <ListOrdered className="w-6 h-6 mr-3 text-blue-600" />
            Quy trình làm việc chuyên nghiệp
          </h2>
          <div className="relative pl-8 border-l-2 border-blue-100 ml-4 space-y-10">
            {content.steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] top-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Bước {idx + 1}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Contact */}
        <div className="mt-20 border-t pt-10 text-center">
            <p className="text-gray-500 mb-4">Bạn gặp vấn đề phần mềm khó giải quyết?</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg">
                GỌI TƯ VẤN MIỄN PHÍ
            </button>
        </div>
      </div>
    </article>
  );
};

export default PhanMemDetail;
