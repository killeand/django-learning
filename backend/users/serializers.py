from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)
    
    class Meta:
        model = get_user_model()
        fields = [ 'id', 'email', 'password', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined' ]
        
    
    def create(self, validated_data):
        print(validated_data)
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        user = get_user_model().objects.create_user(email, password, **validated_data)
        
        return user

class ListUserSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [ 'id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined' ]
        
class DetailedTokenPairSerializer(TokenObtainPairSerializer):
    def get_token(self, user):
        token = super().get_token(user)
        
        token['sub'] = {
            'email': user.email,
            'fn': user.first_name,
            'ln': user.last_name,
            'active': user.is_active,
            'staff': user.is_staff,
        }
        
        return token