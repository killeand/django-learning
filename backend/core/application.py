from django.http import HttpResponse
import io

def page(request):
    file = io.open("static/index.html", 'r')
    data = file.read()
    file.close()
    
    return HttpResponse(data, content_type='text/html')