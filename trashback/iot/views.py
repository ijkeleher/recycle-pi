from django.shortcuts import render
from rest_framework import permissions
from .models import Device, Measurement, Goal

from .serializers import UserSerializer, DeviceSerializer, MeasurementSerializer, GoalSerializer

from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth.models import User

# Create your views here.


class DeviceViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Device.objects.all()


class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Goal.objects.all()

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MeasurementViewSet(viewsets.ModelViewSet):
    serializer_class = DeviceSerializer
    queryset = Device.objects.all()


class UserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Device.objects.all()
