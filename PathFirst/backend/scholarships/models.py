from django.db import models

class Scholarship(models.Model):
    COMMUNITIES = [
        ('BC', 'BC'),
        ('MBC', 'MBC'),
        ('SC', 'SC'),
        ('ST', 'ST'),
        ('OC', 'OC'),
        ('all', 'All Communities')
    ]
    STREAMS = [
        ('science', 'Science'),
        ('commerce', 'Commerce'),
        ('arts', 'Arts'),
        ('all', 'All Streams')
    ]

    name = models.CharField(max_length=200)
    provider = models.CharField(max_length=100)
    amount = models.IntegerField()
    community = models.CharField(max_length=10, choices=COMMUNITIES, default='all')
    stream = models.CharField(max_length=20, choices=STREAMS, default='all')
    income_limit = models.IntegerField(default=250000)
    deadline = models.DateField()
    description_tamil = models.TextField(blank=True)  
    apply_link = models.URLField()
    description = models.TextField(blank=True)
    documents_required = models.TextField(blank=True)

    def __str__(self):
        return self.name