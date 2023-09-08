from django.http import JsonResponse

def page(request):
    data = {"errors":[{"status":"404","code":1,"detail":"The requested URL does not exist."}],"jsonapi":"https://jsonapi.org"}
    return JsonResponse(data, status=404)