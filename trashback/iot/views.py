from django.shortcuts import render
from rest_framework import permissions
from .models import Device, Measurement

from .serializers import UserSerializer, DeviceSerializer, MeasurementSerializer

from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth.models import User

# Create your views here.


class DeviceViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Device.objects.all()


class MeasurementViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Device.objects.all()


class UserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Device.objects.all()
