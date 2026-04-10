# Django Backend cho dự án "Laptop Phú Quốc"

## Bối cảnh hiện tại

### Frontend ReactJS đang chạy
Website **Laptop Phú Quốc** đã có frontend React hoàn chỉnh gồm:

| Trang | File | Chức năng |
|---|---|---|
| Trang chủ | `Home.js` | Hero banner, 6 dịch vụ chính, điểm mạnh, quy trình, cam kết |
| Dịch vụ sửa chữa | `DichVuSuaChua.js` | Chi tiết 4 dịch vụ (nguồn, pin, bản lề, màn hình) + bảng dấu hiệu lỗi |
| Phần mềm / Blog | `PhanMem.js` + `PhanMemDetail.js` | Danh sách 8 bài viết kỹ thuật + trang chi tiết |
| Bảng giá | `BangGia.js` | 15 mục dịch vụ kèm giá + bảo hành |
| Liên hệ | `LienHe.js` | Giới thiệu, form liên hệ, Google Maps |

### Vấn đề cần giải quyết
- **Toàn bộ dữ liệu đang hardcode** trong `homeData.js` và `phanMemData.js`
- Không có admin panel → Không thể thêm/sửa/xóa dịch vụ, bài viết, bảng giá mà không sửa code
- Form liên hệ chỉ `alert()` → Không lưu dữ liệu khách hàng
- Không có khả năng quản lý SEO metadata

---

## Proposed Changes

### Kiến trúc tổng thể

```
d:\GooHTek\WebLaptop\
├── web-laptop/          ← Frontend React (đã có)
└── web-laptop-be/       ← Django Backend (MỚI)
    ├── manage.py
    ├── requirements.txt
    ├── config/              ← Django project settings
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── asgi.py
    ├── core/                ← App: Dịch vụ, Bảng giá, Cấu hình site
    │   ├── models.py
    │   ├── admin.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── migrations/
    ├── blog/                ← App: Bài viết kỹ thuật (Phần mềm)
    │   ├── models.py
    │   ├── admin.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── migrations/
    ├── contact/             ← App: Form liên hệ, Yêu cầu tư vấn
    │   ├── models.py
    │   ├── admin.py
    │   ├── serializers.py
    │   ├── views.py
    │   ├── urls.py
    │   └── migrations/
    └── media/               ← Ảnh upload
```

---

### App `core` — Dịch vụ, Bảng giá, Cấu hình

#### [NEW] `core/models.py`

```python
# === DỊCH VỤ CHÍNH (hiển thị trang chủ) ===
class Service(models.Model):
    title       = CharField(max_length=200)      # "Sửa mainboard laptop"
    description = TextField()                     # "Mất nguồn, chập cháy..."
    image       = ImageField(upload_to='services/')
    order       = PositiveIntegerField(default=0) # Thứ tự hiển thị
    is_active   = BooleanField(default=True)
    created_at  = DateTimeField(auto_now_add=True)


# === BẢNG GIÁ DỊCH VỤ ===
class PriceItem(models.Model):
    condition       = CharField(max_length=300)   # "Laptop cắm sạc đèn báo sáng nhưng không lên nguồn"
    predicted_issue = CharField(max_length=300)   # "Lỗi nhẹ: Hư nút mở nguồn"
    price_range     = CharField(max_length=100)   # "Từ 100.000đ"
    warranty        = CharField(max_length=100)   # "3 tháng"
    order           = PositiveIntegerField(default=0)
    is_active       = BooleanField(default=True)


# === CẤU HÌNH THÔNG TIN CHUNG ===
class SiteConfig(models.Model):
    """Singleton model — chỉ 1 record"""
    shop_name     = CharField(max_length=200, default='LAPTOP PHÚ QUỐC')
    phone         = CharField(max_length=20, default='0815 774 668')
    zalo          = CharField(max_length=20, default='0815 774 668')
    address       = TextField(default='41C Lý Thường Kiệt, Dương Đông, Phú Quốc')
    google_map_embed = TextField(blank=True)      # iframe src URL
    morning_hours = CharField(max_length=50, default='8h - 12h')
    afternoon_hours = CharField(max_length=50, default='14h - 19h')
    meta_title    = CharField(max_length=200, blank=True)
    meta_description = TextField(blank=True)

    class Meta:
        verbose_name = 'Cấu hình website'
```

