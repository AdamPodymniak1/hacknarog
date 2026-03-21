from django.http import NinjaAPI
from ninja import NinjaAPI
from ninja.security import HttpBearer

api = NinjaAPI()

@api.get("/hello")
def hello(request):
    return {"message": "Hello from Django Ninja!"}