from __future__ import annotations
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.db import models
import uuid
from .managers import UserManager

class TermEnum(models.IntegerChoices):
    WINTER = 0
    SPRING = 1
    FALL = 2

class Sections(models.Model):
    def __str__(self):
        return str(self.year) + "-" + str(self.term) + "-" + self.learn_id
    
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.TextField()
    learn_id = models.TextField()
    term = models.IntegerField(choices=TermEnum.choices)
    year = models.IntegerField()
    users = models.ManyToManyField('UserModel', blank=True, related_name='section_users')
    
    class Meta:
        db_table = "Sections"
        verbose_name = "Section"
        verbose_name_plural = "Sections"

class ServiceGroups(models.Model):
    def __str__(self):
        return self.name
    
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.TextField()
    
    class Meta:
        db_table = "ServiceGroups"
        verbose_name = "Service Group"
        verbose_name_plural = "Service Groups"
        
class UserModel(AbstractUser):
    def __str__(self):
        return self.email
    
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    email = models.EmailField(unique=True, max_length=255, default='')
    username = None
    sections = models.ManyToManyField(Sections, blank=True, related_name='user_sections')
    service_groups = models.ManyToManyField(ServiceGroups, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'password' ]
    
    objects = UserManager()
    
    class Meta:
        db_table = "Users"
        verbose_name = "User"
        verbose_name_plural = "Users"