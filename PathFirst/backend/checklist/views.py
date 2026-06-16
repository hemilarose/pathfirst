from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import DocumentItem, StudentChecklist
from .serializers import ChecklistSerializer, DocumentItemSerializer

class ChecklistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        docs = DocumentItem.objects.all()
        items = []
        for doc in docs:
            obj, _ = StudentChecklist.objects.get_or_create(
                student=request.user, document=doc
            )
            items.append(obj)
        return Response(ChecklistSerializer(items, many=True).data)

    def patch(self, request, pk):
        try:
            item = StudentChecklist.objects.get(id=pk, student=request.user)
            item.is_done = request.data.get('is_done', item.is_done)
            item.save()
            return Response(ChecklistSerializer(item).data)
        except StudentChecklist.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)
