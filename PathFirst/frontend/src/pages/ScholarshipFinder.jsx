import { useState, useEffect } from 'react'
import { scholarships } from '../api'
import { useLang } from '../Context/LanguageContext'

export default function ScholarshipFinder() {
  const [data, setData] = useState([])
  const [filters, setFilters] = useState({ community:'', stream:'', income:'' })
  const [loading, setLoading] = useState(true)
  const { t } = useLang()
  const f = (k,v) => setFilters(p => ({...p,[k]:v}))

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (filters.community) params.community = filters.community
    if (filters.stream) params.stream = filters.stream
    if (filters.income) params.income = filters.income
    scholarships.list(params).then(r => setData(r.data)).finally(() => setLoading(false))
  }, [filters])

  return (
    <div style={{ background:'#f8fafc', minHeight:'100vh', padding:'32px 0' }}>
      <div className="container">
        <div style={{ marginBottom:28 }}>
          <h1 style={{ fontSize:28, fontWeight:700 }}>💰 {t.scholarships.title}</h1>
          <p style={{ color:'#6b7280', marginTop:6 }}>{t.scholarships.subtitle}</p>
        </div>

        {/* Filter box */}
        <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:20, marginBottom:24 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:14 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:'#374151', marginBottom:5, display:'block' }}>{t.scholarships.community}</label>
              <select className="select" value={filters.community} onChange={e=>f('community',e.target.value)}>
                <option value="">{t.scholarships.allCommunities}</option>
                {['OC','BC','MBC','SC','ST'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:'#374151', marginBottom:5, display:'block' }}>{t.scholarships.stream}</label>
              <select className="select" value={filters.stream} onChange={e=>f('stream',e.target.value)}>
                <option value="">{t.scholarships.allStreams}</option>
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:'#374151', marginBottom:5, display:'block' }}>{t.scholarships.income}</label>
              <select className="select" value={filters.income} onChange={e=>f('income',e.target.value)}>
                <option value="">{t.scholarships.anyIncome}</option>
                <option value="100000">₹1 லட்சம் வரை</option>
                <option value="200000">₹2 லட்சம் வரை</option>
                <option value="250000">₹2.5 லட்சம் வரை</option>
                <option value="500000">₹5 லட்சம் வரை</option>
              </select>
            </div>
            <div style={{ display:'flex', alignItems:'flex-end' }}>
              <button className="btn btn-outline w-full" onClick={() => setFilters({community:'',stream:'',income:''})}>
                {t.scholarships.clear}
              </button>
            </div>
          </div>
        </div>

        {!loading && (
          <p style={{ fontSize:13, color:'#6b7280', marginBottom:16, fontWeight:500 }}>
            {data.length} {t.scholarships.found}
          </p>
        )}

        {loading ? (
          <div style={{ textAlign:'center', padding:60, color:'#6b7280' }}>Loading...</div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:16 }}>
            {data.map(s => (
              <div key={s.id} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:20, display:'flex', flexDirection:'column', gap:10 }}>
                
                {/* Header */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                  <div style={{ fontWeight:700, fontSize:15, lineHeight:1.4, flex:1, color:'#111827' }}>{s.name}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:'#16a34a', whiteSpace:'nowrap' }}>
                    ₹{s.amount.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Provider */}
                <div style={{ fontSize:12, color:'#6b7280' }}>{t.scholarships.by} {s.provider}</div>

                {/* Tags */}
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, background: s.community==='all'?'#f3f4f6':'#dcfce7', color: s.community==='all'?'#6b7280':'#15803d', fontWeight:500 }}>
                    {s.community==='all' ? t.scholarships.allCommunities : s.community}
                  </span>
                  <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, background: s.stream==='all'?'#f3f4f6':'#eff6ff', color: s.stream==='all'?'#6b7280':'#2563eb', fontWeight:500 }}>
                    {s.stream==='all' ? t.scholarships.allStreams : s.stream}
                  </span>
                  <span style={{ fontSize:11, padding:'3px 10px', borderRadius:20, background:'#f3f4f6', color:'#6b7280' }}>
                    ₹{(s.income_limit/100000).toFixed(1)}L வரை
                  </span>
                </div>

                {/* Divider */}
                <div style={{ borderTop:'1px solid #f3f4f6' }} />

                {/* Description */}
                <p style={{ fontSize:13, color:'#4b5563', lineHeight:1.6 }}>{s.description}</p>

                {/* Documents */}
                {s.documents_required && (
                  <div style={{ background:'#fffbeb', border:'1px solid #fde68a', borderRadius:8, padding:'8px 12px' }}>
                    <div style={{ fontSize:11, fontWeight:600, color:'#92400e', marginBottom:3 }}>📄 Documents needed:</div>
                    <div style={{ fontSize:11, color:'#78350f', lineHeight:1.5 }}>{s.documents_required}</div>
                  </div>
                )}

                {/* Footer */}
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'auto' }}>
                  <div style={{ fontSize:12, fontWeight:500, color: s.days_to_deadline < 0 ? '#dc2626' : s.days_to_deadline < 30 ? '#ea580c' : '#6b7280' }}>
                    {s.days_to_deadline < 0
                      ? t.scholarships.deadlinePassed
                      : `⏰ ${new Date(s.deadline).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}`}
                  </div>
                  <a href={s.apply_link} target="_blank" rel="noreferrer"
                    style={{ background:'#16a34a', color:'#fff', padding:'8px 18px', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none' }}>
                    {t.scholarships.apply}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}