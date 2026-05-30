from django.contrib import admin
from .models import Category, Exam, Notification, StudyMaterial, Subject, QuestionPaper, Chapter

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_popular')
    list_filter = ('category', 'is_popular')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'exam', 'icon_name')
    list_filter = ('exam',)
    prepopulated_fields = {'slug': ('name',)}

@admin.register(QuestionPaper)
class QuestionPaperAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'year', 'exam_type')
    list_filter = ('subject', 'year', 'exam_type')
    search_fields = ('title',)

@admin.register(Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'order')
    list_filter = ('subject',)
    ordering = ('subject', 'order')

admin.site.register(Notification)
admin.site.register(StudyMaterial)
