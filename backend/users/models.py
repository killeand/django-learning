from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from .managers import UserManager

class UserModel(AbstractUser):
    def __str__(self):
        return self.email
    
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    email = models.CharField(max_length=254, unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'password' ]
    
    objects = UserManager()
    
    class Meta:
        db_table = "Users"
    