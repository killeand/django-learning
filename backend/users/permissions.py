from rest_framework.permissions import BasePermission

class UserPermission(BasePermission):
    # based on list call
    def has_permission(self, request, view):
        print("ACCESSOR: " + view.action)
        print("USER: " + str(request.user))
        return True
    
    # based on all other types of calls
    def has_object_permission(self, request, view, obj):
        print("OBJ PERM")
        print(dir(obj))
        return True