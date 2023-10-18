from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import BasePermission, IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, LimitedUserSerializer
from django.http import JsonResponse

class UserPermission(BasePermission):
    # based on list call
    def has_permission(self, request, view):
        print("ACCESSOR: " + view.action)
        print("USER: " + str(request.user))
        return True
    
    # based on all other types of calls
    def has_object_permission(self, request, view, obj):
        print("OBJ PERM")
        print(dir(obj))
        return True

class UserView(ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
class LimitedUserView(ModelViewSet):
    #queryset = get_user_model().objects.filter(is_staff=True)
    serializer_class = LimitedUserSerializer
    permission_classes = [UserPermission,IsAuthenticated]
    
    def get_queryset(self):
        params = self.request.query_params.get('is_staff')

        if params == 'True':
            params = True
        else:
            params = False
        
        queryset = get_user_model().objects.filter(is_staff=params)
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        print("LIST OVERRIDE")
        print(str(request.user))
        
        return super().list(request, *args, **kwargs)

# NOTE TO SELF
# request.user will only work if the user is logged in via session
# a.k.a. via admin site or api site.... damn
#
class WhoAmI(ViewSet):
    permission_classes = []
    
    def list(self, request):
        print("WHOAMI " + str(request.user))
        return JsonResponse({})