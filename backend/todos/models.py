from django.db import models
from django.utils.translation import gettext_lazy as _
from utils.snippets import autoslugWithFieldAndUUID


@autoslugWithFieldAndUUID(fieldname="title")
class Todo(models.Model):
    
    class Priority(models.IntegerChoices):
        HIGH = 3, _("High")
        MEDIUM = 2, _("Medium")
        LOW = 1, _("Low")
        
    slug = models.SlugField(max_length=255, unique=True)
    title = models.CharField(max_length=254, unique=True)
    description = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    priority = models.PositiveSmallIntegerField(choices=Priority.choices, default=Priority.LOW)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Todo'
        verbose_name_plural = 'Todos'
        ordering = ['-created_at']

    def __str__(self):
        return self.title
    
    def get_priority_str(self):
        """[String Representation of Priority]

        Returns:
            [str]: [Priority String]
        """
        if self.priority == 3:
            return "High"
        elif self.priority == 2:
            return "Medium"
        else:
            return "Low"
