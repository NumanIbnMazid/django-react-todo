from utils.helpers import ResponseWrapper, CustomModelViewSet
from rest_framework.viewsets import ModelViewSet
from todos.models import Todo
from todos.api.serializers import TodoSerializer
from rest_framework import permissions


class TodoViewSet(CustomModelViewSet):
    logging_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    queryset = Todo.objects.all()
    lookup_field = "slug"
    
    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update", "destroy", "retrieve", "list"]:
            self.serializer_class = TodoSerializer
        else:
            self.serializer_class = TodoSerializer
        return self.serializer_class

    def get_permissions(self):
        permission_classes = [
            permissions.AllowAny
        ]
        return [permission() for permission in permission_classes]
