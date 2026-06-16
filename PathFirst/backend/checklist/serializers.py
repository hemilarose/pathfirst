from rest_framework import serializers
from .models import DocumentItem, StudentChecklist

class DocumentItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentItem
        fields = '__all__'

class ChecklistSerializer(serializers.ModelSerializer):
    document = DocumentItemSerializer(read_only=True)
    class Meta:
        model = StudentChecklist
        fields = ['id', 'document', 'is_done', 'updated_at']