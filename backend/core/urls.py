from django.urls import re_path, include, path
from django.views.generic import TemplateView

urlpatterns = [
    path('api/', include('api.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))
]
