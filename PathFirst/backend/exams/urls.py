from django.urls import path
from .views import ExamListView

urlpatterns = [
    path('', ExamListView.as_view()),
]