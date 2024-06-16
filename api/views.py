from django.shortcuts import render

# Create your views here.

from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

@csrf_exempt
def helloRequest(request, *args, **kwargs):
    return GraphQLView.as_view(graphiql=True)(request, *args, **kwargs)