from rest_framework import serializers
from .models import ContactRequest


class ContactRequestSerializer(serializers.ModelSerializer):
    """
    Serializer cho POST /api/contact/
    Nhận 3 field từ form LienHe.js: full_name, phone, message
    """

    class Meta:
        model = ContactRequest
        fields = ['id', 'full_name', 'phone', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
