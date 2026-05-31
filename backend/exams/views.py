from rest_framework import viewsets, filters, permissions
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
    permission_classes = [permissions.AllowAny]

class QuestionPaperViewSet(viewsets.ModelViewSet):
    queryset = QuestionPaper.objects.all()
    serializer_class = QuestionPaperSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream', 'year']
    search_fields = ['title']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream']
    search_fields = ['title', 'content']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class MockTestViewSet(viewsets.ModelViewSet):
    queryset = MockTest.objects.all()
    serializer_class = MockTestSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream']
    search_fields = ['title']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class StudyMaterialViewSet(viewsets.ModelViewSet):
    queryset = StudyMaterial.objects.all()
    serializer_class = StudyMaterialSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream', 'material_type']
    search_fields = ['title']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

class ImportantTopicViewSet(viewsets.ModelViewSet):
    queryset = ImportantTopic.objects.all()
    serializer_class = ImportantTopicSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['subject__slug', 'subject__board', 'subject__class_level', 'subject__stream']
    search_fields = ['title', 'description']
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
