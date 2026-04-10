from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Service, PriceItem, SiteConfig


@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'created_at']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    ordering = ['order']


@admin.register(PriceItem)
class PriceItemAdmin(ModelAdmin):
    list_display = ['condition', 'predicted_issue', 'price_range', 'warranty', 'order', 'is_active']
    list_editable = ['price_range', 'warranty', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['condition', 'predicted_issue']
    ordering = ['order']


@admin.register(SiteConfig)
class SiteConfigAdmin(ModelAdmin):
    """Singleton admin — ẩn nút thêm/xóa, chỉ cho phép chỉnh sửa."""
    list_display = ['shop_name', 'phone', 'address']

    def has_add_permission(self, request):
        # Chỉ cho phép tạo 1 record
        return not SiteConfig.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
