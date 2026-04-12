"""
Django settings for Laptop Phú Quốc project.
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from django.templatetags.static import static
from django.urls import reverse_lazy

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file
load_dotenv(BASE_DIR / '.env')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-me')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'True').lower() in ('true', '1', 'yes')

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1,sualaptopphuquoc.vn,www.sualaptopphuquoc.vn').split(',')


# Application definition

INSTALLED_APPS = [
    # Unfold — PHẢI đặt TRƯỚC django.contrib.admin
    'unfold',
    'unfold.contrib.filters',
    'unfold.contrib.forms',
    # Django core
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party
    'rest_framework',
    'corsheaders',
    # Project apps
    'core',
    'blog',
    'contact',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',
            BASE_DIR / 'frontend',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database — PostgreSQL
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'laptop_phuquoc'),
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'postgres'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'vi'
TIME_ZONE = 'Asia/Ho_Chi_Minh'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / "static",
    BASE_DIR / "frontend" / "static", # << Nơi chứa css/js của React
]
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files (uploaded images)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ─────────────── CORS ───────────────
# Cho phép React dev server kết nối

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://sualaptopphuquoc.vn',
    'https://www.sualaptopphuquoc.vn',
]

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    'https://sualaptopphuquoc.vn',
    'https://www.sualaptopphuquoc.vn',
]


# ─────────────── REST Framework ───────────────

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}


# ─────────────── UNFOLD ADMIN ───────────────

UNFOLD = {
    'SITE_TITLE': 'LAPTOP PHÚ QUỐC',
    'SITE_HEADER': 'LAPTOP PHÚ QUỐC',
    'SITE_URL': '/',
    'SITE_SYMBOL': 'laptop_mac',
    "SITE_ICON": {
        "light": lambda request: static("images/logo.jpg"),
        "dark": lambda request: static("images/logo.jpg"),
    },
    "SITE_FAVICONS": [
        {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/jpeg",
            "href": lambda request: static("images/logo.jpg"),
        },
    ],
    'SHOW_HISTORY': True,
    'SHOW_VIEW_ON_SITE': False,
    'DASHBOARD_CALLBACK': 'core.dashboard.dashboard_callback',
    'SIDEBAR': {
        'show_search': True,
        'show_all_applications': False,
        'navigation': [
            {
                'title': 'Tổng quan',
                'separator': True,
                'items': [
                    {
                        'title': 'Bảng điều khiển',
                        'icon': 'dashboard',
                        'link': reverse_lazy('admin:index'),
                    },
                ],
            },
            {
                'title': 'Quản lý nội dung',
                'separator': True,
                'items': [
                    {
                        'title': 'Dịch vụ chính',
                        'icon': 'build',
                        'link': reverse_lazy('admin:core_service_changelist'),
                    },
                    {
                        'title': 'Bảng giá',
                        'icon': 'payments',
                        'link': reverse_lazy('admin:core_priceitem_changelist'),
                    },
                    {
                        'title': 'Bài viết',
                        'icon': 'article',
                        'link': reverse_lazy('admin:blog_article_changelist'),
                    },
                    {
                        'title': 'Danh mục',
                        'icon': 'category',
                        'link': reverse_lazy('admin:blog_category_changelist'),
                    },
                ],
            },
            {
                'title': 'Khách hàng',
                'separator': True,
                'items': [
                    {
                        'title': 'Yêu cầu tư vấn',
                        'icon': 'contact_support',
                        'link': reverse_lazy('admin:contact_contactrequest_changelist'),
                    },
                ],
            },
            {
                'title': 'Cài đặt',
                'separator': True,
                'items': [
                    {
                        'title': 'Cấu hình website',
                        'icon': 'settings',
                        'link': reverse_lazy('admin:core_siteconfig_changelist'),
                    },
                    {
                        'title': 'Tạo bài viết AI',
                        'icon': 'auto_awesome',
                        'link': reverse_lazy('ai_article'),
                    },
                    {
                        'title': 'Gemini API Keys',
                        'icon': 'key',
                        'link': reverse_lazy('admin:blog_geminiapikey_changelist'),
                    },
                ],
            },
        ],
    },
}