---

### App `blog` — Bài viết kỹ thuật

#### [NEW] `blog/models.py`

```python
# === DANH MỤC BÀI VIẾT ===
class Category(models.Model):
    name = CharField(max_length=100)              # "Thay màn hình", "Thay pin", "Sửa nguồn"...
    slug = SlugField(unique=True)
    
    class Meta:
        verbose_name_plural = 'Danh mục'


# === BÀI VIẾT KỸ THUẬT ===
class Article(models.Model):
    slug        = SlugField(unique=True)           # URL-friendly ID
    title       = CharField(max_length=300)
    description = TextField()                      # SEO meta description
    thumbnail   = ImageField(upload_to='articles/')
    category    = ForeignKey(Category, on_delete=SET_NULL, null=True)
    publish_date = DateField()
    is_published = BooleanField(default=False)
    created_at  = DateTimeField(auto_now_add=True)
    
    # NỘI DUNG BÀI VIẾT (JSON fields hoặc related models)
    intro        = TextField()                     # Đoạn giới thiệu
    service_desc = TextField(blank=True)           # Mô tả dịch vụ
    
    class Meta:
        ordering = ['-publish_date']


# === CÁC MỤC CON CỦA BÀI VIẾT ===
class ArticleSign(models.Model):
    """Dấu hiệu nhận biết"""
    article = ForeignKey(Article, related_name='signs', on_delete=CASCADE)
    content = TextField()
    order   = PositiveIntegerField(default=0)

class ArticleFix(models.Model):
    """Giải pháp xử lý"""
    article = ForeignKey(Article, related_name='fixes', on_delete=CASCADE)
    content = TextField()
    order   = PositiveIntegerField(default=0)

class ArticleCost(models.Model):
    """Báo giá tham khảo"""
    article = ForeignKey(Article, related_name='costs', on_delete=CASCADE)
    content = TextField()
    order   = PositiveIntegerField(default=0)

class ArticleBenefit(models.Model):
    """Lợi ích khách hàng"""
    article = ForeignKey(Article, related_name='benefits', on_delete=CASCADE)
    content = TextField()
    order   = PositiveIntegerField(default=0)

class ArticleStep(models.Model):
    """Quy trình xử lý"""
    article = ForeignKey(Article, related_name='steps', on_delete=CASCADE)
    content = TextField()
    order   = PositiveIntegerField(default=0)
```

> [!TIP]
> Dùng `InlineModelAdmin` trong admin để quản lý tất cả signs/fixes/costs/benefits/steps ngay trong form Article — rất tiện cho content editor.

---

### App `contact` — Yêu cầu liên hệ

#### [NEW] `contact/models.py`

```python
class ContactRequest(models.Model):
    STATUS_CHOICES = [
        ('new', 'Mới'),
        ('processing', 'Đang xử lý'),
        ('done', 'Hoàn thành'),
    ]
    full_name   = CharField(max_length=200)
    phone       = CharField(max_length=20)
    message     = TextField()
    status      = CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    admin_note  = TextField(blank=True)           # Ghi chú nội bộ
    created_at  = DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Yêu cầu tư vấn'
```

---

### REST API Endpoints

Sử dụng **Django REST Framework**:

| Method | Endpoint | Mô tả | Frontend dùng bởi |
|---|---|---|---|
| `GET` | `/api/services/` | Danh sách dịch vụ chính | `Home.js` |
| `GET` | `/api/price-list/` | Bảng giá dịch vụ | `BangGia.js` |
| `GET` | `/api/site-config/` | Thông tin cửa hàng (SĐT, địa chỉ...) | Header, Footer, LienHe |
| `GET` | `/api/articles/` | Danh sách bài viết | `PhanMem.js` |
| `GET` | `/api/articles/:slug/` | Chi tiết bài viết (kèm signs, fixes...) | `PhanMemDetail.js` |
| `GET` | `/api/categories/` | Danh mục bài viết | `PhanMem.js` (filter) |
| `POST` | `/api/contact/` | Gửi yêu cầu tư vấn | `LienHe.js` form |

---

### Django Admin Panel (Tùy chỉnh)

