from rest_framework.renderers import JSONRenderer
from collections.abc import Sequence

class JSONAPIRenderer(JSONRenderer):
    format = 'jsonapi'
    
    def render(self, data, accepted_media_type=None, renderer_context=None):
        if not isinstance(data, Sequence):
            data = [ data ]
            
        jsonapi = {
            "data": data,
            "jsonapi": "https://jsonapi.org"
        }
        
        return super().render(jsonapi, accepted_media_type, renderer_context)