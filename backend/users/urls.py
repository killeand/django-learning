from django.urls import include, path
from . import views
from rest_framework import routers

user_router = routers.DefaultRouter()
user_router.register(r'users', views.UserView, basename='users')
user_router.register(r'sections', views.SectionView, basename='sections')
user_router.register(r'servicegroups', views.ServiceGroupView, basename='servicegroups')
user_router.register(r'usersection', views.UserSectionsView, basename='usersections')
#user_router.register(r'limited-users', views.LimitedUserView, basename='limited-users')

urlpatterns = [
    path('', include(user_router.urls)),
    #path('whoami', views.WhoAmI.as_view({'get':'list'}), name="whoami"),
]
