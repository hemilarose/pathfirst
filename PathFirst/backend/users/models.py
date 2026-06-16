from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLES = [('student','Student'),('mentor','Mentor'),('admin','Admin')]
    STREAMS = [('science','Science'),('commerce','Commerce'),('arts','Arts')]
    
    role = models.CharField(max_length=10, choices=ROLES, default='student')
    state = models.CharField(max_length=50, default='Tamil Nadu')
    stream = models.CharField(max_length=20, choices=STREAMS, default='science')
    phone = models.CharField(max_length=15, blank=True)
    community = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"