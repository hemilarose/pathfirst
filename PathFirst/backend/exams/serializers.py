from rest_framework import serializers
from .models import EntranceExam

class ExamSerializer(serializers.ModelSerializer):
    days_to_exam = serializers.SerializerMethodField()
    days_to_registration_end = serializers.SerializerMethodField()

    class Meta:
        model = EntranceExam
        fields = '__all__'

    def get_days_to_exam(self, obj):
        from django.utils import timezone
        return (obj.exam_date - timezone.now().date()).days

    def get_days_to_registration_end(self, obj):
        from django.utils import timezone
        return (obj.registration_end - timezone.now().date()).days