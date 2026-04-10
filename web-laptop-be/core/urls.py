from django.urls import path
from . import views

urlpatterns = [
    path('services/', views.ServiceListView.as_view(), name='service-list'),
    path('price-list/', views.PriceListView.as_view(), name='price-list'),
    path('site-config/', views.SiteConfigView.as_view(), name='site-config'),
]
