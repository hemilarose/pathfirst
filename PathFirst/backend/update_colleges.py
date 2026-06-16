import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from colleges.models import College

data = [
    ("IIT Madras", "https://www.iitm.ac.in", "Top IIT in India known for research and innovation."),
    ("NIT Trichy", "https://www.nitt.edu", "Premier NIT in Tamil Nadu known for engineering excellence."),
    ("Anna University CEG", "https://www.annauniv.edu", "Historic engineering college in Chennai under Anna University."),
    ("Anna University MIT", "https://www.annauniv.edu", "MIT campus of Anna University known for aerospace engineering."),
    ("Government College of Technology", "https://gct.ac.in", "Top government engineering college in Coimbatore."),
    ("Coimbatore Institute of Technology", "https://cit.edu.in", "Autonomous government-aided engineering college in Coimbatore."),
    ("Thiagarajar College", "https://www.tce.edu", "Top autonomous engineering college in Madurai."),
    ("Alagappa College", "https://www.alagappauniversity.ac.in", "Engineering college under Alagappa University in Karaikudi."),
    ("SSN College", "https://www.ssn.edu.in", "Top private engineering college near Chennai."),
    ("PSG College", "https://www.psgtech.edu", "Premier private engineering college in Coimbatore."),
    ("Kumaraguru", "https://www.kct.ac.in", "Modern engineering college in Coimbatore focused on innovation."),
    ("Sri Venkateswara College of Engineering", "https://www.svce.ac.in", "Autonomous engineering college near Chennai."),
    ("Rajalakshmi Engineering College", "https://www.rajalakshmi.org", "Private engineering college in Chennai with good placements."),
    ("RMD Engineering", "https://rmdec.ac.in", "Engineering college in Thiruvallur district of Chennai."),
    ("Panimalar Engineering College", "https://www.panimalar.ac.in", "Discipline-focused private engineering college in Chennai."),
    ("SRM Institute", "https://www.srmist.edu.in", "Large deemed university known for global exposure and IT placements."),
    ("VIT Vellore", "https://www.vit.ac.in", "Top private deemed university known for placements and innovation."),
    ("Hindustan Institute", "https://hindustanuniv.ac.in", "Deemed university in Chennai with strong engineering programs."),
    ("Vel Tech", "https://www.veltech.edu.in", "Engineering-focused deemed university in Chennai."),
    ("Saveetha Engineering", "https://saveetha.ac.in", "Private engineering college in Chennai with research focus."),
    ("Loyola ICAM", "https://licet.ac.in", "Jesuit minority engineering college focused on value-based education."),
    ("SSJ College", "https://ssjce.ac.in", "Private engineering college in Chennai offering UG and PG programs."),
    ("Sri Sai Ram", "https://www.sairamit.edu.in", "Engineering college in Chennai known for academics and placements."),
    ("St Joseph", "https://www.stjosephstechnology.ac.in", "Private minority institution in Chennai known for structured academics."),
    ("Jeppiaar", "https://jeppiaarengineeringcollege.ac.in", "Private engineering college in Chennai focused on discipline."),
    ("Meenakshi Sundararajan", "https://www.msec.ac.in", "Engineering college in Chennai known for women empowerment."),
    ("Panimalar Institute", "https://www.panimalar.ac.in", "Panimalar Institute of Technology in Chennai."),
    ("KPR Institute", "https://www.kpriet.ac.in", "KPR Institute in Coimbatore known for industry-oriented education."),
    ("Sri Eshwar", "https://www.sece.ac.in", "Sri Eshwar College in Coimbatore known for innovation."),
    ("Karpagam College of Engineering", "https://www.kce.ac.in", "Karpagam College in Coimbatore with focus on research."),
    ("SNS College", "https://snsct.org", "SNS College in Coimbatore known for skill-based education."),
    ("Dr NGP", "https://www.drngpit.ac.in", "Dr NGP Institute in Coimbatore known for modern infrastructure."),
    ("Kongu Engineering", "https://kongu.ac.in", "Top autonomous institution in Erode known for discipline and placements."),
    ("Bannari Amman", "https://www.bitsathy.ac.in", "BIT Sathyamangalam known for strong academic structure."),
    ("Erode Sengunthar", "https://www.esec.ac.in", "Erode Sengunthar Engineering College in Erode."),
    ("Sona College", "https://www.sonatech.ac.in", "Sona College of Technology in Salem with good placements."),
    ("Sathyabama", "https://www.sathyabama.ac.in", "Deemed university in Chennai known for space research."),
    ("Dhanalakshmi Srinivasan", "https://dsec.ac.in", "DSEC in Perambalur focused on technical education."),
    ("Velammal Engineering", "https://velammal.edu.in", "Velammal Engineering College in Chennai known for discipline."),
    ("Sri Krishna College", "https://www.skct.edu.in", "Sri Krishna College in Coimbatore known for academics."),
    ("PSNA College", "https://psna.ac.in", "PSNA College in Dindigul known for engineering education."),
    ("Adhiyamaan", "https://ace.ac.in", "Adhiyamaan College in Hosur near Bengaluru border."),
    ("Nandha Engineering", "https://www.nandhaengg.org", "Nandha Engineering College in Erode."),
    ("Arulmigu Meenakshi", "https://amace.ac.in", "AMACE in Kanchipuram known for structured engineering programs."),
    ("Chettinad College", "https://www.chettinadtech.ac.in", "Chettinad College in Karur with focus on practical skills."),
    ("Mepco Schlenk", "https://mepcoeng.ac.in", "Mepco Schlenk in Sivakasi known for strong academics."),
    ("Francis Xavier", "https://www.fxec.ac.in", "Francis Xavier Engineering College in Tirunelveli."),
    ("Jayaram College", "https://jayaramce.ac.in", "Jayaram College of Engineering in Trichy."),
    ("Oxford Engineering", "https://oxfordec.edu.in", "Oxford Engineering College in Trichy."),
    ("C Abdul Hakeem", "https://www.cahcet.ac.in", "C Abdul Hakeem College in Vellore."),
    ("Kings Engineering", "https://www.kings.ac.in", "Kings Engineering College in Chennai."),
    ("Rajalakshmi Institute of Technology", "https://ritchennai.org", "RIT Chennai known for industry-oriented training."),
    ("Agni College", "https://www.agni.edu.in", "Agni College of Technology in Chennai."),
]

updated = 0
for key, website, about in data:
    qs = College.objects.filter(name__icontains=key)
    if qs.exists():
        qs.update(website=website, about=about)
        print(key, "UPDATED")
        updated += 1
    else:
        print(key, "NOT FOUND")
print("Done!", updated, "colleges updated.")
