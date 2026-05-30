from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SubjectViewSet, QuestionPaperViewSet, NoteViewSet, 
    MockTestViewSet, StudyMaterialViewSet, ImportantTopicViewSet
)

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'question-papers', QuestionPaperViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'mock-tests', MockTestViewSet)
router.register(r'study-materials', StudyMaterialViewSet)
router.register(r'important-topics', ImportantTopicViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
