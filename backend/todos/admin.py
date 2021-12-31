from django.contrib import admin
from todos.models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_completed', 'priority', 'created_at', 'updated_at')
    
    class Meta:
        model = Todo
        
admin.site.register(Todo, TodoAdmin)
