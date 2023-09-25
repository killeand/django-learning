from django.urls import include, path
from . import views
from rest_framework import routers

user_router = routers.DefaultRouter()
user_router.register(r'users', views.UserView, basename='users')

urlpatterns = [
    path('', include(user_router.urls)),
]
