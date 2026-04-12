from django.contrib.auth.models import User
from django.db import IntegrityError
from ninja import Router, Schema
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_jwt.authentication import JWTAuth
from ninja.errors import HttpError

api = NinjaExtraAPI(title="Auth System")

class SignupSchema(Schema):
    username: str
    password: str
    email: str

class UserSchema(Schema):
    id: int
    username: str
    email: str

auth_router = Router()

@auth_router.post("/signup", response={201: UserSchema})
def signup(request, data: SignupSchema):
    try:
        user = User.objects.create_user(
            username=data.username, 
            password=data.password, 
            email=data.email
        )
        return 201, user
    except IntegrityError:
        raise HttpError(400, "User already exists")

api.register_controllers(NinjaJWTDefaultController)

api.add_router("/auth", auth_router)

@api.get("/me", auth=JWTAuth(), response=UserSchema)
def get_me(request):
    return request.user