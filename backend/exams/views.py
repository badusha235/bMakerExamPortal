from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Subject, QuestionPaper, Note, MockTest, StudyMaterial, ImportantTopic
from .serializers import (
    SubjectSerializer, QuestionPaperSerializer, NoteSerializer, 
    MockTestSerializer, StudyMaterialSerializer, ImportantTopicSerializer
)

class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['board', 'class_level', 'stream', 'slug', 'name']
    search_fields = ['name']

class QuestionPaperViewSet(viewsets.ModelViewSet):
    queryset = QuestionPaper.objects.all()
    serializer_class = QuestionPaperSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream', 'year']
    search_fields = ['title']

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream']
    search_fields = ['title', 'content']

class MockTestViewSet(viewsets.ModelViewSet):
    queryset = MockTest.objects.all()
    serializer_class = MockTestSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream']
    search_fields = ['title']

class StudyMaterialViewSet(viewsets.ModelViewSet):
    queryset = StudyMaterial.objects.all()
    serializer_class = StudyMaterialSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream', 'material_type']
    search_fields = ['title']

class ImportantTopicViewSet(viewsets.ModelViewSet):
    queryset = ImportantTopic.objects.all()
    serializer_class = ImportantTopicSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream']
    search_fields = ['title', 'description']
