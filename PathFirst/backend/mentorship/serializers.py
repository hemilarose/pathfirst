from rest_framework import serializers
from users.models import User
from .models import MentorProfile, ChatMessage

class MentorUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MentorProfileSerializer(serializers.ModelSerializer):
    mentor = MentorUserSerializer(read_only=True)
    class Meta:
        model = MentorProfile
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'sender_name', 'receiver', 'message', 'timestamp', 'is_read']