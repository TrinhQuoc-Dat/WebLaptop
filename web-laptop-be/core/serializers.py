from rest_framework import serializers
from .models import Service, PriceItem, SiteConfig


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'image', 'order']


class PriceItemSerializer(serializers.ModelSerializer):
    """
    Serialize bảng giá — field names khớp với frontend BangGia.js:
    tinhTrang, loi, gia, baoHanh
    """
    tinhTrang = serializers.CharField(source='condition')
    loi = serializers.CharField(source='predicted_issue')
    gia = serializers.CharField(source='price_range')
    baoHanh = serializers.CharField(source='warranty')

    class Meta:
        model = PriceItem
        fields = ['id', 'tinhTrang', 'loi', 'gia', 'baoHanh']


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = [
            'shop_name', 'phone', 'zalo', 'address',
            'google_map_embed', 'morning_hours', 'afternoon_hours',
            'working_days', 'logo', 'meta_title', 'meta_description',
        ]
