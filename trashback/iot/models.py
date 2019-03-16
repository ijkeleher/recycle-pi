from django.db import models
import uuid

# Create your models here.


class Measurement(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    device = models.ForeignKey(
        'Device', related_name='measurements', on_delete=models.CASCADE)
    time = models.DateTimeField(blank=True, null=True)
    objectType = models.CharField(max_length=200)


class Device(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(
        'auth.User', related_name='devices', on_delete=models.CASCADE)
