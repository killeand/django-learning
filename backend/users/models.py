from django.contrib.auth.models import AbstractUser
from django.db import models
from django_ulid.models import default, ULIDField

class UserModel(AbstractUser):
    def __str__():
        return "User"
    
    id = ULIDField(default=default, primary_key=True, editable=False, max_length=32)
    
    class Meta:
        db_table = "Users"
    