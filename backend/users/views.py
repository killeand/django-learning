from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import UserPermission
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, ListUserSerializer, SectionSerializer, ServiceGroupSerializer
from .models import Sections, ServiceGroups
from django.http import JsonResponse

class UserView(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.is_staff:
            return get_user_model().objects.all().prefetch_related('sections')
        else:
            return get_user_model().objects.filter(id=user.id).prefetch_related('sections')

class SectionView(ModelViewSet):
    serializer_class = SectionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        #sections = user.objects.select_related('sections')
        print("SECTIONS LIST")
        print(user.sections)
        
        return Sections.objects.all()
        
        # if user.is_staff:
        #     return Sections.objects.all()
        # else:
        #     return Sections.objects.filter(id__in=[user.sections])

class ServiceGroupView(ModelViewSet):
    serializer_class = ServiceGroupSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ServiceGroups.objects.filter(id__in=self.request.user.service_groups)

# class ListUserView(GenericViewSet, ListModelMixin, RetrieveModelMixin):
#     serializer_class = ListUserSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         user = self.request.user
        
#         if user.is_staff:
#             return get_user_model().objects.all()
#         else:
#             return get_user_model().objects.filter(id=user.id)

# class CreateUserView(ViewSet, CreateModelMixin):
#     get_serializer = CreateUserSerializer
#     permission_classes = [IsAdminUser]

# class ListUserView(GenericViewSet, ListModelMixin):
#     serializer_class = ListUserSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         user = self.request.user
        
#         if user.is_staff:
#             return get_user_model().objects.all()
#         else:
#             return get_user_model().objects.filter(id=user.id)

# class UserView(ModelViewSet):
#     queryset = get_user_model().objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated]
    
# class LimitedUserView(ModelViewSet):
#     #queryset = get_user_model().objects.filter(is_staff=True)
#     serializer_class = LimitedUserSerializer
#     permission_classes = [UserPermission,IsAuthenticated]
    
#     def get_queryset(self):
#         params = self.request.query_params.get('is_staff')

#         if params == 'True':
#             params = True
#         else:
#             params = False
        
#         queryset = get_user_model().objects.filter(is_staff=params)
        
#         return queryset
    
#     def list(self, request, *args, **kwargs):
#         print("LIST OVERRIDE")
#         print(str(request.user))
        
#         return super().list(request, *args, **kwargs)

# # NOTE TO SELF
# # request.user will only work if the user is logged in via session
# # a.k.a. via admin site or api site.... damn
# #
# class WhoAmI(ViewSet):
#     permission_classes = []
    
#     def list(self, request):
#         print("WHOAMI " + str(request.user))
#         return JsonResponse({})