from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, 
    ExamViewSet, 
    NotificationViewSet, 
    StudyMaterialViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'study-materials', StudyMaterialViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
