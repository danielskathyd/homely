# todo/serializers.py

from rest_framework import serializers
from .models import User,Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed', 'owner')

class UserSerializer(serializers.ModelSerializer):
    todo_set = TodoSerializer(read_only=True, many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'todo_set')
