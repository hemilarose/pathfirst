from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email','password','role','state','stream','phone','community']

    def create(self, data):
        user = User.objects.create_user(
            username=data['username'],
            email=data.get('email',''),
            password=data['password'],
            role=data.get('role','student'),
            state=data.get('state','Tamil Nadu'),
            stream=data.get('stream','science'),
            phone=data.get('phone',''),
            community=data.get('community','')
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','role','state','stream','phone','community']