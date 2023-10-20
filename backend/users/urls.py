from django.urls import include, path
from . import views
from rest_framework import routers

user_router = routers.DefaultRouter()
user_router.register(r'users', views.UserView, basename='users')
#user_router.register(r'limited-users', views.LimitedUserView, basename='limited-users')

urlpatterns = [
    path('', include(user_router.urls)),
    #path('whoami', views.WhoAmI.as_view({'get':'list'}), name="whoami"),
]
