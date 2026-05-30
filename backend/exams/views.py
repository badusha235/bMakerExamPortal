from rest_framework import viewsets, filters
from .models import Category, Exam, Notification, StudyMaterial, Subject, QuestionPaper, Chapter
from .serializers import (
    CategorySerializer,
    ExamSerializer,
    NotificationSerializer,
    StudyMaterialSerializer,
    SubjectSerializer,
    QuestionPaperSerializer,
    ChapterSerializer,
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


class SubjectViewSet(viewsets.ModelViewSet):
    serializer_class = SubjectSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        queryset = Subject.objects.all()
        slug = self.request.query_params.get('slug')
        exam_slug = self.request.query_params.get('exam_slug')
        if slug:
            queryset = queryset.filter(slug=slug)
        if exam_slug:
            queryset = queryset.filter(exam__slug=exam_slug)
        return queryset


class QuestionPaperViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionPaperSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'subject__name']
    ordering_fields = ['year', 'created_at']

    def get_queryset(self):
        queryset = QuestionPaper.objects.all()
        subject_slug = self.request.query_params.get('subject_slug')
        exam_type = self.request.query_params.get('exam_type')
        year = self.request.query_params.get('year')
        if subject_slug:
            queryset = queryset.filter(subject__slug=subject_slug)
        if exam_type:
            queryset = queryset.filter(exam_type=exam_type)
        if year:
            queryset = queryset.filter(year=year)
        return queryset.order_by('-year')


class ChapterViewSet(viewsets.ModelViewSet):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        queryset = Chapter.objects.all()
        subject_slug = self.request.query_params.get('subject_slug')
        if subject_slug:
            queryset = queryset.filter(subject__slug=subject_slug)
        return queryset.order_by('order')
