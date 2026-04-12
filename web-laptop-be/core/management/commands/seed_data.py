"""
Management command: seed_data
Import toàn bộ dữ liệu hardcode từ frontend React vào database.
Chạy: python manage.py seed_data
"""

from django.core.management.base import BaseCommand
from core.models import Service, PriceItem, SiteConfig
from blog.models import Category, Article, ArticleSign, ArticleFix, ArticleCost, ArticleBenefit


class Command(BaseCommand):
    help = 'Seed database với dữ liệu từ frontend React (homeData.js, phanMemData.js, BangGia.js)'

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING('\n🚀 Bắt đầu seed data...\n'))

        self._seed_site_config()
        self._seed_services()
        self._seed_price_items()
        self._seed_categories()
        self._seed_articles()

        self.stdout.write(self.style.SUCCESS('\n✅ Seed data hoàn tất!\n'))

    # ─────────────────────────────────────────────
    # SITE CONFIG
    # ─────────────────────────────────────────────
    def _seed_site_config(self):
        config = SiteConfig.get_instance()
        self.stdout.write(f'  ✓ SiteConfig: {config.shop_name}')

    # ─────────────────────────────────────────────
    # SERVICES (từ homeData.js → mainServices)
    # ─────────────────────────────────────────────
    def _seed_services(self):
        services_data = [
            {
                'title': 'Sửa mainboard laptop',
                'description': 'Mất nguồn, chập cháy, không lên hình.',
            },
            {
                'title': 'Sửa MacBook mất nguồn',
                'description': 'Xử lý triệt để lỗi không lên, phần cứng chuyên sâu.',
            },
            {
                'title': 'Sửa PC & Desktop',
                'description': 'Mất nguồn, khởi động lại, quạt quay không hình.',
            },
            {
                'title': 'Cài Win & Vệ sinh',
                'description': 'Thay keo tản nhiệt, nâng cấp SSD/RAM nhanh chóng.',
            },
            {
                'title': 'Thay phím & Màn hình',
                'description': 'Thay linh kiện lấy liền, gia cố bản lề laptop.',
            },
            {
                'title': 'Kiểm tra lỗi Miễn Phí',
                'description': 'Khám bệnh máy và báo lỗi hoàn toàn miễn phí.',
            },
        ]

        if Service.objects.exists():
            self.stdout.write('  ⏭  Services đã tồn tại, bỏ qua.')
            return

        for idx, svc in enumerate(services_data):
            Service.objects.create(order=idx, is_active=True, **svc)

        self.stdout.write(f'  ✓ Đã tạo {len(services_data)} dịch vụ')

    # ─────────────────────────────────────────────
    # PRICE ITEMS (từ BangGia.js → MOCK_DATA)
    # ─────────────────────────────────────────────
    def _seed_price_items(self):
        price_data = [
            ('Laptop cắm sạc đèn báo sáng nhưng không lên nguồn', 'Lỗi nhẹ: Hư nút mở nguồn', 'Từ 100.000đ', '3 tháng'),
            ('Laptop không nhận sạc, sạc lúc được lúc không', 'Hỏng jack nguồn (DC Jack) hoặc đứt dây sạc', '250.000đ - 450.000đ', '6 tháng'),
            ('Màn hình laptop bị sọc ngang, dọc hoặc nhòe màu', 'Lỗi cáp màn hình hoặc hỏng tấm nền LCD', 'Từ 850.000đ', '6-12 tháng'),
            ('Bàn phím không gõ được một số phím hoặc nhảy phím', 'Chập mạch bàn phím hoặc hỏng socket', '200.000đ - 450.000đ', '6 tháng'),
            ('Laptop chạy rất nóng, quạt kêu to rồi tắt máy', 'Khô keo tản nhiệt, quạt bẩn hoặc hỏng quạt', '150.000đ - 350.000đ', '1 tháng'),
            ("Laptop không vào được Windows, báo lỗi 'No bootable device'", 'Hỏng ổ cứng hoặc lỗi phân vùng hệ điều hành', 'Từ 550.000đ (SSD mới)', '36 tháng'),
            ('Máy tính không nhận Wifi hoặc bắt sóng yếu', 'Lỗi card Wifi hoặc lỏng dây anten', '250.000đ - 550.000đ', '6 tháng'),
            ('Loa laptop bị rè, nhỏ hoặc mất tiếng hoàn toàn', 'Rách màng loa hoặc hỏng chip âm thanh', '250.000đ - 450.000đ', '3 tháng'),
            ('Laptop bị đổ nước, chất lỏng vào máy', 'Chạm mạch mainboard, oxi hóa linh kiện', 'Kiểm tra báo giá sau', '3-6 tháng'),
            ('Máy đang dùng tự tắt đột ngột, bật lại không lên', 'Lỗi chipset, IO hoặc nguồn trên mainboard', 'Từ 450.000đ', '3 tháng'),
            ('Không nhận USB, chuột cảm ứng (Touchpad) không dùng được', 'Lỗi cổng kết nối hoặc controller trên main', '250.000đ - 650.000đ', '3 tháng'),
            ('Laptop không giữ được pin, rút sạc tắt máy ngay', 'Pin bị chai hoàn toàn hoặc hỏng mạch sạc', 'Từ 450.000đ', '6-12 tháng'),
            ('Máy chạy chậm, treo máy thường xuyên', 'Thiếu RAM hoặc ổ cứng HDD cũ chạy chậm', 'Từ 350.000đ', '36 tháng'),
            ('Vỡ bản lề, gập mở máy khó khăn', 'Gãy chân ốc bản lề hoặc gãy thanh sắt bản lề', '200.000đ - 450.000đ', 'Vĩnh viễn (gia cố)'),
            ('Laptop bị quên mật khẩu BIOS hoặc mật khẩu Windows', 'Lỗi bảo mật phần mềm/phần cứng', '100.000đ - 300.000đ', 'Theo máy'),
        ]

        if PriceItem.objects.exists():
            self.stdout.write('  ⏭  PriceItems đã tồn tại, bỏ qua.')
            return

        for idx, (cond, issue, price, warranty) in enumerate(price_data):
            PriceItem.objects.create(
                condition=cond,
                predicted_issue=issue,
                price_range=price,
                warranty=warranty,
                order=idx,
                is_active=True,
            )

        self.stdout.write(f'  ✓ Đã tạo {len(price_data)} mục bảng giá')

    # ─────────────────────────────────────────────
    # CATEGORIES (từ PhanMem.js → CATEGORIES)
    # ─────────────────────────────────────────────
    def _seed_categories(self):
        categories = [
            ('Thay màn hình', 'thay-man-hinh'),
            ('Thay pin', 'thay-pin'),
            ('Sửa nguồn', 'sua-nguon'),
            ('Sửa main', 'sua-main'),
            ('Vệ sinh laptop', 've-sinh-laptop'),
        ]

        if Category.objects.exists():
            self.stdout.write('  ⏭  Categories đã tồn tại, bỏ qua.')
            return

        for idx, (name, slug) in enumerate(categories):
            Category.objects.create(name=name, slug=slug, order=idx)

        self.stdout.write(f'  ✓ Đã tạo {len(categories)} danh mục')

    # ─────────────────────────────────────────────
    # ARTICLES (từ phanMemData.js)
    # ─────────────────────────────────────────────
    def _seed_articles(self):
        if Article.objects.exists():
            self.stdout.write('  ⏭  Articles đã tồn tại, bỏ qua.')
            return

        articles_data = [
            {
                'slug': 'loi-man-hinh-dell-xps',
                'title': 'Hướng dẫn sửa laptop Dell XPS 13-9310 bị lỗi màn hình',
                'description': 'Chi tiết các dấu hiệu và cách khắc phục tình trạng laptop Dell XPS 13 bị lỗi màn hình, nhấp nháy hoặc sọc. Xem ngay cách xử lý nhanh chóng.',
                'category_slug': 'thay-man-hinh',
                'publish_day': '22', 'publish_month': 'May',
                'intro': 'Gần đây, nhiều người dùng laptop Dell XPS 13-9310 phản ánh về tình trạng màn hình bị lỗi, nhấp nháy hoặc xuất hiện các sọc ngang. Đây là một vấn đề khá phổ biến đối với dòng máy này và có thể do nhiều nguyên nhân cốt lõi gây ra.',
                'service_desc': 'Chúng tôi cung cấp dịch vụ chẩn đoán kỹ thuật sâu và sửa chữa phần cứng chuyên nghiệp cho các dòng máy cao cấp. Đảm bảo trị dứt điểm tình trạng lỗi màn hình trên Dell XPS.',
                'signs': [
                    'Màn hình bị giật, nhấp nháy liên tục khi đang sử dụng.',
                    'Xuất hiện các đường sọc ngang hoặc dọc, rác hình trên màn hình.',
                    'Màu sắc hiển thị bị sai lệch, mờ nhạt hoặc ố vàng ở các góc.',
                    'Màn hình hoàn toàn tối đen hoặc chớp tắt dù máy tính vẫn đang hoạt động.',
                ],
                'fixes': [
                    'Khởi động lại máy và Cập nhật Windows: Đôi khi các bản cập nhật chứa bản vá lỗi phần mềm giúp giải quyết tình trạng chớp màn hình.',
                    'Cập nhật hoặc Cài lại Driver Card màn hình: Việc xung đột driver đồ họa là nguyên nhân hàng đầu. Hãy tải driver chuẩn từ trang chủ Dell.',
                    'Kiểm tra lại cáp kết nối bo mạch (Cáp tín hiệu màn hình): Cáp gập mở nhiều có thể bị lỏng hoặc đứt ngầm bên trong nắp bản lề.',
                    'Thay thế nguyên cụm màn hình: Trong trường hợp panel đã hư hỏng vật lý hoặc chết điểm ảnh quá nhiều, việc thay mới là bắt buộc.',
                ],
                'costs': [
                    'Kiểm tra và cắm lại cáp màn hình: 100.000đ - 200.000đ',
                    'Thay thế cáp tín hiệu mới: 350.000đ - 600.000đ',
                    'Thay thế màn hình XPS 13-9310 chính hãng: Liên hệ trực tiếp để có giá tốt nhất theo thời điểm.',
                ],
                'benefits': [
                    'Sử dụng phụ kiện, linh kiện chính hãng 100% để thay thế.',
                    'Đội ngũ kỹ thuật viên am hiểu sâu về các dòng máy siêu mỏng cao cấp.',
                    'Thời gian xử lý nhanh chóng, khách hàng được xem trực tiếp quy trình.',
                    'Có cam kết bảo hành rõ ràng, hoàn tiền nếu lỗi quay trở lại.',
                ],
                'steps': [
                    'Lễ tân tiếp nhận máy và ghi nhận hiện trạng lỗi báo cáo từ khách hàng.',
                    'Kỹ thuật viên test máy minh bạch, phân tích nguyên nhân gây ra lỗi.',
                    'Đưa ra các giải pháp khắc phục đi kèm báo giá minh bạch rõ ràng.',
                    'Tiến hành tháo ráp, thay thế linh kiện dưới sự quan sát của khách hàng.',
                    'Lắp ráp lại hoàn chỉnh và kiểm tra độ ổn định sau khi hoàn thiện.',
                    'Bàn giao lại thiết bị cho khách hàng tự kiểm tra.',
                    'Ghi phiếu thu và cấp giấy bảo hành cho linh kiện mới thay thế.',
                ],
            },
            {
                'slug': 'khac-phuc-laptop-nhap-nhay',
                'title': 'Cách khắc phục laptop bị nhấp nháy màn hình',
                'description': 'Màn hình laptop chớp nháy liên tục không chỉ gây khó chịu mà còn ảnh hưởng đến mắt. Hãy cùng tìm hiểu nguyên nhân và xử lý triệt để.',
                'category_slug': 'thay-man-hinh',
                'publish_day': '01', 'publish_month': 'Jun',
                'intro': 'Tình trạng màn hình laptop nhấp nháy thường xảy ra do lỗi phần mềm, driver không tương thích, hoặc do lỗi phần cứng như cáp nguồn, cáp tín hiệu. Để xử lý tốt, bạn cần chẩn đoán chính xác nguyên nhân.',
                'service_desc': 'Tại đây, chúng tôi hỗ trợ xác định chính xác nguyên nhân gây nhấp nháy màn hình với các công cụ phần cứng chuyên dụng, giúp tiết kiệm thời gian và chi phí cho khách hàng.',
                'signs': ['Màn hình tối đi và sáng lên liên tục theo chu kỳ.', 'Màn hình chớp nhiễu khi di chuyển chuột hoặc gõ phím.', 'Phần nửa dưới màn hình hoạt động bình thường, nửa trên nhấp nháy.', 'Chớp tắt màn hình đi kèm tiếng rung rè lạ từ cụm bản lề.'],
                'fixes': ['Vào Task Manager để xem lỗi thuộc về Windows hay ứng dụng: Nếu Task Manager không nháy, do một ứng dụng bên thứ 3 gây lỗi.', 'Điều chỉnh tần số quét (Refresh Rate) của màn hình về mức chuẩn 60Hz.', 'Cập nhật trình điều khiển Display Adapter trong Device Manager.', 'Mang máy tới trung tâm để thay cáp tín hiệu khi cáp đã cũ, giòn và nứt.'],
                'costs': ['Sửa lỗi phần mềm, cài đặt hệ điều hành: 150.000đ', 'Vệ sinh và cắm lại giắc cáp hở: 150.000đ', 'Thay cấp màn hình phổ thông: 300.000đ - 450.000đ'],
                'benefits': ['Báo đúng lỗi, sửa đúng bệnh, không vẽ thêm bệnh.', 'Chi phí hợp lý sinh viên cũng như người đi làm.', 'Cung cấp tư vấn chăm sóc máy dài hạn, hạn chế tái vỡ hỏng.', 'Trang thiết bị hiện đại, môi trường sửa chữa chuyên nghiệp.'],
                'steps': ['Tiếp nhận yêu cầu từ người dùng tại quầy lễ tân.', 'Chạy bài kiểm tra màn hình và xuất tín hiệu ra màn hình rời.', 'Xác thực lại việc lỗi đến từ phần mềm hay phần cứng cụ thể.', 'Tiến hành thao tác sửa chữa/thay linh kiện dựa trên sự đồng ý của khách.', 'Mở chục tab video chạy liên tục để test sự ổn định của màn hình.', 'Trao trả máy tính lại cho chủ sở hữu.', 'Hoàn tất thủ tục thu phí và ghi chú bảo hành.'],
            },
            {
                'slug': 'thay-pin-co-anh-huong-khong',
                'title': 'Thay pin laptop có ảnh hưởng gì không?',
                'description': 'Nhiều người e ngại việc thay pin mới sẽ làm giảm hiệu suất máy tính hoặc gây chập cháy. Bài viết này sẽ giải đáp chi tiết thắc mắc đó.',
                'category_slug': 'thay-pin',
                'publish_day': '05', 'publish_month': 'May',
                'intro': 'Pin laptop là linh kiện tiêu hao và sẽ bị chai theo năm tháng sử dụng. Việc thay pin là điều sớm muộn, nhưng nhiều khách hàng băn khoăn về quy trình và chất lượng của pin thay thế có tác động tới máy tính của mình hay không.',
                'service_desc': 'Chúng tôi hướng dẫn chi tiết người dùng các thao tác bảo dưỡng pin đúng cách. Cam kết chỉ sử dụng pin đạt tiêu chuẩn chất lượng an toàn.',
                'signs': ['Hệ điều hành Windows cảnh báo pin yếu (Consider replacing your battery).', 'Thời lượng dùng pin chỉ còn dưới 30 phút cho một lần sạc đầy.', 'Biểu tượng pin ở góc màn hình hiện dấu "X" đỏ.', 'Phần vỏ máy khu vực pin bị độn, phồng lên bất thường.'],
                'fixes': ['Sử dụng phần mềm BatteryReport của Windows để theo dõi độ chai thực tế.', 'Khi pin chỉ hao mòn nhẹ, bạn có thể thực hiện căn chỉnh pin (Calibrate) để đọc chỉ số chính xác hơn.', 'Thay thế cell pin (với các dòng pin cổ điển có thể tháo dỡ).', 'Thay mới nguyên cụm pin đối với đa số laptop hiện nay để bảo đảm an toàn cháy nổ.'],
                'costs': ['Thay pin laptop phổ thông (Dell, HP, Asus...): 450.000đ - 700.000đ', 'Thay pin laptop Gaming, Macbook: 900.000đ - 1.800.000đ', 'Thay cell pin rời: 100.000/cell'],
                'benefits': ['An toàn tuyệt đối cho người dùng và thiết bị, pin có thông số dòng điện chuẩn xác.', 'Chế độ bảo hành 1 đổi 1 tới 6-12 tháng tuỳ loại.', 'Thời gian thay thế từ 15-30 phút không làm gián đoạn công việc.', 'Miễn phí vệ sinh tổng thể máy tính đi kèm khi thay pin.'],
                'steps': ['Lắng nghe vấn đề mà thiết bị của bạn đang gặp phải.', 'Sử dụng volt kế và phần mềm đo kiểm độ chai của viên pin hiện tại.', 'Báo giá pin tương thích chuẩn với mã máy của khách hàng.', 'Tiến hành ngắt mạch nguồn ảo và thay thế viên pin mới.', 'Cắm sạc liên tục để xem độ xả nạp của viên pin mới có ổn định không.', 'Bàn giao lại thiết bị, in giấy bảo hành pin.', 'Tư vấn cách dùng và xả sạc trong 3 chu kì đầu tiên.'],
            },
            {
                'slug': 'sua-nguon-bao-lau',
                'title': 'Sửa nguồn laptop mất bao lâu?',
                'description': 'Máy tính bật không lên, mất nguồn hoàn toàn gây hoang mang. Cùng xem quy trình kiểm tra bo mạch và xử lý bộ phận nguồn.',
                'category_slug': 'sua-nguon',
                'publish_day': '12', 'publish_month': 'Apr',
                'intro': 'Lỗi mất nguồn là một trong những ca "nặng" nhất của laptop. Nguyên nhân có thể tới từ sạc hư, IC nguồn chết, chập chạm linh kiện, hoặc CPU lỗi dẫn đến mất nguồn...',
                'service_desc': 'Với các kĩ sư phần cứng dày dặn kinh nghiệm, chúng tôi tự tin nhận xử lý các máy lỗi bo mạch phức tạp mà không thể khởi động nguồn.',
                'signs': ['Cắm sạc không báo đèn tín hiệu, bấm nút nguồn không có phản hồi.', 'Bấm nguồn lên đèn nhấp nháy rồi tắt phụt ngay lập tức.', 'Quạt làm mát vẫn quay nhẹ nhưng màn hình không hiển thị gì.', 'Có mùi khét phát ra từ các rãnh hút gió tản nhiệt.'],
                'fixes': ['Kiểm tra và thay thế củ sạc dự phòng để loại bỏ nguyên nhân hỏng sạc.', 'Tháo pin, giữ đè nút nguồn 30s để xả hết điện tĩnh trong linh kiện rồi cắm sạc thử lại.', 'Thay Jack cắm nguồn của mainboard khi tình trạng sạc bị lỏng, gãy.', 'Sửa chữa bằng cách dò mạch, thay thế IC nguồn hoặc các cuộn cảm, tụ trở trên mainboard.'],
                'costs': ['Thay Jack nguồn cắm điện (DC-IN): 250.000đ - 350.000đ', 'Sửa mạch nguồn cơ bản: 400.000đ - 650.000đ', 'Sửa thay thế IC nguồn, IO, chipset: 800.000đ - 1.500.000đ'],
                'benefits': ['Áp dụng phương pháp dò mạch tiên tiến, tìm nhanh chính xác vị trí chập chạm.', 'Bảo đảm không tổn hại tới dữ liệu cá nhân bên trong thiết bị.', 'Cam kết hoàn tiền khi lỗi quay lại ngoài ý muốn.', 'Giá niêm yết rõ ràng, thông báo phí trước khi tiến hành khò hàn.'],
                'steps': ['Tiếp nhận máy, kí tên lên các linh kiện (RAM, Ổ cứng, Pin, Màn...) để khách an tâm.', 'Kỹ thuật viên đo đạc nhanh xem máy có bị chập nguồn đầu vào không.', 'Tạm nhận lưu lại máy báo khách nếu cần thời gian tháo mainboard đo sâu.', 'Thông báo bệnh cụ thể và gửi chi phí sửa mainboard cho khách duyệt.', 'Tiến hành khò hàn IC lỗi hoặc thay thế chipset.', 'Lắp lại máy và giả lập các tác vụ nặng để kiểm tra nhiệt độ.', 'Gọi trả máy khi đã chạy ổn định 1-2 ngày sau sửa xong.'],
            },
            {
                'slug': 'nang-cap-ram-ssd',
                'title': 'Những lưu ý khi nâng cấp RAM và SSD trên Laptop',
                'description': 'Muốn máy chạy nhanh hơn nhưng bạn chưa rõ việc nâng cấp phần cứng có ảnh hưởng gì tới laptop không? Đọc ngay bài này.',
                'category_slug': 'sua-main',
                'publish_day': '28', 'publish_month': 'Mar',
                'intro': 'Nâng cấp RAM và SSD là cách tiết kiệm nhất giúp laptop của bạn gia tăng đáng kể sức mạnh. Tuy nhiên cần xem máy có khả năng nâng cấp được hay không.',
                'service_desc': 'Chúng tôi hỗ trợ chuyển bản quyền Windows và sao lưu toàn bộ dữ liệu từ ổ cứng cũ sang ổ mới miễn phí khi thay SSD.',
                'signs': ['Máy tính hay bị giật Lag, đơ màn hình khi mở nhiều tab trình duyệt.', 'Ổ đĩa C luôn báo đỏ, không còn dung lượng để chứa tệp.', 'Khởi động vào Windows mất từ 2 tới 5 phút.', 'Ổ cứng có tiếng kêu rọt rẹt, cảnh báo Bad Sector đen.'],
                'fixes': ['Sử dụng Task Manager để nhận định xem nên nâng cấp RAM (hiện 100% dung lượng RAM) hay SSD (hiện 100% tốc độ disk).', 'Xác định loại RAM hỗ trợ (DDR3, DDR4, DDR5) và xung nhịp chuẩn bằng CPU-Z.', 'Gắn thêm ổ đĩa SSD chuẩn NVMe hoặc tháo bỏ ổ đĩa quang (đây là cách cũ).', 'Lắp RAM cùng bus với máy tính để kích hoạt chạy Dual Channel mượt mà.'],
                'costs': ['Nâng cấp RAM 8GB DDR4: 350.000đ - 550.000đ', 'Nâng cấp ổ cứng SSD 250GB: 500.000đ - 650.000đ', 'Nâng cấp ổ cứng SSD 512GB: 850.000đ - 1.050.000đ'],
                'benefits': ['Linh kiện RAM / SSD đến từ các hãng danh tiếng (Samsung, Crucial, Kingston...).', 'Tư vấn nâng cấp tiết kiệm và hiệu quả không thừa không thiếu.', 'Miễn phí lắp đặt, cài đặt HĐH.', 'Bảo hành chính hãng 1 đổi 1 tới 3 hoặc 5 năm với linh kiện SSD.'],
                'steps': ['Tư vấn trực tiếp để định hình nhu cầu cần tốc độ hay dung lượng.', 'Xem xét thông số mainboard thực tế xem có khe cắm rời nâng cấp hay bị hàn chết.', 'Báo giá linh kiện RAM/SSD phù hợp.', 'Tiến hành lắp ráp công khai trước mặt khách hàng (Khoảng 10 phút).', 'Cài win hoàn thiện / Clone ổ và tối ưu hệ điều hành (15 phút).', 'Bàn giao lại thiết bị, khách test sự cách biệt rõ rệt về tốc độ.', 'Thanh toán lấy hóa đơn cùng chế độ bảo hành siêu dài lâu.'],
            },
            {
                'slug': 've-sinh-laptop-dinh-ky',
                'title': 'Tại sao cần vệ sinh laptop định kỳ 6 tháng?',
                'description': 'Bụi bẩn bám lâu ngày là sát thủ thầm lặng gây ra vô vàn lỗi quạt, lỗi quá nhiệt dẫn đến chết chipset trên board mạch.',
                'category_slug': 've-sinh-laptop',
                'publish_day': '15', 'publish_month': 'Feb',
                'intro': 'Quá nhiệt là một trong những nguyên nhân hàng đầu khiến laptop bị hỏng. Máy bị nóng, quạt kêu to đều tới từ lượng bụi đóng băng trên rãnh tản nhiệt',
                'service_desc': 'Quy trình vệ sinh laptop theo chuẩn 5 bước sạch mọi ngóc ngách, thay kem tản nhiệt chất lượng, cam kết hạ từ 10 đến 25 độ C.',
                'signs': ['Nhiệt độ máy tính luôn lớn hơn 85 độ C khi lướt web bình thường.', 'Quạt làm mát rít lên âm thanh lớn gây khó chịu.', 'Bàn phím, vỏ quanh máy tính toả hơi nóng hầm hập.', 'Máy dùng một lúc là tự sập nguồn bảo vệ.'],
                'fixes': ['Với người dùng cá nhân có thể thổi bụi tạm thời bằng bóng bóp tự bơm.', 'Sử dụng keo tản nhiệt xịn (MX4, Thermal Grizzly Kryonaut, Gấu hồng).', 'Tháo hẳn hệ thống làm mát bao gồm quạt và tấm tản đồng để lau cọ xát bụi bẩn.', 'Tra dầu vào trục quay của quạt làm mát nếu quạt bị khô dầu kẹt cứng.'],
                'costs': ['Vệ sinh các loại laptop phổ thông (Thay keo MX4 dán thermal pad mới): 100.000đ - 150.000đ', 'Vệ sinh laptop chuyên dụng (Gaming xôi thịt, Macbook các đời, thay kem kim loại lỏng): 200.000đ - 300.000đ'],
                'benefits': ['Kéo dài tuổi thọ rất nhiều cho CPU và GPU máy tính.', 'Triệt tiêu được rủi ro chết chipset do quá công suất sinh nhiệt.', 'Máy chạy bớt ồn, không khí đi ra trong lành hơn.', 'Tăng cảm giác thoải mái khi tì tay lên vỏ mát lạnh.'],
                'steps': ['Xác nhận trước nhiệt độ khi chơi game qua CPUID HWMonitor.', 'Làm sạch vỏ ngoài bằng hóa chất chuyên dụng.', 'Tháo mainboard và cụm quạt tản nhiệt lau sạch các vị trí hút gió.', 'Tẩy lớp keo tản nhiệt cũ khô cứng, tra lớp kem mới mềm mịn.', 'Tuốt cọ bàn phím, bề mặt màn hình sáng bong.', 'Mở lại bài test phần mềm, đo lại nhiệt độ để so sánh before-after.', 'Khách nhận máy cùng lời khuyên vệ sinh sau mỗi nửa năm sử dụng.'],
            },
            {
                'slug': 'loi-ban-phim-laptop',
                'title': 'Cách xử lý lỗi bàn phím laptop bị liệt, loạn chữ',
                'description': 'Bàn phím là công cụ giao tiếp liên tục, nếu gặp lỗi nhấn nút không ăn, nhấn 1 ra 2 thì bạn nên kiểm tra thay mới hay vệ sinh cáp.',
                'category_slug': 'sua-main',
                'publish_day': '10', 'publish_month': 'Jan',
                'intro': 'Laptop gặp tình trạng phím chập chờn, kẹt phím mang tới phiền toái vô cùng lớn trong học tập làm việc. Vậy làm thế nào để dứt điểm.',
                'service_desc': 'Dịch vụ thay bàn phím siêu tốc lấy ngay. Chúng tôi đa dạng chủng loại mã phím các dòng máy của Asus, Acer, Dell, Lenovo, HP, Macbook..',
                'signs': ['Gõ phím "a" lại vô tình ra thêm "b".', 'Máy tính tự động chạy như bị ai đó ấn phím dù bạn không đụng.', 'Có cụm phím 3-4 nút nằm kề nhau bị liệt không ấn được.', 'Rút jack sạc ra thì gõ lại ăn phím (Lỗi rò rỉ điện của bộ sạc).'],
                'fixes': ['Úp ngược laptop và vỗ vỗ nhẹ sau lưng xem có dị vật (vụn bánh, ghim) kẹt phím hay không.', 'Tháo nút phím nhẹ nhàng và thay thế nệm cao su nếu bị rách.', 'Trong trường hợp lỗi đường mạch ngầm phím: thay cả khung bàn phím là cách sửa dứt điểm, hiệu quả kinh tế hơn hàn mạch phím rất nhiều.', 'Hạn chế ăn uống để văng đổ nước trên bàn phím, vệ sinh bụi rụng vào gầm phím.'],
                'costs': ['Thay bàn phím cơ bản tháo nổi 1 khung (Dell Ins, HP Elite): 200.000đ - 350.000đ', 'Thay bàn phím đinh tán chìm mặt C (Cần khò, hàn cẩn thận): 450.000đ - 700.000đ'],
                'benefits': ['Bàn phím có độ nảy xịn sò đúng như phím gốc.', 'Miễn phí lắp đặt hàn tán cố định siêu bền đinh nhựa.', '1 đổi 1 ngay lập tức trong 6-12 tháng nếu có phím lỗi.', 'Không để cấn móp, trầy xước viền mặt C của khách.'],
                'steps': ['Kiểm tra rà lỗi phím toàn diện qua phần mềm Keyboard Test Utility.', 'Xác định loại phím của dòng máy (LED, No-LED, màu sắc, nút Home...).', 'Nếu phím nổi, thay thay chỉ trong 5 phút. Nếu phím chìm, cần tháo mọi thiết bị phần cứng để làm rỗng bề mặt C.', 'Máy hàn đinh nhựa hoặc mỏ neo để thắt cố định phím chắc chắn không lỏng lẻo.', 'Rút kinh nghiệm và test lại toàn bộ cụm sau thay.', 'Lắp lại bo mạch chủ nguyên bản đồ đạc vệ sinh sạch sẽ.', 'Bàn giao lại, nghiệm thu phím mới.'],
            },
            {
                'slug': 'loi-ket-noi-wifi-laptop',
                'title': 'Xử lý laptop không nhận hoặc từ chối kết nối wifi',
                'description': 'Mất cả ngày ngồi dò mẫm vì biểu tượng wifi dấu chấm than vàng, hoặc không thấy được mạng list? Tham khảo cách fix wifi dưới đây.',
                'category_slug': 'sua-main',
                'publish_day': '05', 'publish_month': 'Dec',
                'intro': 'Trường hợp khá éo le khi sử dụng thiết bị là tự dưng cột sóng wifi đỏ, mất kết nối mạng. Đây là tình trạng thường gặp nếu lỗi card, hoặc lỗi IP, DNS mạng máy tính.',
                'service_desc': 'Tư vấn giải quyết toàn diện lỗi đường truyền và cung cấp giải pháp mạng cục bộ bền bỉ cho nhóm máy tính hoạt động.',
                'signs': ['Biểu tượng wifi có dấu X đỏ hoặc biểu tượng quả địa cầu "No internet".', 'Search ra được wifi nhà hàng xóm nhưng mạng nhà mình lại chập chờn rớt liên tục.', 'Cũ máy hay bị tắt nút cần gạt cứng Wifi (vô tình gạt trúng).', 'Xung đột IP không thể nhận địa chỉ mạng cấp phát.'],
                'fixes': ['Check xem bạn có vô tình tắt "Wifi" ở Fn + F2 hoặc nút cứng bên hông không.', 'Thiết lập lại mạng, mở CMD quyền admin gõ: `netsh winsock reset`.', 'Reset lại Card mạng hoặc xóa drive đi Update lại.', 'Sử dụng USB wifi rời thay thế làm biện pháp nhanh hoặc thay card wifi m.2 bo mạch chủ.'],
                'costs': ['Khắc phục nhanh lỗi driver, cài đặt phần mềm mạng: Miễn phí - 100.000đ', 'Thay Card Wifi Intel Dual Band, Wifi 6 chuẩn đời cao: 250.000 - 550.000đ'],
                'benefits': ['Wifi bắt xa ổn định, kết nối bluetooth cũng rõ nét theo.', 'Thay thế dễ dàng như thay RAM máy tính.', 'Hỗ trợ cài đặt từ xa ultraview những lỗi mạng nhỏ thường quy.', 'Khách có thể mượn USB Wifi dùng tạm trong khi chờ xử lý phần cứng mạng.'],
                'steps': ['Cung cấp phương án kết nối bằng mạng LAN để test bo mạch còn hiểu mạng dây ko.', 'Tháo card wifi bắt trên mainboard đo điện trở và test card khác cắm.', 'Thông báo chi phí thay card wifi nếu linh kiện cũ bị cháy chập hư.', 'Cài đặt trọn bộ driver LAN/WIFI đúng đời máy.', 'Chạy liên tục ping liên tục dòng -t vào bộ tìm kiếm Google xem Drop packet không.', 'Bàn giao và đánh giá sự cải thiện mạng wifi.', 'Kết thúc thủ tục bảo hành.'],
            },
            {
                'slug': 'mat-du-lieu-o-cung',
                'title': 'Phục hồi dữ liệu ổ cứng, USB an toàn bảo mật',
                'description': 'Xóa nhầm tài liệu, format nhầm phân vùng hay ổ cứng rơi hư hỏng? Mọi dữ liệu đều có cơ hội phục hồi nếu bạn xử lý đúng quy trình.',
                'category_slug': 'sua-main',
                'publish_day': '20', 'publish_month': 'Nov',
                'intro': 'Dữ liệu vô hình thường quan trọng và giá trị hơn máy tính hàng chục triệu đồng. Tuy nhiên việc khôi phục dữ liệu cần trang thiết bị chuyên dụng và kinh nghiệm dày dặn.',
                'service_desc': 'TT Chuyên gia hàng đầu trong mảng phục hồi dữ liệu từ các thiết bị và hệ thống mảng Raid phức tạp. Chế độ tôn trọng khách hàng và đảm bảo tính nhân sinh trong công việc.',
                'signs': ['Bạn trót Empty Recycle Bin hoặc ấn Shift + Delete mất file excel quan trọng.', 'Cắm ổ cứng rời (HDD/USB) vào Windows báo "You need to format the disk".', 'Ổ cứng HDD quay phát tiếng cộc cộc nhỏ đều đều, rít lên từng hồi gắt tai.', 'Ghost nhầm 2 phân vùng D E gộp vào 1 phân vùng hệ điều hành C.'],
                'fixes': ['TUYỆT ĐỐI NGỪNG NGAY VIỆC SAO CHÉP DỮ LIỆU ĐÈ LÊN Ổ CỨNG VỪA MẤT (Cực kỳ quan trọng để tăng tỷ lệ cứu dữ liệu tới mức 100%).', 'Ngắt kết nối các thiết bị ngoại vi và không tự dại dột chạy phần mềm cứu data crack linh tinh trên mạng.', 'Với lỗi Format/Delete nhầm: tiến hành scan bề mặt mức độ block bằng tool bản quyền.', 'Với lỗi cơ học hỏng ổ: Sử dụng mâm đọc chuyên dụng để lấy thiết bị trong phòng sạch không bụi.'],
                'costs': ['Cứu dữ liệu lỗi phần mềm (Xóa nhầm/Format nhầm) ổ 500GB-1TB: 500.000đ - 1.000.000đ', 'Cứu dữ liệu ổ cứng cơ chết đầu từ, cháy board (Cần thay thế đầu từ): Trao đổi thực tế độ khó công việc 1.5 - 3 triệu.'],
                'benefits': ['Bảo mật dữ liệu tuyệt đối 100%, không tọc mạch xem nội dung cá nhân, không share tài liệu ra ngoài.', 'Hệ thống thu dung Data với máy móc hiện đại nhất từ Nga (PC3000).', 'Chỉ thu phí khi khách hàng xem và đồng ý lấy thấy tài liệu, không phụ thu kiểm tra.', 'Time can thiệp nhanh chóng dành cho KH lấy gấp hồ sơ báo cáo thầu.'],
                'steps': ['Ghi nhận yêu cầu mức độ ưu tiên của khách cũng như thông tin ổ cứng.', 'Dùng máy móc khám sơ khởi (bắt bệnh mạch phần cứng hay phần mềm).', 'Thông báo tình trạng, phần trăm sẽ tìm lại được và báo giá cố định cứu Data trọn gói.', 'Xử lý khôi phục vào hệ thống File Server Lưu trữ tạm thời ở trung tâm.', 'Sắp xếp cho khách hàng remote từ xa coi danh sách thư mục, file được cứu xem có ổn thỏa.', 'Copy dữ liệu đó sang một ổ cứng mới thiết bị mới mang tới của khách hàng.', 'Xóa tài liệu trên máy trung tâm hoàn thành quy trình bảo vệ thông tin cá nhân.'],
            },
        ]

        for data in articles_data:
            cat = Category.objects.filter(slug=data.pop('category_slug')).first()
            signs = data.pop('signs')
            fixes = data.pop('fixes')
            costs = data.pop('costs')
            benefits = data.pop('benefits')
            steps = data.pop('steps')

            article = Article.objects.create(
                category=cat,
                is_published=True,
                **data,
            )

            for idx, text in enumerate(signs):
                ArticleSign.objects.create(article=article, content=text, order=idx)
            for idx, text in enumerate(fixes):
                ArticleFix.objects.create(article=article, content=text, order=idx)
            for idx, text in enumerate(costs):
                ArticleCost.objects.create(article=article, content=text, order=idx)
            for idx, text in enumerate(benefits):
                ArticleBenefit.objects.create(article=article, content=text, order=idx)
            # ArticleStep đã bị xóa — bỏ qua steps

        self.stdout.write(f'  ✓ Đã tạo {len(articles_data)} bài viết (kèm signs, fixes, costs, benefits)')
