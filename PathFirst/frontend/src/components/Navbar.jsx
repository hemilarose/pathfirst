import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../App'
import { useLang } from '../Context/LanguageContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { lang, toggle, t } = useLang()
  const navigate = useNavigate()
  const loc = useLocation()

  const links = [
    { to: '/exams', label: t.nav.exams },
    { to: '/scholarships', label: t.nav.scholarships },
    { to: '/colleges', label: t.nav.colleges },
    { to: '/checklist', label: t.nav.checklist },
    { to: '/mentors', label: t.nav.mentor },
  ]

  return (
    <nav style={{ background:'#fff', borderBottom:'1px solid #e5e7eb', position:'sticky', top:0, zIndex:100 }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:60 }}>
        <Link to="/" style={{ fontWeight:700, fontSize:22, color:'#16a34a', letterSpacing:'-0.5px' }}>
          PathFirst
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:4, flexWrap:'wrap' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding:'6px 12px', borderRadius:8, fontSize:13, fontWeight:500,
              color: loc.pathname===l.to ? '#16a34a' : '#374151',
              background: loc.pathname===l.to ? '#dcfce7' : 'transparent',
              transition: 'all .15s'
            }}>{l.label}</Link>
          ))}

          {/* Language Toggle */}
          <button onClick={toggle} style={{
            padding:'5px 12px', borderRadius:20, fontSize:12, fontWeight:600,
            border:'1.5px solid #e5e7eb', background: lang==='ta' ? '#fef3c7' : '#f9fafb',
            color: lang==='ta' ? '#92400e' : '#374151', cursor:'pointer', marginLeft:4
          }}>
            {lang === 'en' ? '🔤 தமிழ்' : '🔤 English'}
          </button>

          {user ? (
            <div style={{ display:'flex', alignItems:'center', gap:8, marginLeft:4 }}>
              <span style={{ fontSize:12, color:'#6b7280' }}>Hi, {user.username}</span>
              <button className="btn btn-outline btn-sm"
                onClick={() => { logout(); navigate('/') }}>{t.nav.logout}</button>
            </div>
          ) : (
            <div style={{ display:'flex', gap:8, marginLeft:4 }}>
              <Link to="/login" className="btn btn-outline btn-sm">{t.nav.login}</Link>
              <Link to="/register" className="btn btn-primary btn-sm">{t.nav.signup}</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}