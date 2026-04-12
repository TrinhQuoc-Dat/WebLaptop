from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication

from .models import ContactRequest
from .serializers import ContactRequestSerializer


class CsrfExemptSessionAuth(SessionAuthentication):
    """Bỏ qua CSRF check cho API được gọi từ React frontend."""
    def enforce_csrf(self, request):
        return  # Không check CSRF


class ContactCreateView(generics.CreateAPIView):
    """POST /api/contact/ — Gửi yêu cầu tư vấn từ LienHe.js"""
    serializer_class = ContactRequestSerializer
    queryset = ContactRequest.objects.all()
    permission_classes = [AllowAny]
    authentication_classes = [CsrfExemptSessionAuth]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'success': True,
                'message': 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.',
                'data': serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )
