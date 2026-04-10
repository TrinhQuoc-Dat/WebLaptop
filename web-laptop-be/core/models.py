from django.db import models


class Service(models.Model):
    """Dịch vụ chính — hiển thị trên trang chủ (Home.js)"""
    title = models.CharField('Tên dịch vụ', max_length=200)
    description = models.TextField('Mô tả ngắn')
    image = models.ImageField('Hình ảnh', upload_to='services/', blank=True)
    order = models.PositiveIntegerField('Thứ tự hiển thị', default=0)
    is_active = models.BooleanField('Hiển thị', default=True)
    created_at = models.DateTimeField('Ngày tạo', auto_now_add=True)

    class Meta:
        verbose_name = 'Dịch vụ'
        verbose_name_plural = 'Dịch vụ'
        ordering = ['order', 'id']

    def __str__(self):
        return self.title


class PriceItem(models.Model):
    """Bảng giá dịch vụ — trang Bảng giá (BangGia.js)"""
    condition = models.CharField('Tình trạng thiết bị', max_length=300)
    predicted_issue = models.CharField('Dự đoán lỗi', max_length=300)
    price_range = models.CharField('Chi phí dự kiến', max_length=100)
    warranty = models.CharField('Thời hạn bảo hành', max_length=100)
    order = models.PositiveIntegerField('Thứ tự', default=0)
    is_active = models.BooleanField('Hiển thị', default=True)

    class Meta:
        verbose_name = 'Mục bảng giá'
        verbose_name_plural = 'Bảng giá'
        ordering = ['order', 'id']

    def __str__(self):
        return self.condition[:60]


class SiteConfig(models.Model):
    """
    Cấu hình website — Singleton model (chỉ 1 record).
    Dùng cho Header, Footer, LienHe.js.
    """
    shop_name = models.CharField('Tên cửa hàng', max_length=200, default='LAPTOP PHÚ QUỐC')
    phone = models.CharField('Số điện thoại', max_length=20, default='0815 774 668')
    zalo = models.CharField('Zalo', max_length=20, default='0815 774 668')
    address = models.TextField('Địa chỉ', default='41C Lý Thường Kiệt, Dương Đông, Phú Quốc')
    google_map_embed = models.TextField('Google Maps embed URL', blank=True,
        default='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125646.65348812896!2d103.86406068069593!3d10.224602600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78b8eb1bb774f%3A0x46f1fc0b2b010ac9!2zTGFwdG9wIFBow7ogUXXhu5Fj!5e0!3m2!1svi!2s!4v1775486474591!5m2!1svi!2s')
    morning_hours = models.CharField('Giờ sáng', max_length=50, default='8h - 12h')
    afternoon_hours = models.CharField('Giờ chiều', max_length=50, default='14h - 19h')
    working_days = models.CharField('Ngày làm việc', max_length=100, default='Tất cả các ngày trong tuần')
    logo = models.ImageField('Logo', upload_to='config/', blank=True)
    meta_title = models.CharField('SEO Title', max_length=200, blank=True,
        default='Laptop Phú Quốc - Sửa chữa laptop uy tín tại Phú Quốc')
    meta_description = models.TextField('SEO Description', blank=True,
        default='Dịch vụ sửa chữa laptop chuyên nghiệp tại Phú Quốc. Hơn 10 năm kinh nghiệm, linh kiện chính hãng, bảo hành dài hạn.')

    class Meta:
        verbose_name = 'Cấu hình website'
        verbose_name_plural = 'Cấu hình website'

    def __str__(self):
        return self.shop_name

    def save(self, *args, **kwargs):
        """Đảm bảo chỉ tồn tại 1 record (Singleton)."""
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_instance(cls):
        """Lấy hoặc tạo instance duy nhất."""
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
