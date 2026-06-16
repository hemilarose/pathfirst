from django.db import models
from users.models import User

class DocumentItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    is_mandatory = models.BooleanField(default=True)
    applies_to = models.CharField(max_length=20, default='all')

    def __str__(self):
        return self.name

class StudentChecklist(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='checklist')
    document = models.ForeignKey(DocumentItem, on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['student', 'document']
# Create your models here.
