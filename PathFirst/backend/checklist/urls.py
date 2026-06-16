from django.urls import path
from .views import ChecklistView

urlpatterns = [
    path('', ChecklistView.as_view()),
    path('<int:pk>/', ChecklistView.as_view()),
]