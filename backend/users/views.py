from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import BasePermission
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

class UserPermission(BasePermission):
    def has_permission(self, request, view):
        return True
    
    def has_object_permission(self, request, view, obj):
        return True

class UserView(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserPermission]
    
class LimitedUserView(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserPermission]