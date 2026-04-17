"""
Sitemap động cho website Laptop Phú Quốc.
Tự cập nhật khi thêm/sửa/xóa bài viết trên admin.

Django sẽ tự generate XML tại: /sitemap.xml
"""

from django.contrib.sitemaps import Sitemap
from blog.models import Article


# ─────────────── Domain gốc của frontend ───────────────
SITE_DOMAIN = 'https://sualaptopphuquoc.vn'


class StaticPageSitemap(Sitemap):
    """Các trang tĩnh cố định (không thay đổi theo database)."""
    changefreq = 'weekly'
    protocol = 'https'

    # Danh sách trang tĩnh: (url_path, priority)
    _pages = [
        ('/', 1.0),
        ('/bang-gia', 0.9),
        ('/dich-vu', 0.9),
        ('/phan-mem', 0.8),
        ('/lien-he', 0.7),
    ]

    def items(self):
        return self._pages

    def location(self, item):
        return item[0]

    def priority(self, item):
        return item[1]


class ArticleSitemap(Sitemap):
    """Sitemap động — tự cập nhật theo bài viết trong database."""
    changefreq = 'monthly'
    priority = 0.7
    protocol = 'https'

    def items(self):
        """Chỉ lấy bài viết đã xuất bản."""
        return Article.objects.filter(is_published=True).order_by('-updated_at')

    def location(self, article):
        """URL tương ứng với route React: /phan-mem/:slug"""
        return f'/phan-mem/{article.slug}'

    def lastmod(self, article):
        """Ngày cập nhật cuối — Google dùng để quyết định crawl lại."""
        return article.updated_at
