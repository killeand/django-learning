from django.contrib.auth.models import AbstractUser
from django.db import models
from typing import AnyStr, Any, ClassVar
from typing_extensions import Literal, Self
import uuid
from .managers import UserManager

class TermEnum(models.IntegerChoices):
    WINTER = 0
    SPRING = 1
    FALL = 2

class Sections(models.Model):
    def __str__(self):
        return "<Sections> = " + self.name
    
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.TextField()
    learn_id = models.TextField()
    term = models.IntegerField(choices=TermEnum.choices)
    year = models.IntegerField()
    
    class Meta:
        db_table = "Sections"
        verbose_name = "Section"
        verbose_name_plural = "Sections"

class ServiceGroups(models.Model):
    def __str__(self):
        return "<ServiceGroups> = " + self.name
    
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.TextField()
    
    class Meta:
        db_table = "ServiceGroups"
        verbose_name = "Service Group"
        verbose_name_plural = "Service Groups"
        
class UserModel(AbstractUser):
    def __str__(self):
        return "<UserModel object> = " + self.email
    
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    email = models.EmailField(unique=True, max_length=255, default='')
    username = None
    sections = models.ManyToManyField(Sections)
    service_groups = models.ManyToManyField(ServiceGroups)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'password' ]
    
    objects = UserManager()
    
    class Meta:
        db_table = "Users"
        verbose_name = "User"
        verbose_name_plural = "Users"