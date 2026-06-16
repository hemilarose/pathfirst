import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { checklist } from '../api'
import { useAuth } from '../App'
import { useLang } from '../context/LanguageContext'

export default function Checklist() {
  const { user } = useAuth()
  const { t } = useLang()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    checklist.get().then(r => setItems(r.data)).finally(() => setLoading(false))
  }, [user])

  const toggle = async (item) => {
    const updated = items.map(i => i.id===item.id ? {...i, is_done:!i.is_done} : i)
    setItems(updated)
    try { await checklist.update(item.id, { is_done: !item.is_done }) } catch { setItems(items) }
  }

  const done = items.filter(i => i.is_done).length
  const pct = items.length ? Math.round((done/items.length)*100) : 0

  if (!user) return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center', padding:40 }}>
        <div style={{ fontSize:56, marginBottom:16 }}>🔒</div>
        <h2 style={{ fontSize:22, fontWeight:700, marginBottom:8 }}>{t.checklist.loginMsg}</h2>
        <p style={{ color:'#6b7280', marginBottom:20 }}>{t.checklist.loginSubtitle}</p>
        <Link to="/login" className="btn btn-primary">{t.checklist.login}</Link>
      </div>
    </div>
  )

  return (
    <div style={{ background:'#f8fafc', minHeight:'100vh', padding:'32px 0' }}>
      <div className="container" style={{ maxWidth:680 }}>
        <div style={{ marginBottom:28 }}>
          <h1 style={{ fontSize:28, fontWeight:700 }}>✅ {t.checklist.title}</h1>
          <p style={{ color:'#6b7280', marginTop:6 }}>{t.checklist.subtitle}</p>
        </div>

        {/* Progress */}
        {!loading && items.length > 0 && (
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:20, marginBottom:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <span style={{ fontWeight:600, fontSize:15 }}>{done} / {items.length} {t.checklist.ready}</span>
              <span style={{ fontSize:28, fontWeight:800, color:'#16a34a' }}>{pct}%</span>
            </div>
            <div style={{ background:'#f3f4f6', borderRadius:10, height:12, overflow:'hidden' }}>
              <div style={{ width:`${pct}%`, background: pct===100 ? '#16a34a' : '#4ade80', height:'100%', borderRadius:10, transition:'width .4s' }} />
            </div>
            {pct===100 && (
              <p style={{ marginTop:12, color:'#15803d', fontWeight:600, fontSize:14 }}>{t.checklist.complete}</p>
            )}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign:'center', padding:60, color:'#6b7280' }}>Loading...</div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {items.map(item => (
              <div key={item.id} onClick={() => toggle(item)} style={{
                background: item.is_done ? '#f0fdf4' : '#fff',
                border: `1.5px solid ${item.is_done ? '#86efac' : '#e5e7eb'}`,
                borderRadius:10, padding:'14px 16px', cursor:'pointer',
                display:'flex', alignItems:'flex-start', gap:14,
                transition:'all .15s'
              }}>
                {/* Checkbox */}
                <div style={{
                  width:24, height:24, borderRadius:7, flexShrink:0, marginTop:1,
                  border:`2px solid ${item.is_done ? '#16a34a' : '#d1d5db'}`,
                  background: item.is_done ? '#16a34a' : '#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all .15s'
                }}>
                  {item.is_done && <span style={{ color:'#fff', fontSize:14, fontWeight:700 }}>✓</span>}
                </div>

                {/* Content */}
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
                    <span style={{ fontWeight:600, fontSize:14,
                      textDecoration: item.is_done ? 'line-through' : 'none',
                      color: item.is_done ? '#9ca3af' : '#111827' }}>
                      {item.document.name}
                    </span>
                    <span style={{ fontSize:11, padding:'2px 8px', borderRadius:10, fontWeight:500,
                      background: item.document.is_mandatory ? '#fff7ed' : '#f3f4f6',
                      color: item.document.is_mandatory ? '#ea580c' : '#6b7280' }}>
                      {item.document.is_mandatory ? t.checklist.mandatory : t.checklist.optional}
                    </span>
                  </div>
                  <p style={{ fontSize:12, color:'#6b7280', lineHeight:1.5 }}>{item.document.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}