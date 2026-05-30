from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, 
    ExamViewSet, 
    NotificationViewSet, 
    StudyMaterialViewSet,
    SubjectViewSet,
    QuestionPaperViewSet,
    ChapterViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'notifications', NotificationViewSet)
router.register(r'study-materials', StudyMaterialViewSet)
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'question-papers', QuestionPaperViewSet, basename='questionpaper')
router.register(r'chapters', ChapterViewSet, basename='chapter')

urlpatterns = [
    path('', include(router.urls)),
]
