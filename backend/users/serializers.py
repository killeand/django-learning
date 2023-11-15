from rest_framework.serializers import ModelSerializer, CharField, SerializerMethodField
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Sections, ServiceGroups

class UserSerializer(ModelSerializer):
    password = CharField(write_only=True)
    
    class Meta:
        model = get_user_model()
        fields = [ 'id', 'email', 'password', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined' ]
        
    
    def create(self, validated_data):
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
    
class SectionSerializer(ModelSerializer):
    class Meta:
        model = Sections
        fields = '__all__'
        
class ServiceGroupSerializer(ModelSerializer):
    class Meta:
        model = ServiceGroups
        fields = "__all__"
    
    def create(self, validated_data):
        user = self.context['request']
        print("CREATE " + str(user))
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        user = self.context['request']
        print("UPDATE " + str(user))
        return super().update(instance, validated_data)

class LimitedSections(ModelSerializer):
    class Meta:
        model = Sections
        fields = ['id','name']
class UserSectionSerializer(ModelSerializer):
    # user_section = SerializerMethodField()
    # sections = LimitedSections(many=True)
    #users = SerializerMethodField()
    user_sections = ListUserSerializer(many=True)
    class Meta:
        model = Sections
        fields = ("id", "name", "user_sections")
    
    # def get_users(self, obj):
    #     return [{"id":u.id,"email":u.email} for u in get_user_model().objects.filter(sections__id=obj.id)]
        
    # def get_user_section(self, obj):
    #     return [{"id":sec.id,"name":sec.name} for sec in obj.sections.all()]