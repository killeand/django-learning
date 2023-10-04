from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import BasePermission, IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, LimitedUserSerializer

class UserPermission(BasePermission):
    # based on list call
    def has_permission(self, request, view):
        print(view.action)
        print(request.user)
        return True
    
    # based on all other types of calls
    def has_object_permission(self, request, view, obj):
        print(dir(obj))
        return True

class UserView(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
class LimitedUserView(ModelViewSet):
    #queryset = get_user_model().objects.filter(is_staff=True)
    serializer_class = LimitedUserSerializer
    permission_classes = [UserPermission]
    
    def get_queryset(self):
        params = self.request.query_params.get('is_staff')

        if params == 'True':
            params = True
        else:
            params = False
        
        queryset = get_user_model().objects.filter(is_staff=params)
        
        return queryset