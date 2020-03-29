from django.contrib import admin
from .models import Todo, PersonalTodo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed', 'owner', 'created_at')
    
# Register your models here.
admin.site.register(Todo, TodoAdmin)
admin.site.register(PersonalTodo) 
