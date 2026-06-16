from django.db import models
from users.models import User

class MentorProfile(models.Model):
    mentor = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mentor_profile')
    college = models.CharField(max_length=200)
    year = models.IntegerField(default=1)
    department = models.CharField(max_length=100, blank=True)
    subjects = models.CharField(max_length=300)
    languages = models.CharField(max_length=100, default='Tamil, English')
    bio = models.TextField(blank=True)
    available = models.BooleanField(default=True)
    total_chats = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.mentor.username} - {self.college}"

class ChatMessage(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender} -> {self.receiver}: {self.message[:30]}"