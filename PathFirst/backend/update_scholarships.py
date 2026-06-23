import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from scholarships.models import Scholarship

updates = [
    ("ST Post Matric", "https://scholarships.gov.in", "பட்டியல் பழங்குடியினர் மாணவர்களுக்கான முழு உதவித்தொகை. கல்வி கட்டணம், விடுதி கட்டணம் மற்றும் மாதாந்திர உதவித்தொகை அரசு வழங்கும்."),
    ("BC Post Matric", "https://scholarships.gov.in", "பிற்படுத்தப்பட்ட வகுப்பினர் மாணவர்களுக்கான வருடாந்திர உதவித்தொகை. கல்லூரி கட்டணம் மற்றும் படிப்பு செலவுகளுக்கு உதவும்."),
    ("SC Post Matric", "https://scholarships.gov.in", "பட்டியல் சாதி மாணவர்களுக்கான முழு கட்டண திரும்பப்பெறுதல் மற்றும் மாதாந்திர உதவித்தொகை. தமிழ்நாடு அரசு வழங்குகிறது."),
    ("MBC Scholarship", "https://scholarships.gov.in", "மிகவும் பிற்படுத்தப்பட்ட வகுப்பினர் மாணவர்களுக்கான உதவித்தொகை. உயர்கல்வி படிக்கும் அனைவருக்கும் பொருந்தும்."),
    ("NSP Central Sector", "https://scholarships.gov.in", "12ம் வகுப்பில் சிறந்த மதிப்பெண் பெற்ற மாணவர்களுக்கு மத்திய அரசு வழங்கும் உதவித்தொகை."),
    ("Prime Minister Scholarship", "https://scholarships.gov.in", "முன்னாள் இராணுவ வீரர்களின் குழந்தைகளுக்கான பிரதமர் உதவித்தொகை. தொழில்முறை படிப்புகளுக்கு 30000 வரை கிடைக்கும்."),
    ("First Generation", "https://scholarships.gov.in", "குடும்பத்தில் முதன்முதலாக கல்லூரி படிக்கும் மாணவர்களுக்கான சிறப்பு உதவித்தொகை."),
    ("Kalaignar Magalir", "https://scholarships.gov.in", "அரசு பள்ளியில் படித்த பெண் மாணவர்களுக்கான தலைமை அமைச்சர் உதவித்தொகை."),
    ("Pudhumai Penn", "https://scholarships.gov.in", "அரசு பள்ளியில் படித்து கல்லூரியில் சேரும் பெண் மாணவர்களுக்கு மாதம் 1000 ரூபாய் வழங்கும் புதுமை பெண் திட்டம்."),
    ("Tamil Medium", "https://scholarships.gov.in", "தமிழ் வழியில் படித்த மாணவர்களுக்கான சிறப்பு உதவித்தொகை."),
    ("Noon Meal", "https://scholarships.gov.in", "நண்பகல் உணவு திட்டத்தில் பயன்பெற்று 80 சதவீதம் மேல் மதிப்பெண் பெற்ற மாணவர்களுக்கான உதவித்தொகை."),
    ("Government School First Rank", "https://scholarships.gov.in", "அரசு பள்ளியில் முதல் மதிப்பெண் பெற்ற மாணவர்களுக்கான சிறப்பு பரிசு மற்றும் உதவித்தொகை."),
    ("AICTE Pragati", "https://scholarships.gov.in", "AICTE கல்லூரிகளில் படிக்கும் பெண் மாணவர்களுக்கு 50000 உதவித்தொகை."),
    ("Indira Gandhi", "https://scholarships.gov.in", "குடும்பத்தில் ஒரே பெண் குழந்தையாக இருந்து முதுகலை படிக்கும் மாணவிகளுக்கான UGC உதவித்தொகை."),
    ("National Means", "https://scholarships.gov.in", "பொருளாதாரத்தில் நலிவடைந்த குடும்பத்தைச் சேர்ந்த திறமையான மாணவர்களுக்கான தேசிய உதவித்தொகை."),
]

created_count = 0
updated_count = 0

for key, link, tamil_desc in updates:
    # update_or_create fetches the record if it exists, or handles creation if it is missing
    obj, created = Scholarship.objects.update_or_create(
        name=key,
        defaults={
            'apply_link': link,
            'description_tamil': tamil_desc,
            'description': 'English description placeholder', # Adjust field to match your Model setup
            'community': 'OC',                                # Adjust to match database-acceptable values
            'stream': 'Science',                               # Adjust to match database-acceptable values
            'family_income': 'Any income'                      # Adjust to match database-acceptable values
        }
    )
    if created:
        print(f"{key} -> CREATED")
        created_count += 1
    else:
        print(f"{key} -> UPDATED")
        updated_count += 1

print(f"Done! {created_count} created, {updated_count} updated.")
