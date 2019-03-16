from django.contrib import admin
from .models import Measurement, Device

# Register your models here.
admin.site.register(Measurement)
admin.site.register(Device)
