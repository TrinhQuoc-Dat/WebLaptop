from django.db import models


class ContactRequest(models.Model):
    """Yêu cầu tư vấn từ khách hàng — gửi từ form LienHe.js"""

    STATUS_CHOICES = [
        ('new', 'Mới'),
        ('processing', 'Đang xử lý'),
        ('done', 'Hoàn thành'),
    ]

    full_name = models.CharField('Họ tên khách hàng', max_length=200)
    phone = models.CharField('Số điện thoại', max_length=20)
    message = models.TextField('Nội dung cần hỗ trợ')
    status = models.CharField('Trạng thái', max_length=20,
        choices=STATUS_CHOICES, default='new')
    admin_note = models.TextField('Ghi chú nội bộ', blank=True,
        help_text='Chỉ admin nhìn thấy, không hiển thị ra ngoài')
    created_at = models.DateTimeField('Thời gian gửi', auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Yêu cầu tư vấn'
        verbose_name_plural = 'Yêu cầu tư vấn'

    def __str__(self):
        return f'{self.full_name} — {self.phone} ({self.get_status_display()})'
