from rest_framework import serializers
from .models import Scholarship

class ScholarshipSerializer(serializers.ModelSerializer):
    days_to_deadline = serializers.SerializerMethodField()

    class Meta:
        model = Scholarship
        fields = '__all__'

    def get_days_to_deadline(self, obj):
        from django.utils import timezone
        return (obj.deadline - timezone.now().date()).days