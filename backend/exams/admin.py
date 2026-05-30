from django.contrib import admin
from .models import Subject, QuestionPaper, Note, MockTest, StudyMaterial, ImportantTopic

class ReadOnlySubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'board', 'class_level', 'stream')
    list_filter = ('board', 'class_level', 'stream')
    search_fields = ('name',)
    
    # Disable all editing to maintain fixed hierarchy
    def has_add_permission(self, request):
        return False
        
    def has_change_permission(self, request, obj=None):
        return False
        
    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Subject, ReadOnlySubjectAdmin)

@admin.register(QuestionPaper)
class QuestionPaperAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'year')
    list_filter = ('subject__board', 'subject__class_level', 'subject__stream', 'year')
    search_fields = ('title',)

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject')
    list_filter = ('subject__board', 'subject__class_level', 'subject__stream')
    search_fields = ('title',)

@admin.register(MockTest)
class MockTestAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'questions_count', 'duration_minutes')
    list_filter = ('subject__board', 'subject__class_level', 'subject__stream')

@admin.register(StudyMaterial)
class StudyMaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'material_type')
    list_filter = ('subject__board', 'subject__class_level', 'subject__stream', 'material_type')

@admin.register(ImportantTopic)
class ImportantTopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'weightage_marks')
    list_filter = ('subject__board', 'subject__class_level', 'subject__stream')
