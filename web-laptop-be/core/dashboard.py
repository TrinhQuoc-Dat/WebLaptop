"""
Dashboard callback — Thống kê tổng quan cho trang admin.
"""

from django.utils import timezone
from datetime import timedelta

from core.models import Service, PriceItem, SiteConfig
from blog.models import Article, Category
from contact.models import ContactRequest


def dashboard_callback(request, context):
    """Truyền dữ liệu thống kê vào dashboard template."""

    # Thời gian
    now = timezone.now()
    last_7_days = now - timedelta(days=7)
    last_30_days = now - timedelta(days=30)

    # ── Thống kê tổng ──
    total_services = Service.objects.filter(is_active=True).count()
    total_articles = Article.objects.filter(is_published=True).count()
    total_price_items = PriceItem.objects.filter(is_active=True).count()
    total_contacts = ContactRequest.objects.count()

    # ── Yêu cầu tư vấn ──
    new_contacts = ContactRequest.objects.filter(status='new').count()
    processing_contacts = ContactRequest.objects.filter(status='processing').count()
    done_contacts = ContactRequest.objects.filter(status='done').count()
    contacts_last_7_days = ContactRequest.objects.filter(created_at__gte=last_7_days).count()
    contacts_last_30_days = ContactRequest.objects.filter(created_at__gte=last_30_days).count()

    # ── Bài viết theo danh mục ──
    categories_stats = []
    for cat in Category.objects.all():
        count = Article.objects.filter(category=cat, is_published=True).count()
        categories_stats.append({'name': cat.name, 'count': count})

    # ── 5 yêu cầu tư vấn mới nhất ──
    recent_contacts = ContactRequest.objects.order_by('-created_at')[:5]

    # ── Cấu hình site ──
    try:
        config = SiteConfig.get_instance()
        shop_name = config.shop_name
        phone = config.phone
    except Exception:
        shop_name = 'LAPTOP PHÚ QUỐC'
        phone = ''

    context.update({
        # Tổng quan
        'total_services': total_services,
        'total_articles': total_articles,
        'total_price_items': total_price_items,
        'total_contacts': total_contacts,
        # Liên hệ
        'new_contacts': new_contacts,
        'processing_contacts': processing_contacts,
        'done_contacts': done_contacts,
        'contacts_last_7_days': contacts_last_7_days,
        'contacts_last_30_days': contacts_last_30_days,
        # Danh mục
        'categories_stats': categories_stats,
        # Mới nhất
        'recent_contacts': recent_contacts,
        # Site info
        'shop_name': shop_name,
        'phone': phone,
    })

    return context