```python
# core/admin.py
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']

@admin.register(PriceItem)
class PriceItemAdmin(admin.ModelAdmin):
    list_display = ['condition', 'price_range', 'warranty', 'is_active']
    list_editable = ['price_range', 'warranty', 'is_active']

# blog/admin.py  
class ArticleSignInline(admin.TabularInline):
    model = ArticleSign
    extra = 1

class ArticleFixInline(admin.TabularInline):
    model = ArticleFix
    extra = 1
# ... tương tự cho Cost, Benefit, Step

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'publish_date', 'is_published']
    list_filter = ['category', 'is_published']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ArticleSignInline, ArticleFixInline, ...]

# contact/admin.py
@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    list_editable = ['status']
    readonly_fields = ['full_name', 'phone', 'message', 'created_at']
```

---

### Dependencies (`requirements.txt`)

```
Django>=5.1,<5.2
djangorestframework>=3.15
django-cors-headers>=4.4
Pillow>=11.0              # Xử lý ImageField
python-dotenv>=1.0        # Biến môi trường
gunicorn>=23.0            # Production server
```

---

### Settings chính (`config/settings.py`)

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party
    'rest_framework',
    'corsheaders',
    # Project apps
    'core',
    'blog',
    'contact',
]

# CORS — cho phép React dev server
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

# REST Framework defaults
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# Media files (ảnh upload)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

---

## User Review Required

> [!IMPORTANT]
> **Cần xác nhận trước khi triển khai:**
> 1. **Database**: Dùng **SQLite** (đơn giản, đủ cho quy mô nhỏ) hay **PostgreSQL** (production-ready)?
> 2. **Ảnh upload**: Lưu local `media/` hay tiếp tục dùng **Cloudinary** như frontend đang dùng?
> 3. **Form liên hệ**: Chỉ lưu DB hay cần thêm **gửi email/Zalo thông báo** khi có request mới?
> 4. **Dữ liệu trang Dịch vụ Sửa Chữa** (`DichVuSuaChua.js`): Trang này có nội dung rất chi tiết (4 loại dịch vụ, bảng giá từng mục, tips bảo quản). Muốn quản lý từ admin hay giữ hardcode trong React?

> [!WARNING]
> **Frontend cần sửa đổi sau khi backend hoàn thành:**
> - Thay thế import từ `data/homeData.js` và `data/phanMemData.js` bằng `fetch()` / `axios` từ API
> - Form liên hệ trong `LienHe.js` cần gửi POST request thay vì `alert()`
> - Cần xử lý loading state và error handling khi gọi API

---

## Lộ trình triển khai

### Phase 1: Khởi tạo project Django (15 phút)
- `django-admin startproject config .` trong `web-laptop-be/`
- Cài đặt dependencies
- Tạo 3 apps: `core`, `blog`, `contact`
- Cấu hình `settings.py`, CORS, DRF

### Phase 2: Tạo Models + Migrations (20 phút)
- Định nghĩa tất cả models
- `makemigrations` + `migrate`
- Tạo `createsuperuser`

### Phase 3: Admin Panel (15 phút)
- Register models với admin tùy chỉnh
- InlineAdmin cho Article sub-models
- Test thêm/sửa dữ liệu qua admin

### Phase 4: REST APIs (25 phút)
- Serializers cho từng model
- ViewSets / APIViews
- URL routing
- Test endpoints bằng browser / Postman

### Phase 5: Seed Data (10 phút)
- Management command `seed_data` để import dữ liệu hiện tại từ frontend JS files vào database
- Đảm bảo dữ liệu khớp 1:1 với frontend hiện tại

---

## Verification Plan

### Automated Tests
```bash
# Chạy Django test server
python manage.py runserver 8000

# Test API endpoints
curl http://localhost:8000/api/services/
curl http://localhost:8000/api/articles/
curl http://localhost:8000/api/price-list/
curl -X POST http://localhost:8000/api/contact/ -d "full_name=Test&phone=0123&message=Hello"
```

### Manual Verification
- Truy cập admin panel tại `http://localhost:8000/admin/`
- Kiểm tra CRUD đầy đủ cho Services, Articles, PriceItems, ContactRequests
- Verify API response format khớp với cấu trúc dữ liệu frontend cần
- Confirm CORS hoạt động từ React localhost:3000 → Django localhost:8000
