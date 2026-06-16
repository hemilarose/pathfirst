from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Scholarship
from .serializers import ScholarshipSerializer

class ScholarshipListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        qs = Scholarship.objects.all().order_by('deadline')

        community = request.query_params.get('community')
        stream = request.query_params.get('stream')
        income = request.query_params.get('income')

        if community:
            qs = qs.filter(community__in=[community, 'all'])
        if stream:
            qs = qs.filter(stream__in=[stream, 'all'])
        if income:
            qs = qs.filter(income_limit__gte=int(income))

        return Response(ScholarshipSerializer(qs, many=True).data)