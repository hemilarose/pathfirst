from django.db import models


class EntranceExam(models.Model):
    STREAMS = [
        ('science', 'Science'),
        ('commerce', 'Commerce'),
        ('arts', 'Arts'),
        ('all', 'All')
    ]

    ELIGIBILITY_LEVELS = [
        ('12th', 'After 12th'),
        ('ug', 'Undergraduate Completed'),
        ('all', 'All Students')
    ]

    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=20)

    stream = models.CharField(
        max_length=20,
        choices=STREAMS,
        default='science'
    )

    state = models.CharField(max_length=50, default='National')

    registration_start = models.DateField()
    registration_end = models.DateField()
    exam_date = models.DateField()

    result_date = models.DateField(null=True, blank=True)

    official_link = models.URLField()

    description = models.TextField(blank=True)
    eligibility = models.TextField(blank=True)

    eligibility_level = models.CharField(
        max_length=20,
        choices=ELIGIBILITY_LEVELS,
        default='12th'
    )

    def __str__(self):
        return self.name
# Create your models here.
