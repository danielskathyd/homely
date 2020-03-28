from django.contrib import admin
from .models import User,Todo

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email') 

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed', 'owner')
    
# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Todo, TodoAdmin) 
