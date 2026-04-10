from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import ContactRequest


@admin.register(ContactRequest)
class ContactRequestAdmin(ModelAdmin):
    list_display = ['full_name', 'phone', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    list_editable = ['status']
    search_fields = ['full_name', 'phone', 'message']
    readonly_fields = ['full_name', 'phone', 'message', 'created_at']
    ordering = ['-created_at']

    fieldsets = (
        ('Thông tin khách hàng', {
            'fields': ('full_name', 'phone', 'message', 'created_at')
        }),
        ('Xử lý', {
            'fields': ('status', 'admin_note')
        }),
    )

    def has_add_permission(self, request):
        """Không cho phép admin tạo request — chỉ nhận từ frontend."""
        return False
