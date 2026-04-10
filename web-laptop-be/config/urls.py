"""
URL configuration for Laptop Phú Quốc project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/', include('blog.urls')),
    path('api/', include('contact.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Admin site customization
admin.site.site_header = 'LAPTOP PHÚ QUỐC — Quản trị'
admin.site.site_title = 'Laptop Phú Quốc Admin'
admin.site.index_title = 'Bảng điều khiển'
