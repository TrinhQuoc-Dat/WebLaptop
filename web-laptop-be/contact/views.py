from rest_framework import generics, status
from rest_framework.response import Response
from .models import ContactRequest
from .serializers import ContactRequestSerializer


class ContactCreateView(generics.CreateAPIView):
    """POST /api/contact/ — Gửi yêu cầu tư vấn từ LienHe.js"""
    serializer_class = ContactRequestSerializer
    queryset = ContactRequest.objects.all()

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
