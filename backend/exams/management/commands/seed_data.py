from django.core.management.base import BaseCommand
from exams.models import Category, Exam, Notification, Subject, Chapter, QuestionPaper
from django.utils.text import slugify
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Seeds the database with initial exam data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # ─── Categories ──────────────────────────────────────────────────
        categories_data = [
            {'name': 'SSLC', 'icon': 'BookText', 'desc': 'Free Solutions & Prep for 10th Standard'},
            {'name': 'Plus One', 'icon': 'Code', 'desc': 'Science & Commerce Resources'},
            {'name': 'Plus Two', 'icon': 'Code', 'desc': 'Engg & Med Prep'},
            {'name': 'Kerala PSC', 'icon': 'Scale', 'desc': 'Government Job Preparation'},
            {'name': 'NEET Prep', 'icon': 'Stethoscope', 'desc': 'Medical Entrance Preparation'},
            {'name': 'JEE Mains', 'icon': 'Cpu', 'desc': 'Engineering Entrance Preparation'},
        ]
        
        created_categories = {}
        for cat in categories_data:
            c, created = Category.objects.get_or_create(
                slug=slugify(cat['name']),
                defaults={
                    'name': cat['name'],
                    'icon_name': cat['icon'],
                    'description': cat['desc']
                }
            )
            created_categories[cat['name']] = c

        # ─── Exams (Syllabuses / Departments) ────────────────────────────
        sslc_cat = created_categories.get('SSLC')
        kpsc_cat = created_categories.get('Kerala PSC')
        
        exams_data = [
            # SSLC Syllabuses
            {'name': 'Kerala State Syllabus', 'cat': sslc_cat, 'slug': 'state'},
            {'name': 'CBSE / NCERT', 'cat': sslc_cat, 'slug': 'cbse'},
            
            # Kerala PSC Exams
            {'name': 'LDC (Lower Division Clerk)', 'cat': kpsc_cat, 'slug': 'ldc'},
            {'name': 'LGS (Last Grade Servant)', 'cat': kpsc_cat, 'slug': 'lgs'},
            {'name': 'Police & Excise', 'cat': kpsc_cat, 'slug': 'police'},
        ]
        
        created_exams = {}
        for ex in exams_data:
            e, created = Exam.objects.get_or_create(
                slug=ex['slug'],
                category=ex['cat'],
                defaults={
                    'name': ex['name'],
                    'description': f'Official material for {ex["name"]}',
                }
            )
            created_exams[ex['slug']] = e

        # ─── Subjects for SSLC (Kerala State) ────────────────────────────
        state_exam = created_exams.get('state')
        sslc_subjects = [
            {'name': 'Mathematics', 'icon': 'Calculator'},
            {'name': 'Physics', 'icon': 'Beaker'},
            {'name': 'Chemistry', 'icon': 'FlaskConical'},
            {'name': 'Biology', 'icon': 'Dna'},
            {'name': 'English', 'icon': 'Languages'},
            {'name': 'Malayalam', 'icon': 'BookOpen'},
            {'name': 'Social Science', 'icon': 'Map'},
            {'name': 'Information Technology', 'icon': 'Monitor'},
        ]

        for sub in sslc_subjects:
            s, _ = Subject.objects.get_or_create(
                slug=slugify(sub['name']),
                exam=state_exam,
                defaults={'name': sub['name'], 'icon_name': sub['icon']}
            )
            Chapter.objects.get_or_create(subject=s, title=f'Intro to {sub["name"]}', order=1)

        # ─── Subjects for Kerala PSC (LDC) ──────────────────────────────
        ldc_exam = created_exams.get('ldc')
        ldc_subjects = [
            {'name': 'General Knowledge', 'icon': 'Map', 'slug': 'gk'},
            {'name': 'Current Affairs', 'icon': 'Languages', 'slug': 'current-affairs'},
            {'name': 'Arithmetic & Mental Ability', 'icon': 'Calculator', 'slug': 'mental-ability'},
            {'name': 'General English', 'icon': 'Languages', 'slug': 'general-english'},
            {'name': 'Malayalam Grammar', 'icon': 'BookOpen', 'slug': 'malayalam-grammar'},
        ]

        for sub in ldc_subjects:
            s, _ = Subject.objects.get_or_create(
                slug=sub['slug'],
                exam=ldc_exam,
                defaults={'name': sub['name'], 'icon_name': sub['icon']}
            )
            Chapter.objects.get_or_create(subject=s, title=f'Mock Test {sub["name"]}', order=1)

        # ─── Notifications ──────────────────────────────────────────────
        Notification.objects.get_or_create(
            title='LDC 2026 Notification Expected',
            defaults={
                'category_tag': 'KPSC',
                'content': 'Estimated notification date for the upcoming LDC cycle.',
                'publish_date': date.today(),
                'expiry_date': date.today() + timedelta(days=90),
                'is_new': True
            }
        )

        self.stdout.write(self.style.SUCCESS('Successfully re-seeded with separate SSLC and LDC subjects!'))
