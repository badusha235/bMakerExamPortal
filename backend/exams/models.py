from django.db import models
from django.utils.text import slugify

BOARD_CHOICES = (
    ('kerala_state', 'Kerala State'),
    ('cbse', 'CBSE'),
)

CLASS_CHOICES = (
    ('sslc', 'SSLC'),
    ('plus_one', 'Plus One'),
    ('plus_two', 'Plus Two'),
)

STREAM_CHOICES = (
    ('general', 'General'),
    ('science', 'Science'),
    ('commerce', 'Commerce'),
    ('humanities', 'Humanities'),
)

class Subject(models.Model):
    board = models.CharField(max_length=20, choices=BOARD_CHOICES)
    class_level = models.CharField(max_length=20, choices=CLASS_CHOICES)
    stream = models.CharField(max_length=20, choices=STREAM_CHOICES, default='general')
    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True)
    icon_name = models.CharField(max_length=50, default="BookOpen")
    
    class Meta:
        unique_together = ('board', 'class_level', 'stream', 'name')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
        
    def __str__(self):
        stream_str = f" - {self.get_stream_display()}" if self.stream != 'general' else ""
        return f"[{self.get_board_display()} - {self.get_class_level_display()}{stream_str}] {self.name}"

class QuestionPaper(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='question_papers')
    title = models.CharField(max_length=255)
    year = models.IntegerField()
    pdf_file = models.FileField(upload_to='question_papers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.year})"

class Note(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    pdf_file = models.FileField(upload_to='notes/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class MockTest(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='mock_tests')
    title = models.CharField(max_length=255)
    questions_count = models.IntegerField(default=20)
    duration_minutes = models.IntegerField(default=30)
    link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class StudyMaterial(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='study_materials')
    title = models.CharField(max_length=255)
    material_type = models.CharField(max_length=20, choices=(('VIDEO', 'Video'), ('PDF', 'PDF Document')))
    url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ImportantTopic(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='important_topics')
    title = models.CharField(max_length=255)
    description = models.TextField()
    weightage_marks = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
