from django.shortcuts import render
from rest_framework import viewsets
from django.http import HttpResponse
from django.core import serializers
from django.contrib.auth.models import User
from .serializers import UserSerializer, TodoSerializer, PersonalTodoSerializer
from .models import Todo, PersonalTodo

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()  

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class PersonalTodoView(viewsets.ModelViewSet):
    serializer_class = PersonalTodoSerializer
    queryset = PersonalTodo.objects.all()
