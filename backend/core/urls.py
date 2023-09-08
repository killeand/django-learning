from django.urls import re_path, include, path
from django.views.generic import TemplateView

urlpatterns = [
    path('', include('api.urls'))
]
