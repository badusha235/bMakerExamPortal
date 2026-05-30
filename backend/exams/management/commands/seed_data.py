from django.core.management.base import BaseCommand
from exams.models import Subject

class Command(BaseCommand):
    help = 'Seeds the database with fixed academic hierarchy.'

    def handle(self, *args, **kwargs):
        Subject.objects.all().delete()

        # Define subjects for SSLC (no streams, just general)
        sslc_subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Malayalam", "Social Science", "Information Technology"]
        for board in ['kerala_state', 'cbse']:
            for name in sslc_subjects:
                Subject.objects.create(
                    board=board,
                    class_level='sslc',
                    stream='general',
                    name=name
                )
        
        # Define subjects for streams (Plus One, Plus Two)
        streams = {
            'science': ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "English"],
            'commerce': ["Accountancy", "Business Studies", "Economics", "Mathematics", "English"],
            'humanities': ["History", "Political Science", "Sociology", "Geography", "Economics", "English"]
        }
        
        for board in ['kerala_state', 'cbse']:
            for class_level in ['plus_one', 'plus_two']:
                for stream, subjects in streams.items():
                    for name in subjects:
                        Subject.objects.create(
                            board=board,
                            class_level=class_level,
                            stream=stream,
                            name=name
                        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded fixed academic hierarchy!'))
