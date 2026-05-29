from django.core.management.base import BaseCommand
from exams.models import Category, Exam, Notification, StudyMaterial
from django.utils.text import slugify
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Seeds the database with initial exam data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # Categories
        categories_data = [
            {'name': 'Kerala PSC', 'icon': 'Scale'},
            {'name': 'NEET Prep', 'icon': 'Dna'},
            {'name': 'JEE Mains', 'icon': 'FlaskConical'},
            {'name': 'UPSC Civil', 'icon': 'Briefcase'},
        ]
        
        created_categories = {}
        for cat in categories_data:
            c, created = Category.objects.get_or_create(
                name=cat['name'],
                defaults={
                    'slug': slugify(cat['name']),
                    'icon_name': cat['icon'],
                    'description': f'Premium preparation for {cat["name"]}'
                }
            )
            created_categories[cat['name']] = c

        # Exams
        exams_data = [
            {'name': 'LDC 2026', 'cat': 'Kerala PSC', 'popular': True},
            {'name': 'NEET UG 2026', 'cat': 'NEET Prep', 'popular': True},
            {'name': 'JEE Advanced', 'cat': 'JEE Mains', 'popular': False},
        ]
        
        created_exams = {}
        for ex in exams_data:
            cat_obj = created_categories.get(ex['cat'])
            e, created = Exam.objects.get_or_create(
                name=ex['name'],
                defaults={
                    'slug': slugify(ex['name']),
                    'category': cat_obj,
                    'description': f'Complete syllabus for {ex["name"]}',
                    'is_popular': ex['popular']
                }
            )
            created_exams[ex['name']] = e

        # Notifications
        Notification.objects.get_or_create(
            title='Kerala PSC LDC 2026 Notification Out',
            defaults={
                'category_tag': 'PSC',
                'content': 'Official notification released for LDC 2026.',
                'publish_date': date.today(),
                'expiry_date': date.today() + timedelta(days=30),
                'is_new': True
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded ExamVault database!'))
