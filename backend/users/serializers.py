from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    username = serializers.CharField(max_length=150, required=True)
    password = serializers.CharField(max_length=128, required=True)
    email = serializers.CharField(max_length=254, required=True)
    first_name = serializers.CharField(max_length=150, required=True)
    last_name = serializers.CharField(max_length=150, required=True)
    date_joined = serializers.DateTimeField()
    last_login = serializers.DateTimeField()
    is_active = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    is_superuser = serializers.BaseSerializer()