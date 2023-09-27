from django.urls import include, path
from django.contrib.admin import site
from django.conf import settings
from . import views

# NOTE TO SELF that re_path takes precedence over path
# even though it's an array and order is never guaranteed,
# re_path's are read first before anything else.

handler404 = 'core.views.FourOhFour'

urlpatterns = [
    path('api/', include('users.urls'))
]

if settings.DEBUG:
    urlpatterns += [
        path('admin/', site.urls),
        path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    ]

urlpatterns += [
    path('', views.Index, name='home')
]