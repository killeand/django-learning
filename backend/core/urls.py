from django.urls import include, path
from django.contrib.auth import views
from . import views

# NOTE TO SELF that re_path takes precedence over path
# even though it's an array and order is never guaranteed,
# re_path's are read first before anything else.

handler404 = 'core.views.FourOhFour'

urlpatterns = [
    path('api/', include('api.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    #path('api-auth/login', views.LoginView.as_view(template_name='rest_framework/login.html'), name='login'),
    path('', views.Index, name="Home"),
]
