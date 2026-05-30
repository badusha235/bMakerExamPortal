from rest_framework import serializers
from .models import Category, Exam, Notification, StudyMaterial, Subject, QuestionPaper, Chapter

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Exam
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyMaterial
        fields = '__all__'

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'

class QuestionPaperSerializer(serializers.ModelSerializer):
    subject_name = serializers.ReadOnlyField(source='subject.name')
    subject_slug = serializers.ReadOnlyField(source='subject.slug')
    class Meta:
        model = QuestionPaper
        fields = ['id', 'title', 'year', 'exam_type', 'subject', 'subject_name', 'subject_slug', 'pdf_file', 'created_at']

class SubjectSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)
    question_papers = QuestionPaperSerializer(many=True, read_only=True)
    class Meta:
        model = Subject
        fields = '__all__'
