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

    # Kiểm tra đăng nhập admin
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

        # Lấy API key từ environment
        api_key = os.environ.get('GEMINI_API_KEY', '')
        if not api_key:
            return JsonResponse({
                'error': 'Chưa cấu hình GEMINI_API_KEY trong .env. Lấy key miễn phí tại: https://aistudio.google.com/apikey',
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

        print(f"[AI] Đang gọi Gemini API... (prompt: {len(prompt)} ký tự)")

        response = http_requests.post(url, json=payload, timeout=60)

        print(f"[AI] Gemini trả về status: {response.status_code}")

        if response.status_code != 200:
            error_detail = ''
            try:
                err_data = response.json()
                error_detail = err_data.get('error', {}).get('message', response.text[:200])
            except Exception:
                error_detail = response.text[:200]
            print(f"[AI] Gemini lỗi: {error_detail}")
            return JsonResponse({
                'error': f'Gemini API lỗi ({response.status_code}): {error_detail}',
            }, status=500)

        data = response.json()

        # Extract text from Gemini response
        content = ''
        try:
            content = data['candidates'][0]['content']['parts'][0]['text']
            print(f"[AI] Đã nhận nội dung: {len(content)} ký tự")
        except (KeyError, IndexError) as e:
            print(f"[AI] Lỗi parse response: {e}")
            print(f"[AI] Response data: {json.dumps(data, indent=2)[:500]}")
            return JsonResponse({
                'error': 'Không thể parse response từ Gemini. Chi tiết trong console.',
            }, status=500)

        return JsonResponse({'content': content})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON body'}, status=400)
    except Exception as e:
        print(f"[AI] Exception: {traceback.format_exc()}")
        return JsonResponse({'error': f'Lỗi server: {str(e)}'}, status=500)


@require_POST
def ai_generate_image(request):
    """Tìm & tải ảnh liên quan từ Pixabay (miễn phí), fallback Lorem Picsum."""
    import urllib.parse
    import time
    from pathlib import Path

    if not request.user.is_staff:
        return JsonResponse({'error': 'Unauthorized'}, status=403)

    try:
        import requests as http_requests
    except ImportError:
        return JsonResponse({'error': 'Thiếu thư viện requests'}, status=500)

    try:
        body = json.loads(request.body)
        topic = body.get('topic', '')

        if not topic:
            return JsonResponse({'error': 'Chưa nhập chủ đề'}, status=400)

        media_dir = Path(settings.MEDIA_ROOT) / 'articles'
        media_dir.mkdir(parents=True, exist_ok=True)
        filename = f"ai-thumbnail-{int(time.time())}.jpg"
        filepath = media_dir / filename

        image_downloaded = False

        # === Nguồn 1: Pixabay (miễn phí, 500 req/ngày) ===
        pixabay_key = os.environ.get('PIXABAY_API_KEY', '')
        if pixabay_key:
            try:
                # Tạo keyword từ topic
                keywords = urllib.parse.quote(f"laptop {topic}")
                pix_url = f"https://pixabay.com/api/?key={pixabay_key}&q={keywords}&image_type=photo&orientation=horizontal&per_page=5&lang=vi"
                
                print(f"[AI-IMG] Tìm ảnh Pixabay: {topic}")
                pix_resp = http_requests.get(pix_url, timeout=10)
                
                if pix_resp.status_code == 200:
                    pix_data = pix_resp.json()
                    hits = pix_data.get('hits', [])
                    
                    if hits:
                        # Lấy ảnh đầu tiên
                        import random
                        img_data = random.choice(hits[:3])
                        img_url = img_data.get('webformatURL', '')
                        
                        if img_url:
                            img_resp = http_requests.get(img_url, timeout=15, stream=True)
                            if img_resp.status_code == 200:
                                with open(filepath, 'wb') as f:
                                    for chunk in img_resp.iter_content(1024):
                                        f.write(chunk)
                                image_downloaded = True
                                print(f"[AI-IMG] ✅ Pixabay: {img_url}")
            except Exception as e:
                print(f"[AI-IMG] Pixabay lỗi: {e}")

        # === Nguồn 2: Lorem Picsum (luôn hoạt động, không cần key) ===
        if not image_downloaded:
            try:
                print(f"[AI-IMG] Fallback: Lorem Picsum...")
                picsum_url = "https://picsum.photos/800/450"
                pic_resp = http_requests.get(picsum_url, timeout=15, allow_redirects=True, stream=True)
                
                if pic_resp.status_code == 200:
                    with open(filepath, 'wb') as f:
                        for chunk in pic_resp.iter_content(1024):
                            f.write(chunk)
                    image_downloaded = True
                    print(f"[AI-IMG] ✅ Picsum placeholder saved")
            except Exception as e:
                print(f"[AI-IMG] Picsum lỗi: {e}")

        if not image_downloaded:
            return JsonResponse({'error': 'Không thể tải ảnh từ bất kỳ nguồn nào'}, status=500)

        relative_path = f"articles/{filename}"
        return JsonResponse({
            'image_path': relative_path,
            'image_url': f'{settings.MEDIA_URL}{relative_path}',
        })

    except Exception as e:
        print(f"[AI-IMG] Exception: {traceback.format_exc()}")
        return JsonResponse({'error': str(e)}, status=500)

