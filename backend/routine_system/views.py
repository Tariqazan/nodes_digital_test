from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

from .models import Period
from .serializers import PeriodSerializer

import datetime

from django.http import FileResponse
from fpdf import FPDF

# Create your views here.
time_now = datetime.datetime.now()


class RoutineView(APIView):
    """List all period data for this month and add period information"""
    def get(self, request, format=None):
        period = Period.objects.filter(
            schedule__month=time_now.month, schedule__year=time_now.year)
        serializer = PeriodSerializer(period, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PeriodSerializer(data=request.data)
        data = request.data
        date = datetime.datetime.fromisoformat(
            data['schedule']).strftime("%Y/%m/%d %H:%M:%S")
        year = datetime.datetime.strptime(date, "%Y/%m/%d %H:%M:%S").year
        month = datetime.datetime.strptime(date, "%Y/%m/%d %H:%M:%S").month
        check = Period.objects.filter(period=data['period'],
                                      schedule__month=month, schedule__year=year).exists()
        if check == False:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = "Already Period  Exists"
            return Response(message, status=status.HTTP_208_ALREADY_REPORTED)


class PeriodView(APIView):
    """Retrieve, update or delete period information"""
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


class GeneratePdf(APIView):
    """generate current month routine report"""
    def post(self, request, format=None):
        data = request.data
        pdf = FPDF('P', 'mm', 'A4')
        pdf.add_page()
        pdf.set_font('courier', 'B', 16)
        pdf.cell(
            40, 10, f'Routine for this {time_now.strftime("%B")}:', 0, 1, 2)
        pdf.cell(20, 10, '', 0, 1, 2)
        pdf.set_font('courier', '', 12)
        pdf.cell(
            200, 8, f"{'Period'.ljust(30)} {'Subject'.rjust(0)} {'Schedule'.rjust(20)}", 0, 1, 2)
        for line in data:
            pdf.cell(
                200, 8, f"{line['period'].ljust(30)} {line['subject'].rjust(0)} {line['schedule'].rjust(30)}", 0, 1, 2)
        file_name = f'media/report_{time_now.strftime("%B")}.pdf'
        with open(file_name, 'w'):
            pdf.output(file_name, 'F')
        return Response(file_name, status=status.HTTP_201_CREATED)
