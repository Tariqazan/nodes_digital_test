from django.db import models

# Create your models here.


class Period(models.Model):
    period = models.CharField(max_length=10)
    subject = models.CharField(max_length=50)
    schedule = models.DateTimeField()
