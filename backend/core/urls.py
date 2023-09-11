from django.urls import re_path, include, path
from django.views.generic import TemplateView
from . import application

urlpatterns = [
    path('api/', include('api.urls')),
    re_path(r'^.*$', application.page, name="Home")
]
