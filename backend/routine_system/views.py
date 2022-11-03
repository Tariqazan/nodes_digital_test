from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

from .models import Period
from .serializers import PeriodSerializer
import datetime

# Create your views here.
time_now = datetime.datetime.now()

class RoutineView(APIView):
    def get(self, request, format=None):
        period = Period.objects.filter(schedule__month=time_now.month,schedule__year=time_now.year)
        serializer = PeriodSerializer(period, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print(request.data)
        serializer = PeriodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PeriodView(APIView):
    def get_object(self, pk):
        try:
            return Period.objects.get(pk=pk)
        except Period.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        period = self.get_object(pk)
        serializer = PeriodSerializer(period)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        period = self.get_object(pk)
        serializer = PeriodSerializer(period, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
