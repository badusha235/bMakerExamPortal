from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon_name = models.CharField(max_length=50, help_text="Lucide icon name")
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"

class Exam(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='exams')
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    is_popular = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Notification(models.Model):
    title = models.CharField(max_length=255)
    exam = models.ForeignKey(Exam, on_delete=models.SET_NULL, null=True, blank=True)
    category_tag = models.CharField(max_length=50, help_text="Short tag like PSC, SSC")
    content = models.TextField()
    publish_date = models.DateField()
    expiry_date = models.DateField()
    is_new = models.BooleanField(default=True)
    link = models.URLField(blank=True)

    def __str__(self):
        return self.title

class Subject(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField()
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='subjects')
    icon_name = models.CharField(max_length=50, default="BookOpen")
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.exam.name} - {self.name}"

class QuestionPaper(models.Model):
    EXAM_TYPES = (
        ('ANNUAL', 'Annual Exam'),
        ('MODEL', 'Model Exam'),
        ('SUPPLEMENTARY', 'Supplementary'),
    )
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='question_papers')
    title = models.CharField(max_length=255)
    year = models.IntegerField()
    exam_type = models.CharField(max_length=15, choices=EXAM_TYPES)
    pdf_file = models.FileField(upload_to='question_papers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject.name} - {self.year} - {self.get_exam_type_display()}"

class Chapter(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='chapters')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=1)
    
    def __str__(self):
        return self.title

class StudyMaterial(models.Model):
    MATERIAL_TYPES = (
        ('PDF', 'PDF Note'),
        ('VIDEO', 'Video Lesson'),
        ('AUDIO', 'Audio Summary'),
    )
    title = models.CharField(max_length=255)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='materials')
    material_type = models.CharField(max_length=10, choices=MATERIAL_TYPES)
    price_type = models.CharField(max_length=10, choices=(('FREE', 'Free'), ('PREMIUM', 'Premium')))
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)
    image_url = models.URLField(blank=True)
    file_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
