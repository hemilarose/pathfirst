from django.db import models

class College(models.Model):
    TYPES = [
        ('govt', 'Government'),
        ('private', 'Private'),
        ('deemed', 'Deemed')
    ]

    name = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    district = models.CharField(max_length=50, default='Chennai')
    college_type = models.CharField(max_length=10, choices=TYPES, default='private')
    streams_offered = models.CharField(max_length=200, default='science')

    cutoff_oc = models.FloatField(default=0)
    cutoff_bc = models.FloatField(default=0)
    cutoff_mbc = models.FloatField(default=0)
    cutoff_sc = models.FloatField(default=0)

    fees_per_year = models.IntegerField(default=0)

    hostel_available = models.BooleanField(default=False)
    scholarship_available = models.BooleanField(default=False)

    naac_grade = models.CharField(max_length=5, blank=True)
    website = models.URLField(blank=True)
    about = models.TextField(blank=True)

    def __str__(self):
        return self.name