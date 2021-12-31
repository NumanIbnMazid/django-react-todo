from django.contrib import admin
from django.urls import path, include
from .views import HomeView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter


# Define Rest Framework Router
router = DefaultRouter()

THIRD_PARTY_URL_PATTERNS = [
    # Django Rest Framework
    path('api-auth/', include('rest_framework.urls')),
]

USER_PANEL_URL_PATTERNS = [
    # ==============================*** Home URL ***==============================
    path('', HomeView.as_view(), name='home'),
    # ==============================*** Todo URLs ***==============================
    path("api/todos/", include(("todos.api.urls", "todos"), namespace="todos")),
]

urlpatterns = [
    path('admin/', admin.site.urls),
] + THIRD_PARTY_URL_PATTERNS + USER_PANEL_URL_PATTERNS


if settings.DEBUG:
    # Static and Media URL
    urlpatterns = urlpatterns + \
        static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + \
        static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
