from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import (
    Category, Article, ArticleSign, ArticleFix,
    ArticleCost, ArticleBenefit
)


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ['name', 'slug', 'order']
    list_editable = ['order']
    prepopulated_fields = {'slug': ('name',)}


# ─── Inline models cho Article ───

class ArticleSignInline(TabularInline):
    model = ArticleSign
    extra = 1
    fields = ['content', 'order']


class ArticleFixInline(TabularInline):
    model = ArticleFix
    extra = 1
    fields = ['content', 'order']


class ArticleCostInline(TabularInline):
    model = ArticleCost
    extra = 1
    fields = ['content', 'order']


class ArticleBenefitInline(TabularInline):
    model = ArticleBenefit
    extra = 1
    fields = ['content', 'order']





@admin.register(Article)
class ArticleAdmin(ModelAdmin):
    list_display = ['title', 'category', 'publish_day', 'publish_month', 'is_published', 'created_at']
    list_filter = ['category', 'is_published']
    list_editable = ['is_published']
    search_fields = ['title', 'description', 'intro']
    prepopulated_fields = {'slug': ('title',)}
    fieldsets = (
        ('Thông tin chung', {
            'fields': ('title', 'slug', 'description', 'thumbnail', 'category')
        }),
        ('Ngày hiển thị', {
            'fields': ('publish_day', 'publish_month'),
            'description': 'Ngày và tháng hiển thị trên card bài viết (ví dụ: 22 / May)'
        }),
        ('Nội dung', {
            'fields': ('intro', 'service_desc')
        }),
        ('Trạng thái', {
            'fields': ('is_published',)
        }),
    )
    inlines = [
        ArticleSignInline,
        ArticleFixInline,
        ArticleCostInline,
        ArticleBenefitInline,
    ]
