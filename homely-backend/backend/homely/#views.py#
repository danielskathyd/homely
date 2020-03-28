from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from django.core import serializers
from .serializers import UserSerializer, TodoSerializer
from .models import User, Todo

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()  

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
