from rest_framework import generics
from .models import Category, Article
from .serializers import CategorySerializer, ArticleListSerializer, ArticleDetailSerializer


class CategoryListView(generics.ListAPIView):
    """GET /api/categories/ — Danh mục bài viết cho PhanMem.js sidebar"""
    serializer_class = CategorySerializer
    pagination_class = None
    queryset = Category.objects.all()


class ArticleListView(generics.ListAPIView):
    """GET /api/articles/ — Danh sách bài viết cho PhanMem.js"""
    serializer_class = ArticleListSerializer
    pagination_class = None  # Frontend đang xử lý pagination local

    def get_queryset(self):
        queryset = Article.objects.filter(is_published=True).select_related('category')

        # Hỗ trợ filter theo category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)

        return queryset


class ArticleDetailView(generics.RetrieveAPIView):
    """GET /api/articles/:slug/ — Chi tiết bài viết cho PhanMemDetail.js"""
    serializer_class = ArticleDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Article.objects.filter(is_published=True).select_related(
            'category'
        ).prefetch_related(
            'signs', 'fixes', 'costs', 'benefits', 'steps'
        )
