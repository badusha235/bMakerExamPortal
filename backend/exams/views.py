from rest_framework import viewsets, filters
from .models import Category, Exam, Notification, StudyMaterial
from .serializers import (
    CategorySerializer, 
    ExamSerializer, 
    NotificationSerializer, 
    StudyMaterialSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'category__name']

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().order_by('-publish_date')
    serializer_class = NotificationSerializer

class StudyMaterialViewSet(viewsets.ModelViewSet):
    queryset = StudyMaterial.objects.all()
    serializer_class = StudyMaterialSerializer
