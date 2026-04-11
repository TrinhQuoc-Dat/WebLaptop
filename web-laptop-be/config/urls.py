"""
URL configuration for Laptop Phú Quốc project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import TemplateView
from django.urls import re_path

from blog.views_ai import ai_article_view
from blog.api_ai import ai_generate_api, ai_generate_image

urlpatterns = [
    path('admin/ai-article/', ai_article_view, name='ai_article'),
    path('api/ai/generate/', ai_generate_api, name='ai_generate'),
    path('api/ai/generate-image/', ai_generate_image, name='ai_generate_image'),
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

# ─────────────── SERVE REACTJS ───────────────
from django.views.static import serve
import os

# 1. Trả về các file như favicon.ico, manifest.json, robots.txt trực tiếp từ root (nếu có đuôi mở rộng)
urlpatterns += [
    re_path(r'^(?P<path>.*\..*)$', serve, {'document_root': settings.BASE_DIR / 'frontend'}),
]

# 2. Mọi đường dẫn không bắt đầu bằng /api/, /admin/, /media/ thì trả về giao diện React (index.html)
urlpatterns += [
    re_path(r'^(?!api|admin|media).*$', TemplateView.as_view(template_name='index.html')),
]
