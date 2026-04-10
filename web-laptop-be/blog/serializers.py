from rest_framework import serializers
from .models import (
    Category, Article, ArticleSign, ArticleFix,
    ArticleCost, ArticleBenefit, ArticleStep
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


# ─── Serializers cho danh sách bài viết (PhanMem.js) ───

class ArticleListSerializer(serializers.ModelSerializer):
    """
    Cho trang danh sách bài viết — khớp với cấu trúc frontend:
    { id, title, description, thumbnail, date: { day, month }, category }
    """
    date = serializers.SerializerMethodField()
    category = serializers.CharField(source='category.name', default='')

    class Meta:
        model = Article
        fields = ['id', 'slug', 'title', 'description', 'thumbnail', 'date', 'category']

    def get_date(self, obj):
        return {
            'day': obj.publish_day,
            'month': obj.publish_month,
        }


# ─── Serializers cho chi tiết bài viết (PhanMemDetail.js) ───

class ArticleSignSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleSign
        fields = ['content']


class ArticleFixSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleFix
        fields = ['content']


class ArticleCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleCost
        fields = ['content']


class ArticleBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleBenefit
        fields = ['content']


class ArticleStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleStep
        fields = ['content']


class ArticleDetailSerializer(serializers.ModelSerializer):
    """
    Cho trang chi tiết — khớp với cấu trúc frontend phanMemData.js:
    {
      id, title, description, thumbnail,
      date: { day, month },
      category,
      content: { intro, signs[], fixes[], cost[], service, benefits[], steps[] }
    }
    """
    date = serializers.SerializerMethodField()
    category = serializers.CharField(source='category.name', default='')
    content = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'slug', 'title', 'description', 'thumbnail', 'date', 'category', 'content']

    def get_date(self, obj):
        return {
            'day': obj.publish_day,
            'month': obj.publish_month,
        }

    def get_content(self, obj):
        return {
            'intro': obj.intro,
            'signs': [s.content for s in obj.signs.all()],
            'fixes': [f.content for f in obj.fixes.all()],
            'cost': [c.content for c in obj.costs.all()],
            'service': obj.service_desc,
            'benefits': [b.content for b in obj.benefits.all()],
            'steps': [s.content for s in obj.steps.all()],
        }
