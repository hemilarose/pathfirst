from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import College
from .serializers import CollegeSerializer


class CollegeListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        qs = College.objects.all()

        ctype = request.query_params.get('type')
        district = request.query_params.get('district')

        if ctype:
            qs = qs.filter(college_type=ctype)

        if district:
            qs = qs.filter(district__icontains=district)

        return Response(CollegeSerializer(qs, many=True).data)


class CollegeCompareView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        ids = request.data.get('ids', [])
        colleges = College.objects.filter(id__in=ids)
        return Response(CollegeSerializer(colleges, many=True).data)