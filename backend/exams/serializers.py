from rest_framework import serializers
from .models import Subject, QuestionPaper, Note, MockTest, StudyMaterial, ImportantTopic

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class QuestionPaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionPaper
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class MockTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockTest
        fields = '__all__'

class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyMaterial
        fields = '__all__'

class ImportantTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantTopic
        fields = '__all__'
