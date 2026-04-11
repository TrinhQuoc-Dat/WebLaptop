"""
View xử lý trang tạo bài viết bằng AI trong admin.
"""
import json
import re
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils.text import slugify
from django.conf import settings

from blog.models import Article, Category, ArticleSign, ArticleFix, ArticleCost, ArticleBenefit


def generate_slug(title):
    """Tạo slug từ tiêu đề tiếng Việt."""
    # Bảng chuyển đổi tiếng Việt -> không dấu
    vietnamese_map = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'đ': 'd',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
    }
    result = ''
    for char in title.lower():
        result += vietnamese_map.get(char, char)
    slug = slugify(result)
    # Đảm bảo slug là duy nhất
    base_slug = slug
    counter = 1
    while Article.objects.filter(slug=slug).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1
    return slug


def parse_ai_response(text):
    """Parse nội dung AI trả về thành các sections."""
    sections = {
        'title': '',
        'description': '',
        'intro': '',
        'service_desc': '',
        'signs': [],
        'fixes': [],
        'costs': [],
        'benefits': [],
    }

    # Tìm các section bằng headers
    current_section = None
    current_content = []

    for line in text.split('\n'):
        line_stripped = line.strip()

        # Detect section headers
        line_lower = line_stripped.lower()
        if any(kw in line_lower for kw in ['tiêu đề:', 'title:']):
            if current_section:
                _save_section(sections, current_section, current_content)
            current_section = 'title'
            val = line_stripped.split(':', 1)[-1].strip()
            if val:
                sections['title'] = val
            current_content = []
        elif any(kw in line_lower for kw in ['mô tả seo:', 'mô tả:', 'description:']):
            if current_section:
                _save_section(sections, current_section, current_content)
            current_section = 'description'
            val = line_stripped.split(':', 1)[-1].strip()
            if val:
                sections['description'] = val
            current_content = []
        elif any(kw in line_lower for kw in ['giới thiệu:', 'lời giới thiệu:', 'intro:']):
            if current_section:
                _save_section(sections, current_section, current_content)
            current_section = 'intro'
            current_content = []
        elif any(kw in line_lower for kw in ['mô tả dịch vụ:', 'chi tiết dịch vụ:', 'service:']):
            if current_section:
                _save_section(sections, current_section, current_content)
            current_section = 'service_desc'
            current_content = []
        elif any(kw in line_lower for kw in ['dấu hiệu', 'signs:', 'triệu chứng']):
            if current_section:
                _save_section(sections, current_section, current_content)
            current_section = 'signs'
            current_content = []
        elif any(kw in line_lower for kw in ['giải pháp', 'fixes:', 'cách khắc phục', 'cách sửa']):
            if current_section:
                _save_section(sections, current_section, current_content)
            current_section = 'fixes'
            current_content = []
        elif any(kw in line_lower for kw in ['báo giá', 'costs:', 'chi phí', 'giá']):
            if current_section:
                _save_section(sections, current_section, current_content)
            current_section = 'costs'
            current_content = []
        elif any(kw in line_lower for kw in ['lợi ích', 'benefits:']):
            if current_section:
                _save_section(sections, current_section, current_content)
            current_section = 'benefits'
            current_content = []
        else:
            if line_stripped:
                current_content.append(line_stripped)

    # Save last section
    if current_section:
        _save_section(sections, current_section, current_content)

    return sections


def _save_section(sections, section_name, content_lines):
    """Lưu nội dung vào section tương ứng."""
    if section_name in ('title', 'description'):
        if not sections[section_name] and content_lines:
            sections[section_name] = ' '.join(content_lines)
    elif section_name in ('intro', 'service_desc'):
        sections[section_name] = '\n'.join(content_lines)
    elif section_name in ('signs', 'fixes', 'costs', 'benefits'):
        for line in content_lines:
            # Loại bỏ bullet points
            cleaned = re.sub(r'^[\-\*\d\.]+\s*', '', line).strip()
            if cleaned:
                sections[section_name].append(cleaned)


@staff_member_required
def ai_article_view(request):
    """Trang tạo bài viết bằng AI."""
    from django.contrib import admin

    categories = Category.objects.all()

    # Lấy đầy đủ context của admin (sidebar, branding, navigation...)
    context = {
        **admin.site.each_context(request),
        'title': 'Tạo bài viết bằng AI',
        'categories': categories,
        'has_permission': True,
        'is_popup': False,
        'is_nav_sidebar_enabled': True,
        'opts': Article._meta,  # Cần cho breadcrumb
    }

    if request.method == 'POST':
        action = request.POST.get('action', '')

        if action == 'generate':
            # Nhận nội dung AI đã generate (từ frontend JS gọi API)
            ai_content = request.POST.get('ai_content', '')
            topic = request.POST.get('topic', '')
            category_id = request.POST.get('category', '')

            if ai_content:
                context['ai_content'] = ai_content
                context['topic'] = topic
                context['selected_category'] = category_id

                # Parse AI content
                parsed = parse_ai_response(ai_content)
                context['parsed'] = parsed

        elif action == 'save':
            # Lưu bài viết vào database
            title = request.POST.get('title', '').strip()
            description = request.POST.get('description', '').strip()
            intro = request.POST.get('intro', '').strip()
            service_desc = request.POST.get('service_desc', '').strip()
            category_id = request.POST.get('category', '')
            publish_day = request.POST.get('publish_day', '01')
            publish_month = request.POST.get('publish_month', 'Jan')

            signs = request.POST.getlist('signs[]')
            fixes = request.POST.getlist('fixes[]')
            costs = request.POST.getlist('costs[]')
            benefits = request.POST.getlist('benefits[]')


            if not title:
                messages.error(request, 'Tiêu đề không được để trống!')
                return render(request, 'admin/ai_article.html', context)

            # Lấy đường dẫn ảnh AI (nếu có)
            ai_image_path = request.POST.get('ai_image_path', '').strip()

            try:
                article = Article(
                    title=title,
                    slug=generate_slug(title),
                    description=description or title,
                    intro=intro,
                    service_desc=service_desc,
                    publish_day=publish_day,
                    publish_month=publish_month,
                    is_published=False,
                )
                if category_id:
                    article.category_id = int(category_id)

                # Gán ảnh AI nếu có
                if ai_image_path:
                    article.thumbnail = ai_image_path

                article.save()

                # Lưu các items con
                for i, s in enumerate(signs):
                    if s.strip():
                        ArticleSign.objects.create(article=article, content=s.strip(), order=i)
                for i, f in enumerate(fixes):
                    if f.strip():
                        ArticleFix.objects.create(article=article, content=f.strip(), order=i)
                for i, c in enumerate(costs):
                    if c.strip():
                        ArticleCost.objects.create(article=article, content=c.strip(), order=i)
                for i, b in enumerate(benefits):
                    if b.strip():
                        ArticleBenefit.objects.create(article=article, content=b.strip(), order=i)


                messages.success(request, f'✅ Đã lưu nháp bài viết "{title}" thành công!')
                return redirect('/admin/ai-article/')

            except Exception as e:
                messages.error(request, f'❌ Lỗi khi lưu: {str(e)}')

    return render(request, 'admin/ai_article.html', context)
