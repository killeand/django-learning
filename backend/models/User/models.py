from django.contrib.auth.models import AbstractUser
from django.db import models
from ulid import ULID

class User(AbstractUser):
    def __str__():
        return "User"
    
    id = models.CharField(default=ULID(), primary_key=True, editable=False,max_length=32)
    