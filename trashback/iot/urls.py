from django.conf.urls import url, include
from rest_framework import routers
from . import views
from rest_framework.authtoken import views as authviews

router = routers.DefaultRouter()
router.register(r'devices', views.DeviceViewSet)
router.register(r'measurements', views.MeasurementViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', authviews.obtain_auth_token),
    url(r'^auth/', include('rest_auth.urls')),
]
