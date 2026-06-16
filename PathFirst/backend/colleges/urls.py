from django.urls import path
from .views import CollegeListView, CollegeCompareView

urlpatterns = [
    path('', CollegeListView.as_view()),
    path('compare/', CollegeCompareView.as_view()),
]