from django.db import models


class Category(models.Model):
    """Danh mục bài viết — hiển thị sidebar PhanMem.js"""
    name = models.CharField('Tên danh mục', max_length=100)
    slug = models.SlugField('Slug', unique=True)
    order = models.PositiveIntegerField('Thứ tự', default=0)

    class Meta:
        verbose_name = 'Danh mục'
        verbose_name_plural = 'Danh mục'
        ordering = ['order', 'id']

    def __str__(self):
        return self.name


class Article(models.Model):
    """Bài viết kỹ thuật — trang Phần mềm (PhanMem.js + PhanMemDetail.js)"""
    slug = models.SlugField('URL slug', unique=True, max_length=200,
        help_text='Tự tạo từ tiêu đề, dùng làm URL bài viết')
    title = models.CharField('Tiêu đề', max_length=300)
    description = models.TextField('Mô tả SEO',
        help_text='Hiển thị dưới tiêu đề ở danh sách bài viết')
    thumbnail = models.ImageField('Ảnh đại diện', upload_to='articles/', blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL,
        null=True, blank=True,
        verbose_name='Danh mục',
        related_name='articles'
    )

    # Ngày hiển thị trên card (format: day + month)
    publish_day = models.CharField('Ngày', max_length=10, default='01',
        help_text='Ví dụ: 22')
    publish_month = models.CharField('Tháng', max_length=10, default='Jan',
        help_text='Ví dụ: May, Jun, Apr...')

    is_published = models.BooleanField('Đã xuất bản', default=False)
    created_at = models.DateTimeField('Ngày tạo', auto_now_add=True)
    updated_at = models.DateTimeField('Cập nhật lần cuối', auto_now=True)

    # === NỘI DUNG BÀI VIẾT ===
    intro = models.TextField('Lời giới thiệu',
        help_text='Đoạn intro đầu bài viết (trong khung "Lời khuyên chuyên gia")')
    service_desc = models.TextField('Mô tả dịch vụ', blank=True,
        help_text='Phần "Chi tiết dịch vụ tại LAPTOP PHÚ QUỐC"')

    class Meta:
        verbose_name = 'Bài viết'
        verbose_name_plural = 'Bài viết'
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ArticleSign(models.Model):
    """Dấu hiệu nhận biết lỗi"""
    article = models.ForeignKey(Article, related_name='signs', on_delete=models.CASCADE)
    content = models.TextField('Nội dung')
    order = models.PositiveIntegerField('Thứ tự', default=0)

    class Meta:
        verbose_name = 'Dấu hiệu'
        verbose_name_plural = 'Dấu hiệu nhận biết'
        ordering = ['order']

    def __str__(self):
        return self.content[:80]


class ArticleFix(models.Model):
    """Giải pháp xử lý"""
    article = models.ForeignKey(Article, related_name='fixes', on_delete=models.CASCADE)
    content = models.TextField('Nội dung')
    order = models.PositiveIntegerField('Thứ tự', default=0)

    class Meta:
        verbose_name = 'Giải pháp'
        verbose_name_plural = 'Giải pháp xử lý'
        ordering = ['order']

    def __str__(self):
        return self.content[:80]


class ArticleCost(models.Model):
    """Báo giá tham khảo"""
    article = models.ForeignKey(Article, related_name='costs', on_delete=models.CASCADE)
    content = models.TextField('Nội dung',
        help_text='Ví dụ: "Kiểm tra và cắm lại cáp: 100.000đ - 200.000đ"')
    order = models.PositiveIntegerField('Thứ tự', default=0)

    class Meta:
        verbose_name = 'Mục báo giá'
        verbose_name_plural = 'Báo giá tham khảo'
        ordering = ['order']

    def __str__(self):
        return self.content[:80]


class ArticleBenefit(models.Model):
    """Lợi ích khách hàng"""
    article = models.ForeignKey(Article, related_name='benefits', on_delete=models.CASCADE)
    content = models.TextField('Nội dung')
    order = models.PositiveIntegerField('Thứ tự', default=0)

    class Meta:
        verbose_name = 'Lợi ích'
        verbose_name_plural = 'Lợi ích khách hàng'
        ordering = ['order']

    def __str__(self):
        return self.content[:80]


class ArticleStep(models.Model):
    """Quy trình xử lý"""
    article = models.ForeignKey(Article, related_name='steps', on_delete=models.CASCADE)
    content = models.TextField('Nội dung')
    order = models.PositiveIntegerField('Thứ tự', default=0)

    class Meta:
        verbose_name = 'Bước'
        verbose_name_plural = 'Quy trình xử lý'
        ordering = ['order']

    def __str__(self):
        return self.content[:80]
