from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(APIView):
    permission_classes = []
    def post(self, request):
        s = RegisterSerializer(data=request.data)
        if s.is_valid():
            user = s.save()
            token = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'access': str(token.access_token),
                'refresh': str(token)
            }, status=201)
        return Response(s.errors, status=400)

class LoginView(APIView):
    permission_classes = []
    def post(self, request):
        user = authenticate(
            username=request.data.get('username'),
            password=request.data.get('password')
        )
        if user:
            token = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'access': str(token.access_token),
                'refresh': str(token)
            })
        return Response({'error': 'Invalid credentials'}, status=400)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data)