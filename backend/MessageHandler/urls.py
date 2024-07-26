from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("message", views.user_input_message, name="user_input_message"),
]