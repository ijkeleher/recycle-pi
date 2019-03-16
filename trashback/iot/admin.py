from django.contrib import admin
from .models import Measurement, Device, Goal

# Register your models here.
admin.site.register(Measurement)
admin.site.register(Device)
admin.site.register(Goal)
