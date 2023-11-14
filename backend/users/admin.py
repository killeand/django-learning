from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import Sections, ServiceGroups

class UserModelAdmin(admin.ModelAdmin):
    fieldsets = (
        ( None, { 'fields': [ 'email' ]}),
        ( 'Details', { 'fields': [ 'first_name', 'last_name' ]}),
        ( 'Permissions', { 'fields': [ 'is_active', 'is_staff', 'is_superuser', 'groups' ]}),
        ( 'School', { 'fields': [ 'sections', 'service_groups' ]})
    )
    
admin.site.register(get_user_model(), UserModelAdmin)
admin.site.register(Sections, admin.ModelAdmin)
admin.site.register(ServiceGroups, admin.ModelAdmin)