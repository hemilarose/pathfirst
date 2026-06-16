import { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    nav: {
      exams: 'Exams', scholarships: 'Scholarships', colleges: 'Colleges',
      checklist: 'Checklist', mentor: 'Ask a Mentor', login: 'Login',
      signup: 'Sign up', logout: 'Logout', home: 'PathFirst'
    },
    home: {
      tag: 'For first-generation college students in Tamil Nadu',
      title: 'Your path to college,\nstep by step',
      subtitle: 'Entrance exams, scholarships, document checklist, college comparison — everything a first-gen student needs.',
      getStarted: 'Get started free', browseExams: 'Browse exams',
      statsExams: 'Entrance Exams', statsScholarships: 'Scholarships',
      statsColleges: 'TN Colleges', statsDocs: 'Documents Tracked',
      featuresTitle: 'Everything you need',
      featuresSubtitle: 'No more asking around. No more missing deadlines.',
      ctaTitle: 'Ready to plan your college journey?',
      ctaSubtitle: 'Create a free account to save your checklist and chat with mentors.',
      ctaBtn: 'Create free account',
    },
    scholarships: {
      title: 'Scholarship Finder',
      subtitle: 'Filter by your community, income and stream',
      community: 'Community', stream: 'Stream', income: 'Family Income',
      allCommunities: 'All communities', allStreams: 'All streams', anyIncome: 'Any income',
      clear: 'Clear filters', found: 'scholarships found', apply: 'Apply →',
      deadlinePassed: '⚠️ Deadline passed', by: 'by',
    },
    exams: {
      title: 'Entrance Exam Calendar',
      subtitle: 'All important exams with registration deadlines and countdowns',
      allStreams: 'All streams', regCloses: 'Reg. closes', examDate: 'Exam date',
      closed: 'Closed', passed: 'Passed', daysLeft: 'days left',
      officialSite: 'Official website →', eligibility: 'Eligibility:',
    },
    checklist: {
      title: 'Document Checklist',
      subtitle: 'Tick off documents as you collect them',
      loginMsg: 'Login to use your checklist',
      loginSubtitle: 'Your progress is saved to your account.',
      login: 'Log in', ready: 'documents ready', mandatory: 'Mandatory', optional: 'Optional',
      complete: '🎉 You are ready! All documents collected.',
    },
    colleges: {
      title: 'College Comparison', subtitle: 'Select up to 3 colleges to compare side by side',
      allTypes: 'All types', govt: 'Government', private: 'Private', deemed: 'Deemed',
      allDistricts: 'All districts', compare: 'Compare', clear: 'Clear',
      selected: 'selected', selectMore: 'Select 1 more to compare', clickCompare: 'Click Compare!',
      sideTitle: '📊 Side by side', feature: 'Feature',
    },
    mentor: {
      title: 'Ask a Mentor', subtitle: 'Chat with college students who went through the same process',
      available: 'mentors available', noMentors: 'No mentors yet.',
      loginMsg: 'Login to chat with mentors', loginSubtitle: 'Real college students answer your questions.',
      login: 'Log in to chat', active: 'Active', year: 'Year',
      placeholder: 'Type your question...', send: 'Send', sayHi: 'Say hi! Ask',
      sayHi2: 'anything about college.'
    }
  },
  ta: {
    nav: {
      exams: 'தேர்வுகள்', scholarships: 'உதவித்தொகை', colleges: 'கல்லூரிகள்',
      checklist: 'ஆவண பட்டியல்', mentor: 'வழிகாட்டியிடம் கேள்', login: 'உள்நுழை',
      signup: 'பதிவு செய்', logout: 'வெளியேறு', home: 'PathFirst'
    },
    home: {
      tag: 'தமிழ்நாட்டில் முதல் தலைமுறை மாணவர்களுக்காக',
      title: 'உங்கள் கல்லூரி பயணம்,\nஒவ்வொரு படியாக',
      subtitle: 'நுழைவுத் தேர்வுகள், உதவித்தொகை, ஆவண பட்டியல், கல்லூரி ஒப்பீடு — அனைத்தும் ஒரே இடத்தில்.',
      getStarted: 'இலவசமாக தொடங்கு', browseExams: 'தேர்வுகள் பார்க்க',
      statsExams: 'நுழைவுத் தேர்வுகள்', statsScholarships: 'உதவித்தொகைகள்',
      statsColleges: 'தமிழ்நாடு கல்லூரிகள்', statsDocs: 'ஆவணங்கள்',
      featuresTitle: 'உங்களுக்கு தேவையான அனைத்தும்',
      featuresSubtitle: 'இனி யாரையும் கேட்க வேண்டாம். கடைசி நேர அவசரம் வேண்டாம்.',
      ctaTitle: 'உங்கள் கல்லூரி திட்டத்தை தொடங்க தயாரா?',
      ctaSubtitle: 'இலவச கணக்கை உருவாக்கி உங்கள் பட்டியலை சேமிக்கவும்.',
      ctaBtn: 'இலவச கணக்கு உருவாக்கு',
    },
    scholarships: {
      title: 'உதவித்தொகை தேடுபொறி',
      subtitle: 'உங்கள் சாதி, வருமானம் மற்றும் பிரிவு அடிப்படையில் வடிகட்டவும்',
      community: 'சமூகம்', stream: 'பிரிவு', income: 'குடும்ப வருமானம்',
      allCommunities: 'அனைத்து சமூகங்கள்', allStreams: 'அனைத்து பிரிவுகள்', anyIncome: 'எந்த வருமானமும்',
      clear: 'அழி', found: 'உதவித்தொகைகள் கிடைத்தன', apply: 'விண்ணப்பிக்க →',
      deadlinePassed: '⚠️ காலக்கெடு முடிந்தது', by: 'வழங்குநர்:',
    },
    exams: {
      title: 'நுழைவுத் தேர்வு நாட்காட்டி',
      subtitle: 'முக்கியமான தேர்வுகள் மற்றும் பதிவு காலக்கெடுவுடன்',
      allStreams: 'அனைத்து பிரிவுகள்', regCloses: 'பதிவு முடியும்', examDate: 'தேர்வு தேதி',
      closed: 'மூடப்பட்டது', passed: 'முடிந்தது', daysLeft: 'நாட்கள் உள்ளன',
      officialSite: 'அதிகாரப்பூர்வ தளம் →', eligibility: 'தகுதி:',
    },
    checklist: {
      title: 'ஆவண பட்டியல்',
      subtitle: 'ஆவணங்களை சேகரிக்கும்போது டிக் செய்யவும்',
      loginMsg: 'பட்டியலை பயன்படுத்த உள்நுழைக',
      loginSubtitle: 'உங்கள் முன்னேற்றம் கணக்கில் சேமிக்கப்படும்.',
      login: 'உள்நுழை', ready: 'ஆவணங்கள் தயார்', mandatory: 'கட்டாயம்', optional: 'விருப்பம்',
      complete: '🎉 தயார்! அனைத்து ஆவணங்களும் சேகரிக்கப்பட்டன.',
    },
    colleges: {
      title: 'கல்லூரி ஒப்பீடு', subtitle: '3 கல்லூரிகள் வரை தேர்ந்தெடுத்து ஒப்பிடவும்',
      allTypes: 'அனைத்து வகைகள்', govt: 'அரசு', private: 'தனியார்', deemed: 'கருதப்பட்ட',
      allDistricts: 'அனைத்து மாவட்டங்கள்', compare: 'ஒப்பிடு', clear: 'அழி',
      selected: 'தேர்ந்தெடுக்கப்பட்டது', selectMore: '1 மேலும் தேர்ந்தெடுக்கவும்', clickCompare: 'ஒப்பிடு கிளிக் செய்யவும்!',
      sideTitle: '📊 பக்கவாட்டு ஒப்பீடு', feature: 'அம்சம்',
    },
    mentor: {
      title: 'வழிகாட்டியிடம் கேள்', subtitle: 'அதே செயல்முறையில் சென்ற கல்லூரி மாணவர்களிடம் அரட்டை அடிக்கவும்',
      available: 'வழிகாட்டிகள் உள்ளனர்', noMentors: 'இன்னும் வழிகாட்டிகள் இல்லை.',
      loginMsg: 'வழிகாட்டிகளிடம் அரட்டை அடிக்க உள்நுழைக',
      loginSubtitle: 'உண்மையான கல்லூரி மாணவர்கள் உங்கள் கேள்விகளுக்கு பதில் சொல்வார்கள்.',
      login: 'அரட்டை அடிக்க உள்நுழை', active: 'இயங்குகிறது', year: 'ஆண்டு',
      placeholder: 'உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள்...', send: 'அனுப்பு',
      sayHi: 'வணக்கம்! கேளுங்கள்', sayHi2: 'கல்லூரி பற்றி எதையும்.'
    }
  }
}

const LanguageCtx = createContext(null)
export const useLang = () => useContext(LanguageCtx)

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  const toggle = () => setLang(l => l === 'en' ? 'ta' : 'en')
  return (
    <LanguageCtx.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageCtx.Provider>
  )
}