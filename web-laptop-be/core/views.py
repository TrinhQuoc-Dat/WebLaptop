from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Service, PriceItem, SiteConfig
from .serializers import ServiceSerializer, PriceItemSerializer, SiteConfigSerializer


class ServiceListView(generics.ListAPIView):
    """GET /api/services/ — Danh sách dịch vụ chính cho Home.js"""
    serializer_class = ServiceSerializer
    pagination_class = None  # Không cần phân trang (chỉ ~6 items)

    def get_queryset(self):
        return Service.objects.filter(is_active=True).order_by('order')


class PriceListView(generics.ListAPIView):
    """GET /api/price-list/ — Bảng giá dịch vụ cho BangGia.js"""
    serializer_class = PriceItemSerializer
    pagination_class = None  # Không cần phân trang (~15 items)

    def get_queryset(self):
        return PriceItem.objects.filter(is_active=True).order_by('order')


class SiteConfigView(APIView):
    """GET /api/site-config/ — Thông tin cửa hàng (Singleton)"""

    def get(self, request):
        config = SiteConfig.get_instance()
        serializer = SiteConfigSerializer(config)
        return Response(serializer.data)
