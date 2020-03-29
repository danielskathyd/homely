# todo/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Todo, PersonalTodo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed', 'owner', 'created_at','image','activity_type')

class PersonalTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalTodo
        fields = ('id', 'title', 'completed', 'owner')
        
class UserSerializer(serializers.ModelSerializer):
    todo_set = TodoSerializer(read_only=True, many=True)
    ptodo_set = PersonalTodoSerializer(read_only=True, many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'todo_set', 'ptodo_set')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
