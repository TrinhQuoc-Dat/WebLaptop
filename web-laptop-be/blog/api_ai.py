"""
API endpoint gọi AI để tạo nội dung bài viết.
Sử dụng Google Gemini API (miễn phí).
"""
import json
import os
import traceback

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.admin.views.decorators import staff_member_required
from django.conf import settings


@require_POST
def ai_generate_api(request):
    """API endpoint nhận prompt và trả về nội dung AI."""

    if not request.user.is_staff:
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    try:
        import requests as http_requests
    except ImportError:
        return JsonResponse({'error': 'Thiếu thư viện requests. Chạy: pip install requests'}, status=500)

    try:
        body = json.loads(request.body)
        prompt = body.get('prompt', '')

        if not prompt:
            return JsonResponse({'error': 'Prompt không được để trống'}, status=400)

        # Lấy API key: ưu tiên từ DB (random), fallback .env
        api_key = ''
        try:
            from blog.models import GeminiApiKey
            import random
            keys = list(GeminiApiKey.objects.filter(is_active=True).values_list('api_key', flat=True))
            if keys:
                api_key = random.choice(keys)
        except Exception:
            pass

        if not api_key:
            api_key = os.environ.get('GEMINI_API_KEY', '')

        if not api_key:
            return JsonResponse({
                'error': 'Chưa có Gemini API Key. Vào Admin → Gemini API Keys để thêm.',
            }, status=400)

        # Gọi Gemini API
        url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key={api_key}'

        payload = {
            'contents': [{
                'parts': [{'text': prompt}]
            }],
            'generationConfig': {
                'temperature': 0.7,
                'maxOutputTokens': 8192,
            }
        }

        response = http_requests.post(url, json=payload, timeout=60)

        if response.status_code != 200:
            error_detail = ''
            try:
                err_data = response.json()
                error_detail = err_data.get('error', {}).get('message', response.text[:200])
            except Exception:
                error_detail = response.text[:200]
            return JsonResponse({
                'error': f'Gemini API lỗi ({response.status_code}): {error_detail}',
            }, status=500)

        data = response.json()

        content = ''
        try:
            content = data['candidates'][0]['content']['parts'][0]['text']
        except (KeyError, IndexError):
            return JsonResponse({
                'error': 'Không thể parse response từ Gemini.',
            }, status=500)

        return JsonResponse({'content': content})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)
    except Exception as e:
        return JsonResponse({'error': f'Lỗi server: {str(e)}'}, status=500)
