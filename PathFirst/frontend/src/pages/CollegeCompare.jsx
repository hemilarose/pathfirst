import { useState, useEffect } from 'react'
import { colleges } from '../api'

export default function CollegeCompare() {
  const [all, setAll] = useState([])
  const [selected, setSelected] = useState([])
  const [compared, setCompared] = useState([])
  const [filter, setFilter] = useState({ type:'', district:'' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    colleges.list(filter).then(r => setAll(r.data)).finally(() => setLoading(false))
  }, [filter])

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : prev.length<3 ? [...prev,id] : prev)
  }

  const compare = async () => {
    const res = await colleges.compare(selected)
    setCompared(res.data)
  }

  const fields = [
    ['college_type','Type'],['location','Location'],
    ['cutoff_oc','Cutoff OC'],['cutoff_bc','Cutoff BC'],['cutoff_mbc','Cutoff MBC'],['cutoff_sc','Cutoff SC'],
    ['fees_per_year','Fees/year'],['hostel_available','Hostel'],['naac_grade','NAAC'],
  ]

  return (
    <div className="container" style={{ padding:'32px 20px' }}>
      <div className="mb-6">
        <h1 style={{ fontSize:26, fontWeight:700 }}>🏫 College Comparison</h1>
        <p className="text-muted mt-1">Select up to 3 colleges to compare side by side</p>
      </div>
      <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <select className="select" style={{ maxWidth:180 }} value={filter.type}
          onChange={e=>setFilter(p=>({...p,type:e.target.value}))}>
          <option value="">All types</option>
          <option value="govt">Government</option>
          <option value="private">Private</option>
          <option value="deemed">Deemed</option>
        </select>
        <select className="select" style={{ maxWidth:180 }} value={filter.district}
          onChange={e=>setFilter(p=>({...p,district:e.target.value}))}>
          <option value="">All districts</option>
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Madurai">Madurai</option>
          <option value="Trichy">Trichy</option>
          <option value="Vellore">Vellore</option>
          <option value="Salem">Salem</option>
          <option value="Erode">Erode</option>
        </select>
        {selected.length >= 2 && (
          <button className="btn btn-primary" onClick={compare}>
            Compare {selected.length} colleges →
          </button>
        )}
        {selected.length > 0 && (
          <button className="btn btn-outline" onClick={() => { setSelected([]); setCompared([]) }}>Clear</button>
        )}
      </div>
      {selected.length > 0 && (
        <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:'10px 16px', marginBottom:20, fontSize:13, color:'#15803d' }}>
          {selected.length} selected — {selected.length < 2 ? 'Select 1 more to compare' : 'Click Compare!'}
        </div>
      )}
      {loading ? <p className="text-muted">Loading...</p> : (
        <div className="grid-3" style={{ marginBottom:32 }}>
          {all.map(c => {
            const isSel = selected.includes(c.id)
            return (
              <div key={c.id} className="card" style={{ cursor:'pointer',
                border:`2px solid ${isSel?'#16a34a':'#e5e7eb'}`,
                background: isSel?'#f0fdf4':'#fff' }}
                onClick={() => toggleSelect(c.id)}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                  <span className={`badge ${c.college_type==='govt'?'badge-green':c.college_type==='deemed'?'badge-orange':'badge-blue'}`}>
                    {c.college_type==='govt'?'Govt':c.college_type==='deemed'?'Deemed':'Private'}
                  </span>
                  {isSel && <span style={{ color:'#16a34a', fontWeight:700 }}>✓</span>}
                </div>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:4, lineHeight:1.3 }}>{c.name}</div>
                <div style={{ fontSize:12, color:'#6b7280', marginBottom:8 }}>{c.location}</div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
                  <span>OC: <b>{c.cutoff_oc}</b></span>
                  <span>₹{(c.fees_per_year/1000).toFixed(0)}K/yr</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
      {compared.length >= 2 && (
        <div>
          <h2 style={{ fontSize:20, fontWeight:700, marginBottom:16 }}>📊 Side by side</h2>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff', borderRadius:10, overflow:'hidden', border:'1px solid #e5e7eb' }}>
              <thead>
                <tr style={{ background:'#f9fafb' }}>
                  <th style={{ padding:'12px 16px', textAlign:'left', fontSize:13, color:'#6b7280', borderBottom:'1px solid #e5e7eb', minWidth:130 }}>Feature</th>
                  {compared.map(c => (
                    <th key={c.id} style={{ padding:'12px 16px', textAlign:'left', fontSize:13, fontWeight:600, borderBottom:'1px solid #e5e7eb', minWidth:180 }}>{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map(([key,label],i) => (
                  <tr key={key} style={{ background: i%2===0?'#fff':'#f9fafb' }}>
                    <td style={{ padding:'10px 16px', fontSize:13, fontWeight:500, borderBottom:'1px solid #e5e7eb' }}>{label}</td>
                    {compared.map(c => (
                      <td key={c.id} style={{ padding:'10px 16px', fontSize:13, borderBottom:'1px solid #e5e7eb' }}>
                        {key==='hostel_available'
                          ? <span style={{ color:c[key]?'#16a34a':'#dc2626' }}>{c[key]?'✓ Yes':'✗ No'}</span>
                          : key==='fees_per_year'
                          ? `₹${c[key].toLocaleString('en-IN')}`
                          : c[key] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}