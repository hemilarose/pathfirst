from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from users.models import User
from .models import MentorProfile, ChatMessage
from .serializers import MentorProfileSerializer, ChatMessageSerializer

class MentorListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        qs = MentorProfile.objects.filter(available=True)
        subject = request.query_params.get('subject')
        if subject:
            qs = qs.filter(subjects__icontains=subject)
        return Response(MentorProfileSerializer(qs, many=True).data)

class BecomeMentorView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if hasattr(request.user, 'mentor_profile'):
            return Response({'error': 'Already a mentor'}, status=400)
        request.user.role = 'mentor'
        request.user.save()
        profile = MentorProfile.objects.create(
            mentor=request.user,
            college=request.data.get('college', ''),
            year=request.data.get('year', 1),
            department=request.data.get('department', ''),
            subjects=request.data.get('subjects', ''),
            languages=request.data.get('languages', 'Tamil, English'),
            bio=request.data.get('bio', ''),
        )
        return Response(MentorProfileSerializer(profile).data, status=201)

class ChatView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, mentor_id):
        msgs = ChatMessage.objects.filter(
            Q(sender=request.user, receiver_id=mentor_id) |
            Q(sender_id=mentor_id, receiver=request.user)
        )
        ChatMessage.objects.filter(
            sender_id=mentor_id, receiver=request.user, is_read=False
        ).update(is_read=True)
        return Response(ChatMessageSerializer(msgs, many=True).data)

    def post(self, request, mentor_id):
        try:
            receiver = User.objects.get(id=mentor_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        msg = ChatMessage.objects.create(
            sender=request.user,
            receiver=receiver,
            message=request.data.get('message', '')
        )
        return Response(ChatMessageSerializer(msg).data, status=201)