import { Link } from 'react-router-dom'
import { useAuth } from '../App'
import { useLang } from '../Context/LanguageContext'

export default function Home() {
  const { user } = useAuth()
  const { t } = useLang()

  const features = [
    { icon:'📅', title: t.nav.exams, desc: t.exams.subtitle, to:'/exams', color:'#2563eb', bg:'#eff6ff' },
    { icon:'💰', title: t.nav.scholarships, desc: t.scholarships.subtitle, to:'/scholarships', color:'#16a34a', bg:'#dcfce7' },
    { icon:'🏫', title: t.nav.colleges, desc: t.colleges.subtitle, to:'/colleges', color:'#7c3aed', bg:'#f5f3ff' },
    { icon:'✅', title: t.nav.checklist, desc: t.checklist.subtitle, to:'/checklist', color:'#ea580c', bg:'#fff7ed' },
    { icon:'💬', title: t.nav.mentor, desc: t.mentor.subtitle, to:'/mentors', color:'#0891b2', bg:'#ecfeff' },
  ]

  const stats = [
    ['26+', t.home.statsExams],
    ['25+', t.home.statsScholarships],
    ['53', t.home.statsColleges],
    ['12', t.home.statsDocs],
  ]

  return (
    <div>
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#16a34a 0%,#15803d 100%)', color:'#fff', padding:'72px 0 56px' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <div style={{ display:'inline-block', background:'rgba(255,255,255,.18)', borderRadius:20, padding:'5px 16px', fontSize:13, marginBottom:20 }}>
            🌱 {t.home.tag}
          </div>
          <h1 style={{ fontSize:44, fontWeight:800, lineHeight:1.2, marginBottom:16, whiteSpace:'pre-line' }}>
            {t.home.title}
          </h1>
          <p style={{ fontSize:17, opacity:.9, maxWidth:540, margin:'0 auto 32px', lineHeight:1.7 }}>
            {t.home.subtitle}
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            {!user && (
              <Link to="/register" style={{ background:'#fff', color:'#16a34a', fontWeight:700, fontSize:15, padding:'12px 24px', borderRadius:10, textDecoration:'none' }}>
                {t.home.getStarted}
              </Link>
            )}
            <Link to="/exams" style={{ background:'rgba(255,255,255,.2)', color:'#fff', border:'1.5px solid rgba(255,255,255,.4)', fontWeight:600, fontSize:15, padding:'12px 24px', borderRadius:10, textDecoration:'none' }}>
              {t.home.browseExams}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e5e7eb' }}>
        <div className="container" style={{ display:'flex', justifyContent:'center', gap:56, padding:'24px 20px', flexWrap:'wrap' }}>
          {stats.map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:26, fontWeight:800, color:'#16a34a' }}>{n}</div>
              <div style={{ fontSize:13, color:'#6b7280', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="container" style={{ padding:'56px 20px' }}>
        <h2 style={{ fontSize:28, fontWeight:800, marginBottom:8, textAlign:'center' }}>{t.home.featuresTitle}</h2>
        <p style={{ textAlign:'center', color:'#6b7280', marginBottom:36, fontSize:15 }}>{t.home.featuresSubtitle}</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
          {features.map(f => (
            <Link key={f.to} to={f.to} style={{ textDecoration:'none' }}>
              <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:20, height:'100%', cursor:'pointer', transition:'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,.1)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                <div style={{ width:48, height:48, borderRadius:12, background:f.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:14 }}>
                  {f.icon}
                </div>
                <div style={{ fontWeight:700, fontSize:15, marginBottom:6, color:'#111827' }}>{f.title}</div>
                <div style={{ fontSize:13, color:'#6b7280', lineHeight:1.6 }}>{f.desc}</div>
                <div style={{ marginTop:14, fontSize:13, color:f.color, fontWeight:600 }}>Explore →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div style={{ background:'linear-gradient(135deg,#f0fdf4,#dcfce7)', borderTop:'1px solid #bbf7d0', padding:'48px 0', textAlign:'center' }}>
          <div className="container">
            <h2 style={{ fontSize:24, fontWeight:800, marginBottom:10 }}>{t.home.ctaTitle}</h2>
            <p style={{ color:'#6b7280', marginBottom:24, fontSize:15 }}>{t.home.ctaSubtitle}</p>
            <Link to="/register" style={{ background:'#16a34a', color:'#fff', padding:'12px 28px', borderRadius:10, fontWeight:700, fontSize:15, textDecoration:'none' }}>
              {t.home.ctaBtn}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}