from rest_framework import viewsets, permissions
from .models import UserModel
from .serializers import UserSerializer

class UserView(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]