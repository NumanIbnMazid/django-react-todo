from rest_framework import serializers
from todos.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super(TodoSerializer, self).__init__(*args, **kwargs)

        field_name = 'title'
        self.fields[field_name].error_messages['required'] = f"{field_name} field is required"
        self.fields[field_name].error_messages['null'] = f"{field_name} field may not be null"
        self.fields[field_name].error_messages['blank'] = f"{field_name} field may not be blank"
        
        
    class Meta:
        model = Todo
        fields = ('id', 'title', 'slug', 'description', 'is_completed', 'priority', 'created_at', 'updated_at')
        read_only_fields = ('id', 'slug', 'created_at', 'updated_at')
        
    # def to_representation(self, instance):
    #     """ Update representation of data """
    #     representation = super(TodoSerializer, self).to_representation(instance)
    #     representation['priority'] = instance.get_priority_str()
    #     return representation
