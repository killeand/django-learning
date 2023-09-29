from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField()
    password = serializers.CharField(max_length=128, required=True)
    email = serializers.CharField(max_length=254, required=True)
    first_name = serializers.CharField(max_length=150, required=True)
    last_name = serializers.CharField(max_length=150, required=True)
    date_joined = serializers.DateTimeField()
    last_login = serializers.DateTimeField()
    is_active = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    is_superuser = serializers.BooleanField()
    
    class Meta:
        model = get_user_model()
        exclude = [ 'username' ]
        
class LimitedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [ 'id', 'first_name', 'last_name' ]