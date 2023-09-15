from django.http import HttpResponse, JsonResponse
import io

def Index(request, *args, **kwargs):
    file = io.open("static/index.html", 'r')
    data = file.read()
    file.close()
    
    return HttpResponse(data, content_type='text/html')

def FourOhFour(request, *args, **kwargs):
    data = {"errors":[{"status":"404","code":1,"detail":"The requested URL does not exist."}],"jsonapi":"https://jsonapi.org"}
    return JsonResponse(data, status=404)