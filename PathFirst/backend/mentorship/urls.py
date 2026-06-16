from django.urls import path
from .views import MentorListView, BecomeMentorView, ChatView

urlpatterns = [
    path('mentors/', MentorListView.as_view()),
    path('become-mentor/', BecomeMentorView.as_view()),
    path('chat/<int:mentor_id>/', ChatView.as_view()),
]