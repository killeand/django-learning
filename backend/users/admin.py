from django.contrib import admin
from django.contrib.auth import get_user_model

class UserModelAdmin(admin.ModelAdmin):
    fieldsets = (
        ( None, { 'fields': [ 'email' ]}),
        ( 'Details', { 'fields': [ 'first_name', 'last_name' ]}),
        ( 'Permissions', { 'fields': [ 'is_active', 'is_staff', 'is_superuser' ]})
    )
    
admin.site.register(get_user_model(), UserModelAdmin)