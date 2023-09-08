from django.urls import re_path, include
from . import fourohfour

urlpatterns = [
    re_path(r'^.*$', fourohfour.page)
]
