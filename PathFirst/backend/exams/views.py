from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import EntranceExam
from .serializers import ExamSerializer


class ExamListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        qs = EntranceExam.objects.all().order_by('exam_date')

        stream = request.query_params.get('stream')
        state = request.query_params.get('state')
        level = request.query_params.get('level')

        if stream:
            qs = qs.filter(stream__in=[stream, 'all'])

        if state:
            qs = qs.filter(state__in=[state, 'National'])

        if level:
            qs = qs.filter(eligibility_level=level)

        serializer = ExamSerializer(qs, many=True)
        return Response(serializer.data)