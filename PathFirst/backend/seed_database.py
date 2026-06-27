import os
import django
from datetime import date

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from users.models import User
from scholarships.models import Scholarship
from exams.models import EntranceExam
from colleges.models import College
from checklist.models import DocumentItem
from mentorship.models import MentorProfile, ChatMessage


print("Seeding database...")

# ---------------- USERS ----------------

student, _ = User.objects.get_or_create(
    username="student1",
    defaults={
        "first_name": "Kumar",
        "role": "student",
        "stream": "science",
        "community": "BC",
        "state": "Tamil Nadu",
        "email": "student@example.com",
    },
)

mentor1, _ = User.objects.get_or_create(
    username="mentor1",
    defaults={
        "first_name": "Arun",
        "role": "mentor",
        "stream": "science",
        "email": "mentor1@example.com",
    },
)

mentor2, _ = User.objects.get_or_create(
    username="mentor2",
    defaults={
        "first_name": "Priya",
        "role": "mentor",
        "stream": "commerce",
        "email": "mentor2@example.com",
    },
)

# ---------------- MENTORS ----------------

MentorProfile.objects.get_or_create(
    mentor=mentor1,
    defaults={
        "college": "Anna University",
        "year": 4,
        "department": "Computer Science",
        "subjects": "Programming, Engineering",
        "bio": "Happy to guide engineering aspirants.",
    },
)

MentorProfile.objects.get_or_create(
    mentor=mentor2,
    defaults={
        "college": "Loyola College",
        "year": 3,
        "department": "Commerce",
        "subjects": "Accounts, Economics",
        "bio": "Helping commerce students.",
    },
)

# ---------------- SAMPLE CHAT ----------------

ChatMessage.objects.get_or_create(
    sender=student,
    receiver=mentor1,
    message="Hello sir, I need guidance for engineering admissions."
)

ChatMessage.objects.get_or_create(
    sender=mentor1,
    receiver=student,
    message="Sure! Ask me anything."
)

# ---------------- COLLEGES ----------------

colleges = [

("Anna University","Chennai","Chennai","govt","science",195,190,185,180,60000,True,True,"A++","https://annauniv.edu"),

("PSG College of Technology","Coimbatore","Coimbatore","private","science",198,196,194,192,90000,True,True,"A++","https://psgtech.edu"),

("Loyola College","Chennai","Chennai","private","arts,commerce",90,88,85,82,70000,True,True,"A++","https://loyolacollege.edu"),

("Madras Medical College","Chennai","Chennai","govt","science",199,198,197,196,20000,True,True,"A++","https://mmc.tn.gov.in"),

("Government Law College","Chennai","Chennai","govt","arts",80,78,75,72,12000,False,True,"A","https://glcchennai.com"),

]

for c in colleges:
    College.objects.get_or_create(
        name=c[0],
        defaults={
            "location": c[1],
            "district": c[2],
            "college_type": c[3],
            "streams_offered": c[4],
            "cutoff_oc": c[5],
            "cutoff_bc": c[6],
            "cutoff_mbc": c[7],
            "cutoff_sc": c[8],
            "fees_per_year": c[9],
            "hostel_available": c[10],
            "scholarship_available": c[11],
            "naac_grade": c[12],
            "website": c[13],
            "about": "Top ranked institution.",
        },
    )

# ---------------- CHECKLIST ----------------

documents = [

("10th Marksheet","Upload scanned copy",True),

("12th Marksheet","Mandatory for admission",True),

("Transfer Certificate","Original TC",True),

("Community Certificate","Applicable if reserved category",False),

("Income Certificate","Required for scholarships",False),

("Aadhaar Card","Identity proof",True),

("Passport Size Photo","Recent photo",True),

("Bank Passbook","For scholarship transfer",False),

]

for d in documents:
    DocumentItem.objects.get_or_create(
        name=d[0],
        defaults={
            "description": d[1],
            "is_mandatory": d[2],
            "applies_to": "all",
        },
    )

# ---------------- SCHOLARSHIPS ----------------

Scholarship.objects.get_or_create(
    name="AICTE Pragati",
    defaults={
        "provider":"AICTE",
        "amount":50000,
        "community":"all",
        "stream":"science",
        "income_limit":800000,
        "deadline":date(2026,12,31),
        "description":"Scholarship for girl students.",
        "description_tamil":"பெண் மாணவர்களுக்கான உதவித்தொகை",
        "apply_link":"https://scholarships.gov.in",
        "documents_required":"Income Certificate"
    }
)

Scholarship.objects.get_or_create(
    name="Prime Minister Scholarship",
    defaults={
        "provider":"Government",
        "amount":30000,
        "community":"all",
        "stream":"all",
        "income_limit":800000,
        "deadline":date(2026,12,31),
        "description":"Scholarship for wards of ex-servicemen.",
        "description_tamil":"முன்னாள் ராணுவ வீரர்களின் குழந்தைகளுக்கான உதவித்தொகை",
        "apply_link":"https://scholarships.gov.in",
        "documents_required":"Service Certificate"
    }
)

# Add your remaining scholarship entries here.

# ---------------- EXAMS ----------------

EntranceExam.objects.get_or_create(
    short_name="JEE Main",
    defaults={
        "name":"Joint Entrance Examination Main",
        "stream":"science",
        "state":"National",
        "registration_start":date(2026,2,1),
        "registration_end":date(2026,2,25),
        "exam_date":date(2026,4,2),
        "result_date":date(2026,4,20),
        "official_link":"https://jeemain.nta.nic.in",
        "description":"Engineering entrance exam.",
        "eligibility":"+2 PCM",
        "eligibility_level":"12th",
    }
)

# Add the remaining 14 exams here.

print("Database seeded successfully.")