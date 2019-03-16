from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Device
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from .documents import MeasurementDocument


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('id', 'name', 'owner', 'measurements')


class MeasurementSerializer(DocumentSerializer):
    class Meta:
        document = MeasurementDocument
        fields = ('id', 'device', 'value', 'key')


class UserSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = User
        fields = ('id', 'username', 'devices')
